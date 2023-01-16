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
const AuthHelper = require("./helpers/index");

//shop model
const Shop = require("./models/Shop");

//creat test model
const createTestModal = require("./models/createTestModal");

//ab test config
const abtest = require("easy-abtest");

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
} = require("./controllers/shopify_api");

//router config
const router = express.Router();
const ApiRoutes = require("./routers/router.js");
const { createTestCaseApi } = require("./api/createTest");

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
    console.log("encodedShop", encodedShop);
    res.cookie('shop', encodedShop,{expire: 300000 + Date.now()})
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
        console.log("register Shop webhook successfully registered...");
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
        console.log("Register app uninstall webhook successflly...");
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
  res.send(req.user);
});

//ab test
let options = {
  enabled: true,
  name: "experiment-ID-here",
  buckets: [
    { variant: 0, weight: 0.33 },
    { variant: 1, weight: 0.33 },
    { variant: 2, weight: 0.33 },
  ],
};

// app.use(abtest(options));

// Have Node serve the files for our built React app
//app.use(express.static(path.resolve(__dirname, 'frontend/build')));

// Handle GET requests to /api route
app.use("/api", ApiRoutes);

app.get("/api", abtest(options), (req, res) => {
  console.log(req.session.test.bucket, "req.session.test.bucket");

  if (req.session.test.bucket == 0) {
    res.json({ message: "Hello from server 0" });
  } else if (req.session.test.bucket == 1) {
    res.json({ message: "Hello from server 1" });
  } else if (req.session.test.bucket == 2) {
    res.json({ message: "Hello from server 2" });
  }
});

app.post("/abtest", async (req, res) => {
  console.log("/abtest route");

  //{"experiment":"",productsArr:"8055897555240","variantsArr":["44247576117544","44247576117544"]}

  const { variantsArr, productsArr, experiment } = req.body;

  var getTestCases = await createTestModal.find({productId:{$in:productsArr}});

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

    if(getTestCases && getTestCases.length > 0)
    {
      for(const getTestCase of getTestCases)
      {
        var testPer = parseInt(Number(getTestCase.trafficSplit) / Number(getTestCase.testCases.length));
        var controlPer = parseInt(100 - Number(getTestCase.trafficSplit));
      
      //console.log(getTestCase.testCases[0].variants.length);
      
      //var newArr = [];
      var newArr = {};
      
      for(var i=0; i<getTestCase.testCases[0].variants.length;i++)
      {
        var cases = [];
        for(var j=0; j<getTestCase.testCases.length;j++)
        {
          var varId = getTestCase.testCases[j].variants[i].id;
          var variantPrice = getTestCase.testCases[j].variants[i].variantPrice;
          var variantComparePrice = getTestCase.testCases[j].variants[i].variantComparePrice;
          var abVariantPrice = getTestCase.testCases[j].variants[i].abVariantPrice;
          var abVariantComparePrice = getTestCase.testCases[j].variants[i].abVariantComparePrice;
          var duplicateVariantId = getTestCase.testCases[j].variants[i].duplicateVariant.split('gid://shopify/ProductVariant/')[1];
          
          if(j == 0)
          {
            cases.push({ test: "control", pct: controlPer, varId:varId, variantPrice:variantPrice, variantComparePrice:variantComparePrice, abVariantPrice:variantPrice, abVariantComparePrice:variantComparePrice, duplicateVariantId:varId.split('gid://shopify/ProductVariant/')[1]});
          }
          cases.push({ test: getTestCase.testCases[j].testId, pct: testPer, varId:varId, variantPrice:variantPrice, variantComparePrice:variantComparePrice, abVariantPrice:abVariantPrice, abVariantComparePrice:abVariantComparePrice, duplicateVariantId:duplicateVariantId });
          
          
          
          //console.log('i=',i,'j=',j);
          //console.log('getTestCase',getTestCase.testCases[j].variants[i].variantComparePrice);
        }
        console.log(varId,'is done now');
        console.log('cases',cases);
        var abTestArr = await abTest(cases);
        // newArr.push({[varId.split('gid://shopify/ProductVariant/')[1]]:{abTestArr}});
        newArr[varId.split('gid://shopify/ProductVariant/')[1]] = abTestArr;
      }
    }
      console.log('-----------------',abTestArr);
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
      res.setHeader('Access-Control-Allow-Credentials', true);
      return res.status(200).send(newArr);
    }
    else 
    {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
      res.setHeader('Access-Control-Allow-Credentials', true);
      return res.status(200).send({});
    }
    
});

app.get("/sendmail", async(req, res) => {
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
app.get("/api/inject", async(req, res) => {
  const shop = process.env.SHOP;
  var access_token = "";
  const shopData = await Shop.findOne({ shop }).select(['access_token']);
  if(shopData)
  {
    access_token = shopData.access_token;
  }
  try {
    const resThemes = await GetApiRest(
      `https://${shop}/admin/api/${process.env.SHOPIFY_API_VERSION}/themes.json`,
      access_token
    );
    if(resThemes && resThemes.themes && resThemes.themes.length >0)
    {
      //console.log(resThemes,'resThemes');
      for(const theme of resThemes.themes)
      {
        if(theme.role === "main")
        {
          console.log(theme.id,'value');
          const resAssets = await GetApiRest(
            `https://${shop}/admin/api/${process.env.SHOPIFY_API_VERSION}/themes/${theme.id}/assets.json`,
            access_token
          );
          console.log(resAssets,'resAssets');
          if(resAssets && resAssets.assets && resAssets.assets.length > 0)
          {
            for(const asset of resAssets.assets)
            {
              console.log(asset,"asset");
              if(asset.key === "")
              {

              }
            }
          }
          break;
        }
      }
      
    }
  } catch (error) {
    console.log("Error injecting div in theme",error);
  }
  
  
});

app.get("/", async (req, res) => {
  console.log(req.query, "/ route");
  const { shop, hmac, host, timestamp } = req.query;
  const encodedShop = await encodeJWT(shop)
  if (shop) {
    console.log("shop:", shop);
    console.log("encodedShop", encodedShop);
    res.cookie('shop', encodedShop,{expire: 300000 + Date.now()})
    const shopGet = await Shop.findOne({ shop }).select(["shop", "app_status"]);
    if (shopGet && shopGet.app_status && shopGet.app_status == "installed") {
      console.log("shop:", shop);
      console.log("encodedShop", encodedShop);
      res.cookie('shop', encodedShop,{expire: 300000 + Date.now()})
      console.log("embedurl");
      // res.redirect(
      //   AuthHelper.embedAppUrl({ host, API_KEY, shop, id })
      // );

      // Create a buffer from the string
      // let bufferObj = Buffer.from(host, "base64");

      // console.log(`https://${bufferObj}/apps/${process.env.SHOPIFY_API_KEY}/`);

      // res.redirect(`https://${bufferObj}/apps/${process.env.SHOPIFY_API_KEY}/`)
      res.sendFile(path.resolve(__dirname, "frontend/build", "index.html"));
      
    } else {
      res.redirect(
        `/auth?hmac=${hmac}&host=${host}&shop=${shop}&timestamp=${timestamp}`
      );
    }
  } else {
    res.sendFile(path.resolve(__dirname, "frontend/build", "index.html"));
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