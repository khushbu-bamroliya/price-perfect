//env config
require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
const path = require("path");
const PORT = process.env.PORT || 8081;
const bodyParser = require("body-parser");

//shopify configs
const validateHmac = require("./middlewares/validateHmac");
const validateWebhook = require("./middlewares/validateWebhook");
const AuthHelper = require("./helpers/index");

//shop model
const Shop = require("./models/Shop");

//creat test model
const createTestModal = require("./models/createTestModal");

//analytics model
const Analytics = require("./models/analytics");

//order model
const Order = require("./models/Order");

//order line model
const OrderLine = require("./models/OrderLine");

//Google auth configs
const expressSession = require("express-session");
app.use(
  expressSession({
    secret: "thisismysecretexpresssessionsodontlook",
    resave: false,
    saveUninitialized: false,
  })
);
const passport = require("passport");
const initializingPassport = require("./middlewares/passport");
initializingPassport(passport);
// app.use(express.urlencoded({extended: true}));
// app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(cookieParser());

app.use(passport.initialize());
app.use(passport.session());

//jwt
const { encodeJWT, decodeJWT, abTest } = require("./controllers/utils");

//db connection
const { connectDB } = require("./db/connect");

//email
const nodemailer = require("nodemailer");

//shopify apis
const {
  GetApiRest,
  PostApiRest,
  getAccessToken,
  PostApiGraphql,
  DeleteApiRest,
} = require("./controllers/shopify_api");

//router config
const router = express.Router();
const ApiRoutes = require("./routers/router.js");
const { createTestCaseApi } = require("./api/createTest");
const { nextTick } = require("process");

