const AuthHelper = {
    authUrl({
      shop,
      //state,
      SHOPIFY_API_KEY,
      SHOPIFY_SCOPES = process.env.SCOPES,
      REDIRECT_URL,
      ACCESS_MODE = "offline"
    } = {}) {
      return `https://${shop}/admin/oauth/authorize?client_id=${SHOPIFY_API_KEY}&scope=${SHOPIFY_SCOPES}&redirect_uri=${REDIRECT_URL}&access_mode=${ACCESS_MODE}`;
    },
  
    embedAppUrl(obj) {
      const qs = new URLSearchParams(obj);
      return `${process.env.HOST}/?` + qs.toString();
    },
  
    generateRedirectUrl(url) {
      return `${process.env.HOST}${url}/auth/callback`;
    },
  };
  
module.exports = AuthHelper;