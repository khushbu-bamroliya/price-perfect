import { Shopify } from "@shopify/shopify-api";
import { gdprTopics } from "@shopify/shopify-api/dist/webhooks/registry.js";

import ensureBilling from "../helpers/ensure-billing.js";
import redirectToAuth from "../helpers/redirect-to-auth.js";
import Shops from '../backend/models/Shop.js';

import {Shop} from `@shopify/shopify-api/dist/rest-resources/${process.env.SHOPIFY_API_VERSION}/index.js`;

export default function applyAuthMiddleware(
  app,
  { billing = { required: false } } = { billing: { required: false } }
) {
  app.get("/api/auth", async (req, res) => {
    return redirectToAuth(req, res, app)
  });

  app.get("/api/auth/callback", async (req, res) => {

    console.log("1 step")
    try {
      const session = await Shopify.Auth.validateAuthCallback(
        req,
        res,
        req.query
      );

      console.log("req, res, req.query", req, res, req.query)

      const shopData = await Shop.all({ session })

      const credentialData = {
        shop: shopData[0].session.shop,
        name: shopData[0].name,
        email: shopData[0].email,
        domain: shopData[0].domain,
        phone: shopData[0].phone,
        accessToken: shopData[0].session.accessToken,
        timezone: shopData[0].timezone,
        shop_owner: shopData[0].shop_owner,
        money_format: shopData[0].money_format,
        currency: shopData[0].currency,
        city: shopData[0].city,
        zip: shopData[0].zip,
        country_name: shopData[0].country_name,
        country_code: shopData[0].country_code,
        appStatus: "installed"
      }

      const shopExists = await Shops.findOne({ shop: credentialData.shop })

      console.log("shopExists", shopExists)
      if (shopExists && shopExists.accessToken !== credentialData.accessToken) {
        const updateAccessToken = await Shops.findOneAndUpdate({ shop: shopExists.shop }, { accessToken: credentialData.accessToken });
        console.log("Access token updated", updateAccessToken);
      }
      if (shopExists == null) {
        await Shops.create(credentialData);
      } else {
        console.log("Shop exists");
      }


      const responses = await Shopify.Webhooks.Registry.registerAll({
        shop: session.shop,
        accessToken: session.accessToken,
      });

      console.log("responses", responses)

      Object.entries(responses).map(([topic, response]) => {
        // The response from registerAll will include errors for the GDPR topics.  These can be safely ignored.
        // To register the GDPR topics, please set the appropriate webhook endpoint in the
        // 'GDPR mandatory webhooks' section of 'App setup' in the Partners Dashboard.
        if (!response.success && !gdprTopics.includes(topic)) {
          if (response.result.errors) {
            console.log(
              `Failed to register ${topic} webhook: ${response.result.errors[0].message}`
            );
          } else {
            console.log(
              `Failed to register ${topic} webhook: ${JSON.stringify(response.result.data, undefined, 2)
              }`
            );
          }
        }
      });

      // If billing is required, check if the store needs to be charged right away to minimize the number of redirects.
      if (billing.required) {
        const [hasPayment, confirmationUrl] = await ensureBilling(
          session,
          billing
        );

        if (!hasPayment) {
          return res.redirect(confirmationUrl);
        }
      }

      const host = Shopify.Utils.sanitizeHost(req.query.host);
      const redirectUrl = Shopify.Context.IS_EMBEDDED_APP
        ? Shopify.Utils.getEmbeddedAppUrl(req)
        : `/?shop=${session.shop}&host=${encodeURIComponent(host)}`;

      res.redirect(redirectUrl);
    } catch (e) {
      console.warn(e);
      switch (true) {
        case e instanceof Shopify.Errors.InvalidOAuthError:
          res.status(400);
          res.send(e.message);
          break;
        case e instanceof Shopify.Errors.CookieNotFound:
        case e instanceof Shopify.Errors.SessionNotFound:
          // This is likely because the OAuth session cookie expired before the merchant approved the request
          return redirectToAuth(req, res, app);
          break;
        default:
          res.status(500);
          res.send(e.message);
          break;
      }
    }
  });
}
