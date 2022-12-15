const axios = require("axios");

module.exports = {
  getRestClient: (shop, access_token) => {
    return axios.create({
      baseURL: `https://${shop}/admin/api/${process.env.SHOPIFY_API_VERSION}`,
      headers: {
        "X-Shopify-Access-Token": access_token,
      },
    });
  },
  getAccessToken: (client_id, client_secret, shop, code) =>
    new Promise(async (resolve, reject) => {
      try {
        const response = await axios({
          url: `https://${shop}/admin/oauth/access_token`,
          method: "POST",
          // headers: {
          //   "X-Shopify-Access-Token": client_secret,
          // },
          responseType: "json",
          data: {
            client_id,
            client_secret,
            code,
          }
        });

        return resolve(response.data);
      } catch (error) {
        console.log("error in get access token", error);
        return reject(error);
      }
    }),
  GetApiRest: (url, client_secret) =>
    new Promise(async (resolve, reject) => {
      try {
        const response = await axios({
          url,
          method: "GET",
          headers: {
            "X-Shopify-Access-Token": client_secret,
          },
          responseType: "json",
        });
        console.log("response Access token", response.data)
        resolve(response.data);
      } catch (error) {
        console.log("error in get api rest", error);
        reject(error);
      }
    }),
  PostApiRest: (url, client_secret, data) =>
    new Promise(async (resolve, reject) => {
      try {
        const response = await axios({
          url,
          method: "POST",
          headers: {
            "X-Shopify-Access-Token": client_secret,
          },
          responseType: "json",
          data,
        });

        resolve(response.data);
      } catch (error) {
        console.log("error in post api rest", error);
        reject(error);
      }
    }),

  callGraphql: (shop, token, query) =>
    new Promise(async (resolve, reject) => {
      try {
        const response = await axios({
          url: `https://${shop}/admin/api/${process.env.SHOPIFY_API_VERSION}/products.json`,
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Shopify-Access-Token": token,
          },
          responseType: "json",
          data: query,
        });

        resolve(response.data);
      } catch (error) {
        console.log("error in post api rest", error);
        reject(error);
      }
    }),
};