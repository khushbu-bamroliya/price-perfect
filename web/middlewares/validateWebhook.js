const getRawBody = require("raw-body");
const crypto = require("crypto");

const validateWebhook = async (req, res, next) => {
  try {
    const { SHOPIFY_API_SECRET } = process.env;

    console.log("SHOPIFY_API_SECRET", SHOPIFY_API_SECRET);

    const hmac = req.get("X-Shopify-Hmac-Sha256");
    console.log("hmac", hmac);
    const body = await getRawBody(req);
    console.log("body", body);
    req.body = { ...JSON.parse(body) };
    console.log("req.body", req.body);

    const digest = crypto
      .createHmac("sha256", SHOPIFY_API_SECRET)
      .update(body, "utf8", "hex")
      .digest("base64");
    if (digest !== hmac) {
      console.log("webhook verification failed");
      return res.status(401).send("hmac validation failed");
    }
    console.log("webhook verification successful");
    return next();
  } catch (error) {
    console.log(error);
    return res.status(401).send("hmac validation failed");
  }
};

module.exports = validateWebhook;