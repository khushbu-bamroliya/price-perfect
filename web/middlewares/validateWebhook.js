const getRawBody = require("raw-body");
const crypto = require("crypto");

const validateWebhook = async (req, res, next) => {
  try {
    const { SHOPIFY_SECRET_KEY } = process.env;

    console.log("SHOPIFY_SECRET_KEY", SHOPIFY_SECRET_KEY);

    const hmac = req.get("X-Shopify-Hmac-Sha256");
    console.log("hmac", hmac);
    const body = await getRawBody(req);
    req.body = { ...JSON.parse(body) };

    const digest = crypto
      .createHmac("sha256", SHOPIFY_SECRET_KEY)
      .update(body, "utf8", "hex")
      .digest("base64");
    if (digest !== hmac) {
      console.log("webhook verification failed");
      return res.status(401).send("hmac validation failed");
    }
    console.log("webhook verification successful");
    return next();
  } catch (error) {
    console.log(error.message);
    return res.status(401).send("hmac validation failed");
  }
};

module.exports = validateWebhook;