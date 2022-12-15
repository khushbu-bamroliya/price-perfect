const { getRestClient } = require('../controllers/shopify_api.js');

const GetAllShopifyProduct = async () => {
    try {
        console.log("GetAllShopifyProduct started");

        const ShopDtata = await getRestClient(shop.accessToken)

        console.log("ShopDtata", ShopDtata);

    } catch (error) {
        console.log("error", error);
    }
}

module.exports = {
    GetAllShopifyProduct
}