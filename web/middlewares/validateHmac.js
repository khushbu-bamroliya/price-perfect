const crypto = require("crypto");

const validateHmac = (req, res, next) => {
  try {
    const { SHOPIFY_API_SECRET } = process.env;

    let data = Object.assign({}, req.query);
    const hmac = data["hmac"];
    delete data["hmac"];
    const dataStr = new URLSearchParams(data);
    const digest = crypto
      .createHmac("sha256", SHOPIFY_API_SECRET)
      .update(dataStr.toString())
      .digest("hex");

    console.log("digest", digest)
    console.log("hmac", hmac)

    if (hmac !== digest) {
      console.log("verification failed");
      return res.status(401).send("hmac validation failed");
    }
    return next();
  } catch (error) {
    return res.status(401).send("hmac validation failed");
  }
};

module.exports = validateHmac;