//Webhook Apis
app.post(
  "/webhook",
  validateWebhook,
  async (req, res) => {

    parallelWebhookFunc(req, res);

    return res.sendStatus(200);

    function in_array(array, pricePerfectId) {
      if (array.note_attributes && array.note_attributes.length > 0) {
        for (var i = 0; i < array.note_attributes.length; i++) {
          if (array.note_attributes[i].name === pricePerfectId) {
            return true;
          }
        }
      }
      return false;
    }

    function findKey(data, key) {
      if (array.line_items.properties && array.line_items.properties.length > 0) {
        for (var i = 0; i < array.line_items.properties.length; i++) {
          if (array.line_items.properties[i].name === key) {
            return array.line_items.properties[i].value;
          }
        }
      }
      return null;
    };

    async function parallelWebhookFunc(req, res)
    {
      // console.log(req.body);
      const shop = req.get("x-shopify-shop-domain");
      const topic = req.get("x-shopify-topic");

    if (topic === "app/uninstalled") {
      try {
        await Shop.findOneAndUpdate(
          { shop },
          {
            app_status: "uninstalled",
          }
        );
      } catch (e) {
        console.log("Error in app uninstall webhook", e);
      }
    } else if (topic === "shop/update") {
      const {
        responseShop
      } = req.body;

      try {
        const shopifyData = {
            shop: shop,
            phone: responseShop.phone,
            name: responseShop.name,
            country_code: responseShop.country_code,
            country_name: responseShop.country_name,
            access_scope: process.env.SCOPES.split(","),
            domain: responseShop.domain,
            email: responseShop.email,
            customer_email: responseShop.customer_email,
            money_format: responseShop.money_format,
            currency: responseShop.currency,
            timezone: responseShop.iana_timezone,
            address1: responseShop.address1,
            address2: responseShop.address2,
            zip: responseShop.zip,
            city: responseShop.city,
            shop_owner: responseShop.shop_owner,
            shop_plan: responseShop && responseShop.plan_name && responseShop.plan_name,
        };

        await Shop.findOneAndUpdate({ shop }, shopifyData, {
          upsert: true,
        });
      } catch (e) {
        console.log("Error in shop update webhook", e);
      }
    } 
      else if (topic === "products/delete") {
        //delete duplicate products in shopify then delete test case from db

        try {

          var access_token = "";
          const shopData = await Shop.findOne({ shop }).select(['access_token']);
          access_token = shopData.access_token;

          const productId = req.body.id;
  
          const getSingleTestCase = await createTestModal.findOne({productId})
  
          for (let singleObj of getSingleTestCase.testCases) {

              let getSingleDuplicateProductIds = singleObj.variants[0].duplicateProductId.split("gid://shopify/Product/")[1];
  
              if (getSingleDuplicateProductIds) {
  
                  try {
                      const responseShopData = await DeleteApiRest(
                          `https://${shop}/admin/api/${process.env.SHOPIFY_API_VERSION}/products/${Number(getSingleDuplicateProductIds)}.json`,
                          access_token
                      );
  
                      console.log("responseShopData", responseShopData)
  
  
                  } catch (error) {
                      console.log("Error deleting product in shopify in product delete webhook", error);
                  }
              }
  
          }

          try {
            await createTestModal.findOneAndRemove({productId:"gid://shopify/Product/" + productId});
          }
          catch(error)
          {
            console.log("Error deleting product in db in delete webhook", error);
          }
  
      } catch (error) {
          console.log("Error in delete product webhook", error);
      }

      }
      else if (topic === "orders/create") {
        let order = ctx.request.body;
        if (in_array(order, "_pricePerfectTestId")) {
          //order is via price perfect app

          var pricePerfectId = await findKey(order,'pricePerfectId');
          try {
            const orderInsert = await Order.findOneAndUpdate(
              {
                shop: shop,
                orderId: order.id,
              },
              {
                shop: shop,
                userId: pricePerfectId,
                orderId: order.id,
                orderNumber: order.order_number && String(order.order_number),
                orderTotal: order.subtotal_price && order.subtotal_price,
                orderCreatedAt:
                  order.created_at && new Date(order.created_at).getTime(),
                orderUpdatedAt:
                  order.updated_at && new Date(order.updated_at).getTime(),
                paymentStatus: order.financial_status,
                cancelled_at: order.cancelled_at && new Date(order.cancelled_at).getTime()
              },
              {
                upsert: true,
              }
            );

            var pricePerfectTestId = "";
            var originalVariantId = "";

            if (order.line_items && order.line_items.length > 0) {
              for (const value of order.line_items) {
                pricePerfectTestId = await findKey(order,'_pricePerfectTestId');
                originalVariantId = await findKey(order,'_originalVariantId');
                if(pricePerfectTestId)
                {
                    await OrderLine.findOneAndUpdate({
                      orderId: order.id,
                      shop: shop,
                      shopifyVariantId: value.variant_id,
                    },
                    {
                      shop: shop,
                      userId: pricePerfectId,
                      orderId: order.id,
                      shopifyProductId: value.product_id && value.product_id,
                      shopifyVariantId: value.variant_id && value.variant_id,
                      image:
                        res.data.image &&
                          res.data.productVariant &&
                          res.data.productVariant.image &&
                          res.data.productVariant.image.src
                          ? res.data.productVariant.image.src
                          : res.data.productVariant &&
                            res.data.productVariant.product &&
                            res.data.productVariant.product.featuredImage &&
                            res.data.productVariant.product.featuredImage.src
                            ? res.data.productVariant.product.featuredImage.src
                            : "",
                      name: value.name && value.name,
                      qty: value.quantity && value.quantity,
                      sku: value.sku,
                      productPrice: value.price && value.price,
                      testId: pricePerfectTestId,
                      originalVariantId,
                    },
                    {
                      upsert: true,
                    }
                  );

                  if(pricePerfectTestId != "control")
                  {
                  //get all locations from shopify

                  const query = `{
                    productVariant(id:"gid://shopify/ProductVariant/44362991370536")
                    {
                      product{
                        id
                      }
                      id
                    }
                    locations(first: 20){
                      edges{
                        cursor
                        node{
                          id
                          name
                        }
                      }
                    }
                  }`;
                  var access_token = "";
                  const shopData = await Shop.findOne({ shop }).select(['access_token']);
                  access_token = shopData.access_token;

                  const response = await PostApiGraphql(shop, access_token, query);

                  if(response && response.data)
                  {
                    if(response.data.locations && response.data.locations.length > 0)
                    {
                      for(const value of response.data.locations)
                      {
                        
                      }
                    }
                  }

                }


                }
                
              }
            }


          } catch (e) {
            console.log("Error inserting order data", e);
          }
        }
      }

       return true;

    }
  }
);

app.use(express.json());

