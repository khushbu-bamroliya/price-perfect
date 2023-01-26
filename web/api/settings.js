const Shop = require("../models/Shop");
const {
    GetApiRest,
  } = require("../controllers/shopify_api");

const enableDisableApp = async(req, res) => {
    const shop = req.headers.shop;

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
            console.log(theme.theme_store_id,'value'); //887
            const resAssets = await GetApiRest(
              `https://${shop}/admin/api/${process.env.SHOPIFY_API_VERSION}/themes/${theme.id}/assets.json`,
              access_token
            );
            //console.log(resAssets,'resAssets');
            if(resAssets && resAssets.assets && resAssets.assets.length > 0)
            {
              for(const asset of resAssets.assets)
              {
                // console.log(asset,"asset");
                if(asset.key === "snippets/price.liquid")
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
}

module.exports = {
    enableDisableApp
}