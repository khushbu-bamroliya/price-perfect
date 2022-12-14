// const crypto = require('crypto');
//const nonce = require('nonce')();
// const request = require('request-promise');
// const querystring = require('querystring');
const cookie = require('cookie');
require('dotenv').config()

const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 8081;

const validateHmac = require("./middlewares/validateHmac");
const AuthHelper = require("./helpers/index");
// const shopifyRestApi = require("./controllers/shopify_api");
const Shop = require("./models/Shop");

const app = express();

const { connectDB } = require("./db/connect");
const { GetApiRest, PostApiRest, getAccessToken } = require('./controllers/shopify_api');
const { readFileSync } = require('fs');

//webhook apis
// app.post(
//   "/webhook",
//   ShopifyApi.middlewares.validateWebhook,
//   async (req, res) => {
//     // console.log(req.body);
//     const shop = req.get("x-shopify-shop-domain");
//     const topic = req.get("x-shopify-topic");

//     if (topic === "app/uninstalled") {
//       try {
//         await Shop.findOneAndUpdate(
//           { shop },
//           {
//             app_status: "uninstalled",
//           }
//         );
//         await Configuration.findOne({ shop }).remove().exec();
//         // delete global.ACTIVE_SHOPIFY_SHOPS[shop];
//       } catch (e) {
//         console.log("Error in app uninstall webhook", e);
//       }
//     } else if (topic === "shop/update") {
//       let {
//         phone,
//         country_code,
//         country_name,
//         email,
//         customer_email,
//         money_format,
//         currency,
//         timezone,
//         domain,
//         zip,
//         city,
//         shop_owner,
//       } = req.body;

//       try {
//         const shopifyData = {
//           phone,
//           country_code,
//           country_name,
//           email,
//           customer_email,
//           money_format,
//           currency,
//           timezone,
//           domain,
//           zip,
//           city,
//           shop_owner,
//         };

//         await Shop.findOneAndUpdate({ shop }, shopifyData, {
//           new: true,
//         });
//       } catch (e) {
//         console.log("Error in shop update webhook", e);
//       }
//     }
//     return res.sendStatus(200);
//   }
// );

app.use(express.json());

//shopify auth apis
app.get('/auth', validateHmac, async (req, res) => {
  // Shop Name
  const {shop} = req.query;
  if (shop) {

    console.log("shop ->", shop);
     //const state = nonce();

      const authUrl = AuthHelper.authUrl({
        shop,
        //state,
        REDIRECT_URL: AuthHelper.generateRedirectUrl(
          req.baseUrl
        ),
        SHOPIFY_API_KEY: process.env.SHOPIFY_API_KEY,
      });

      console.log("authUrl :- ", authUrl)

      //res.cookie('state', shopState);
      return res.redirect(authUrl);
  } else {
      return res.status(400).send('Missing "Shop Name" parameter!!');
  }
});