//shopify auth apis
app.get("/auth", validateHmac, async (req, res) => {
  // Shop Name
  const { shop } = req.query;
  if (shop) {
    console.log("shop ->", shop);
    //const state = nonce();

    const authUrl = AuthHelper.authUrl({
      shop,
      //state,
      REDIRECT_URL: AuthHelper.generateRedirectUrl(req.baseUrl),
      SHOPIFY_API_KEY: process.env.SHOPIFY_API_KEY,
    });

    console.log("authUrl :- ", authUrl);

    //res.cookie('state', shopState);

    // res.cookie('shop', )
    return res.redirect(authUrl);
  } else {
    return res.status(400).send('Missing "Shop Name" parameter!!');
  }
});

app.get("/auth/callback", validateHmac, async (req, res) => {
  const { shop, host, code, shopState } = req.query;

  // console.log("req.query", req.query);

  // const stateCookie = cookie.parse(req.headers.cookie).state;

  // if (shopState !== stateCookie) {
  //   return res.status(403).send('Request origin cannot be verified');
  // }

  if (shop && host && code) {
    console.log("shop:", shop);
    //console.log("encodedShop", encodedShop);
    //res.cookie('shop', encodedShop,{expire: 300000 + Date.now()})
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
        const responseShopData = await GetApiRest(
          `https://${shop}/admin/api/${process.env.SHOPIFY_API_VERSION}/shop.json`,
          access_token
        );

        const responseShop = responseShopData && responseShopData?.shop;

        console.log("responseShop", responseShop);

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

        console.log("Shop Data inserted");
        //insert shop data end
      } catch (error) {
        console.log("Shop insert error", error);
      }

      const registerShopWebhook = await PostApiRest(
        `https://${shop}/admin/api/${process.env.SHOPIFY_API_VERSION}/webhooks.json`,
        access_token,
        {
          webhook: {
            topic: "shop/update",
            address: `${process.env.HOST}/hook/webhook`,
            format: "json",
          },
        }
      );

      console.log(registerShopWebhook, "registerShopWebhook");

      if (registerShopWebhook) {
        console.log("Registered Shop webhook successfully...");
      }

      const registerAppUninstallWebhook = await PostApiRest(
        `https://${shop}/admin/api/${process.env.SHOPIFY_API_VERSION}/webhooks.json`,
        access_token,
        {
          webhook: {
            topic: "app/uninstalled",
            address: `${process.env.HOST}/hook/webhook`,
            format: "json",
          },
        }
      );

      console.log(registerAppUninstallWebhook, "registerAppUninstallWebhook");

      if (registerAppUninstallWebhook) {
        console.log("Registered app uninstall webhook successfully...");
      }

      const registerProductDeleteWebhook = await PostApiRest(
        `https://${shop}/admin/api/${process.env.SHOPIFY_API_VERSION}/webhooks.json`,
        access_token,
        {
          webhook: {
            topic: "product/delete",
            address: `${process.env.HOST}/hook/webhook`,
            format: "json",
          },
        }
      );

      console.log(registerProductDeleteWebhook, "registerProductDeleteWebhook");

      if (registerProductDeleteWebhook) {
        console.log("Registered products delete webhook successfully...");
      }


      const registerOrderCreateWebhook = await PostApiRest(
        `https://${shop}/admin/api/${process.env.SHOPIFY_API_VERSION}/webhooks.json`,
        access_token,
        {
          webhook: {
            topic: "orders/create",
            address: `${process.env.HOST}/hook/webhook`,
            format: "json",
          },
        }
      );

      console.log(registerOrderCreateWebhook, "registerOrderCreateWebhook");

      if (registerOrderCreateWebhook) {
        console.log("Registered order create webhook successfully...");
      }


    } catch (error) {
      console.log("Error trying to get access token", error);
    }

    console.log(
      "umi1->",
      AuthHelper.embedAppUrl({
        host,
        SHOPIFY_API_KEY: process.env.SHOPIFY_API_KEY,
        shop,
      })
    );

    res.redirect(
      AuthHelper.embedAppUrl({
        host,
        SHOPIFY_API_KEY: process.env.SHOPIFY_API_KEY,
        shop,
      })
    );
  } else {
    res.status(400).send("Required parameters missing");
  }
});

