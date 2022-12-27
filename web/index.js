//env config
require('dotenv').config()

const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 8081;


//shopify configs
const validateHmac = require("./middlewares/validateHmac");
const AuthHelper = require("./helpers/index");

//shop model
const Shop = require("./models/Shop");

//ab test config
const abtest = require('easy-abtest');

//Google auth configs
const expressSession = require("express-session");
const passport = require("passport");
const initializingPassport = require('./middlewares/passport');
initializingPassport(passport);
app.use(
  expressSession({
    secret: "thisismysecretexpresssessionsodontlook",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());




//jwt
const { encodeJWT } = require("./controllers/utils");

//db connection
const { connectDB } = require("./db/connect");

//shopify apis
const { GetApiRest, PostApiRest, getAccessToken } = require('./controllers/shopify_api');

//router config
const router = express.Router();
const ApiRoutes = require("./routers/router.js");

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

app.get('/google/auth',
  passport.authenticate('google', {
      scope:
          ['email', 'profile']
  }
));


app.get("/google/callback", (req, res) => {
  passport.authenticate("google", async function (err, user, info) {
    if (err) {
      console.log("hi1", err);
    }
    if (!user) {
      return res.redirect("/google/auth/failed");
    }
      if (user) {
        const token = await encodeJWT(
          user.googleId
        );
        res.cookie("token", token);
        console.log('here1');
        res.redirect("/");
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
    name: 'experiment-ID-here',
    buckets: [
      {variant: 0, weight: 0.33},
      {variant: 1, weight: 0.33},
      {variant: 2, weight: 0.33}
    ]
  }

  // app.use(abtest(options));

// Have Node serve the files for our built React app
//app.use(express.static(path.resolve(__dirname, 'frontend/build')));

// Handle GET requests to /api route
router.use('/api', ApiRoutes)

app.get("/api", abtest(options),(req, res) => {


console.log(req.session.test.bucket,'req.session.test.bucket');

  if (req.session.test.bucket == 0) {
    res.json({ message: "Hello from server 0" });	
  } else if (req.session.test.bucket == 1) {
    res.json({ message: "Hello from server 1" });	
  } else if (req.session.test.bucket == 2) {
    res.json({ message: "Hello from server 2" });	
  } 
});

app.get("/api2", abtest(options),(req, res) => {


  console.log(req.session.test.bucket,'req.session.test.bucket');
  
    if (req.session.test.bucket == 0) {
      res.json({ message: "Hello from server 0" });	
    } else if (req.session.test.bucket == 1) {
      res.json({ message: "Hello from server 1" });	
    } else if (req.session.test.bucket == 2) {
      res.json({ message: "Hello from server 2" });	
    } 
  });

app.use(express.static(path.resolve(__dirname, 'frontend/build')));

app.get('/', async (req, res) => {
  console.log(req.query,'/ route');
  const {shop, hmac, host, timestamp} = req.query;

  if(shop)
  {
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
      
      res.sendFile(path.resolve(__dirname, 'frontend/build', 'index.html'));
    }
    else 
    {
      res.redirect(`/auth?hmac=${hmac}&host=${host}&shop=${shop}&timestamp=${timestamp}`);
    } 
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