app.get('/auth/callback', validateHmac, async (req, res) => {
  const { shop, host, code, shopState } = req.query;

  // console.log("req.query", req.query);

  // const stateCookie = cookie.parse(req.headers.cookie).state;

  // if (shopState !== stateCookie) {
  //   return res.status(403).send('Request origin cannot be verified');
  // }

  if (shop && host && code) {

  try {

    const checkRes = await getAccessToken(
      process.env.SHOPIFY_API_KEY,
      process.env.SHOPIFY_API_SECRET,
      shop,
      code
    );

    console.log("checkRes", checkRes);

    const { access_token } = checkRes;

    // const restClient = shopifyRestApi.getRestClient(shop, access_token);
    // console.log("restClient", restClient);

    // const responseShopData = await restClient.get("shop.json");



    // console.log('responseShopData?.data',responseShopData?.data);

    try {
      const responseShopData = await GetApiRest(`https://${shop}/admin/api/${process.env.SHOPIFY_API_VERSION}/shop.json`,access_token);

      const responseShop = responseShopData && responseShopData?.shop;

      console.log('responseShop',responseShop);

      await Shop.findOneAndUpdate(
        {
          shop: shop,
        },
        {
          shop: shop,
          access_token: access_token,
          phone: responseShop.phone,
          name: responseShop.name,
          country_code: responseShop.country_code,
          country_name: responseShop.country_name,
          access_scope: process.env.SCOPES.split(","),
          timestamp: new Date().getTime(),
          domain: responseShop.domain,
          email: responseShop.email,
          customer_email: responseShop.customer_email,
          money_format: responseShop.money_format,
          app_status: "installed",
          currency: responseShop.currency,
          timezone: responseShop.iana_timezone,
          address1: responseShop.address1,
          address2: responseShop.address2,
          zip: responseShop.zip,
          city: responseShop.city,
          shop_owner: responseShop.shop_owner,
          shop_plan:
            responseShop && responseShop.plan_name && responseShop.plan_name,
        },
        {
          upsert: true,
        }
      );

      console.log("Shop Data inserted")
      //insert shop data end
    } catch (error) {
      console.log("Shop insert error", error);
    }

    const registerShopWebhook =  await PostApiRest(`https://${shop}/admin/api/${process.env.SHOPIFY_API_VERSION}/webhooks.json`, access_token, {
          webhook: {
            topic: "shop/update",
            address: `${process.env.HOST}/hook/webhook`,
            format: "json",
          },
    })

    console.log(registerShopWebhook,'registerShopWebhook');

    if(registerShopWebhook)
    {
      console.log("register Shop webhook successfully registered...")
    }

    const registerAppUninstallWebhook =  await PostApiRest(`https://${shop}/admin/api/${process.env.SHOPIFY_API_VERSION}/webhooks.json`, access_token, {
          webhook: {
            topic: "app/uninstalled",
            address: `${process.env.HOST}/hook/webhook`,
            format: "json",
          },
    })

    console.log(registerAppUninstallWebhook,'registerAppUninstallWebhook');

    if(registerAppUninstallWebhook)
    {
      console.log("Register app uninstall webhook successflly...")
    }

  } catch (error) {
    console.log("Error trying to get access token", error);
  }

  console.log('umi1->',AuthHelper.embedAppUrl({ host, SHOPIFY_API_KEY:process.env.SHOPIFY_API_KEY, shop }));

  res.redirect(
    AuthHelper.embedAppUrl({ host, SHOPIFY_API_KEY:process.env.SHOPIFY_API_KEY, shop })
  );

  } else {
      res.status(400).send('Required parameters missing');
  }
});


// Have Node serve the files for our built React app
//app.use(express.static(path.resolve(__dirname, 'frontend/build')));

// Handle GET requests to /api route
app.get("/api", (req, res) => {
  
// frontend serve 
  const index = path.join(__dirname, "index.js");
  res.sendFile(index);
});

app.get('/', async (req, res) => {
  console.log(req.query,'/ route');
  const {shop, hmac, host, timestamp} = req.query;

  const shopGet = await Shop.findOne({ shop }).select(["shop","app_status"]);

  if(shopGet && shopGet.app_status && shopGet.app_status == "installed")
  {
    console.log("embedurl");
    // res.redirect(
    //   AuthHelper.embedAppUrl({ host, API_KEY, shop, id })
    // );
      
    // Create a buffer from the string
    // let bufferObj = Buffer.from(host, "base64");
    
    // console.log(`https://${bufferObj}/apps/${process.env.SHOPIFY_API_KEY}/`);

    // res.redirect(`https://${bufferObj}/apps/${process.env.SHOPIFY_API_KEY}/`)
    app.use(express.static(path.resolve(__dirname, 'frontend/build')));
    res.sendFile(path.resolve(__dirname, 'frontend/build', 'index.html'));
  }
  else 
  {
    res.redirect(`/auth?hmac=${hmac}&host=${host}&shop=${shop}&timestamp=${timestamp}`);
  } 
});



// All other GET requests not handled before will return our React app
// app.get('*', (req, res) => {
//   console.log("* route")
//   res.sendFile(path.resolve(__dirname, 'frontend/build', 'index.html'));
// });

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
  });
});

