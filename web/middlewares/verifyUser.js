const jwt = require("jsonwebtoken");

const verifyToken = (payload, API_KEY) => {
  const { exp, nbf, iss, dest, aud } = payload;
  const currentTimeStep = Math.floor(Date.now() / 1000);

  if (
    currentTimeStep > exp ||
    currentTimeStep < nbf ||
    !iss.includes(dest) ||
    aud !== API_KEY
  )
    return false;
  return true;
};

const verifyUser = async (req, res, next) => {
  try {
    const { SHOPIFY_API_SECRET, SHOPIFY_API_KEY } = process.env;
    let authorization = req.headers.authorization;

    if (!authorization) {
      return res.status(401).send("UnAuthrise session token not found");
    }

    authorization = authorization.replace("Bearer ", "");

    const payLoad = jwt.verify(authorization, SHOPIFY_API_SECRET);

    const isVerified = verifyToken(payLoad, SHOPIFY_API_KEY);

    if (!isVerified) {
      return res.status(401).send("UnAuthrise session token not verified");
    }

    const shop = payLoad.dest.replace("https://", "");

    req._shop = shop;

    return next();
  } catch (err) {
    return res.status(401).send("UnAuthrise session token verification failed");
  }
};

module.exports = verifyUser;