//google apis
// const isLoggedIn = (req, res, next) => {
//   if (req.user) {
//       next();
//   } else {
//       res.sendStatus(401);
//   }
// }

app.get("/google/auth/failed", (req, res) => {
  res.send("Login Failed");
});

app.get(
  "/google/auth",
  passport.authenticate("google", {
    scope: ["email", "profile"],
  })
);

app.get("/google/callback", (req, res) => {
  passport.authenticate("google", async function (err, user, info) {
    if (err) {
      console.log("hi1", err);
    }
    if (!user) {
      return res.redirect("/google/auth/failed");
    }
    if (user) {
      const token = await encodeJWT(user.googleId);
      res.cookie("token", token);
      console.log("here1");
      res.redirect("/homeDashboard");

      return res;
    }
  })(req, res);
  (req, res) => {
    res.redirect("/google/auth/failed");
  };
});

app.get("/google/logout", (req, res) => {
  req.logout(() => {});
  res.clearCookie("token")
  // res.send(req.user);
  res.sendFile(path.resolve(__dirname, "frontend/build", "index.html"));
});

// Handle GET requests to /api route
app.use(
  "/api",
  async (req, res, next) => {
    console.log("in middleware", req.headers.shop);
    if (req.headers.shop) {
      req.headers.shop = await decodeJWT(req.headers.shop);
    } else {
      req.headers.shop = process.env.SHOP;
    }
    next();
  },
  ApiRoutes
);

app.post("/abtest", async (req, res) => {
  console.log("/abtest route");

  //{"experiment":"",productsArr:"8055897555240","variantsArr":["44247576117544","44247576117544"]}

  const { variantsArr, productsArr, experiment } = req.body;

  var getTestCases = await createTestModal.find({
    productId: { $in: productsArr },
  });

  console.log(getTestCases);

  // var getTestCases = {
  //     trafficSplit: 34,
  //     productId: "gid://shopify/Product/8055898374440",
  //     testCases: [
  //       {
  //         testId: 1,
  //         variants: [
  //           {
  //             id: "gid://shopify/ProductVariant/44247576117544",
  //             variantTitle: "Default Title",
  //             variantComparePrice: "1",
  //             variantPrice: "59.33",
  //             abVariantComparePrice: "11",
  //             abVariantPrice: "1",
  //             duplcateVarId:"",
  //           },
  //         ],
  //       },
  //       {
  //         testId: 2,
  //         variants: [
  //           {
  //             id: "gid://shopify/ProductVariant/44247576117544",
  //             variantTitle: "Default Title",
  //             variantComparePrice: "4",
  //             variantPrice: "59.33",
  //             abVariantComparePrice: "22",
  //             abVariantPrice: "2",
  //             duplcateVarId:"",
  //           },
  //         ],
  //       }
  //     ],
  //   };

  if (getTestCases && getTestCases.length > 0) {
    for (const getTestCase of getTestCases) {
      //var testPer = parseInt(Number(getTestCase.trafficSplit) / Number(getTestCase.testCases.length));
      var testPer = parseInt(Number(getTestCase.trafficSplit));
      var controlPer = parseInt(
        100 -
          Number(getTestCase.trafficSplit) *
            Number(getTestCase.testCases.length)
      );

      console.log(
        getTestCase.trafficSplit,
        getTestCase.testCases.length,
        testPer,
        controlPer
      );

      //var newArr = [];
      var newArr = {};

      for (var i = 0; i < getTestCase.testCases[0].variants.length; i++) {
        var cases = [];
        for (var j = 0; j < getTestCase.testCases.length; j++) {
          var varId = getTestCase.testCases[j].variants[i].id;
          var variantPrice = getTestCase.testCases[j].variants[i].variantPrice;
          var variantComparePrice =
            getTestCase.testCases[j].variants[i].variantComparePrice;
          var abVariantPrice =
            getTestCase.testCases[j].variants[i].abVariantPrice;
          var abVariantComparePrice =
            getTestCase.testCases[j].variants[i].abVariantComparePrice;
          var duplicateVariantId = getTestCase.testCases[j].variants[
            i
          ].duplicateVariantId.split("gid://shopify/ProductVariant/")[1];

          if (j == 0) {
            cases.push({
              test: "control",
              pct: controlPer,
              varId: varId,
              variantPrice: variantPrice,
              variantComparePrice: variantComparePrice,
              abVariantPrice: variantPrice,
              abVariantComparePrice: variantComparePrice,
              duplicateVariantId: varId.split(
                "gid://shopify/ProductVariant/"
              )[1],
            });
          }
          cases.push({
            test: getTestCase.testCases[j].testId,
            pct: testPer,
            varId: varId,
            variantPrice: variantPrice,
            variantComparePrice: variantComparePrice,
            abVariantPrice: abVariantPrice,
            abVariantComparePrice: abVariantComparePrice,
            duplicateVariantId: duplicateVariantId,
          });

          //console.log('i=',i,'j=',j);
          //console.log('getTestCase',getTestCase.testCases[j].variants[i].variantComparePrice);
        }
        console.log(varId, "is done now");
        console.log("cases", cases);
        var abTestArr = await abTest(cases);
        // newArr.push({[varId.split('gid://shopify/ProductVariant/')[1]]:{abTestArr}});
        newArr[varId.split("gid://shopify/ProductVariant/")[1]] = abTestArr;
      }
    }
    console.log("-----------------", abTestArr);
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Access-Control-Allow-Credentials", true);
    return res.status(200).send(newArr);
  } else {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Access-Control-Allow-Credentials", true);
    return res.status(200).send({});
  }
});

app.post("/send-analytics", async (req, res) => {
  try {
    const { shop, userId, event, productId, handle, testResult } = req.body;

    await Analytics.findOneAndUpdate(
      {
        userId,
        productId,
        event,
      },
      {
        shop,
        userId,
        event,
        productId,
        handle,
        testResult,
      },
      {
        upsert: true,
      }
    );

    res.status(200).json({
      data: {},
      success: true,
      status: 200,
    });
  } catch (error) {
    console.log("Error inserting analytics: ", error);
  }
});

app.get("/sendmail", async (req, res) => {
  // let transporter = nodemailer.createTransport({
  //   host: process.env.SMTP_HOST,
  //   port: process.env.SMTP_PORT,
  //   //secure: true, // true for 465, false for other ports
  //   //secureConnection: true, // TLS requires secureConnection to be false
  //   auth: {
  //     user: process.env.SMTP_USERNAME, // generated ethereal user
  //     pass: process.env.SMTP_PASSWORD, // generated ethereal password
  //   },
  // });
  // // send mail with defined transport object
  // let info = await transporter.sendMail({
  //   from: `Price Perfect <umang@vedaha.com>`, // sender address
  //   to: "umang@vedaha.com", // list of receivers
  //   subject: 'Sending Email using Node.js',
  //   text: 'That was easy!'
  // });
  // console.log(info,'info');
});

app.get("/", async (req, res) => {
  console.log(req.query, "/ route");
  const { shop, hmac, host, timestamp } = req.query;
  const encodedShop = await encodeJWT(shop);
  if (shop) {
    const shopGet = await Shop.findOne({ shop }).select(["shop", "app_status"]);
    if (shopGet && shopGet.app_status && shopGet.app_status == "installed") {
      console.log("app open ma");
      // res.redirect(
      //   AuthHelper.embedAppUrl({ host, API_KEY, shop, id })
      // );

      // Create a buffer from the string
      // let bufferObj = Buffer.from(host, "base64");

      // console.log(`https://${bufferObj}/apps/${process.env.SHOPIFY_API_KEY}/`);

      // res.redirect(`https://${bufferObj}/apps/${process.env.SHOPIFY_API_KEY}/`)
      res.cookie("shop", encodedShop);
      res.sendFile(path.resolve(__dirname, "frontend/build", "index.html"));
    } else {
      res.redirect(
        `/auth?hmac=${hmac}&host=${host}&shop=${shop}&timestamp=${timestamp}`
      );
    }
  } else {
    res.status(200).send("Please open app from the Shopify admin panel.");
    //res.sendFile(path.resolve(__dirname, "frontend/build", "index.html"));
  }
});

app.use(express.static(path.resolve(__dirname, "frontend/build")));

app.get("/*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "frontend/build", "index.html"));
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
