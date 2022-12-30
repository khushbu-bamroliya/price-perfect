//shopify apis
const { PostApiGraphql, PostApiRest, DemoGrapqlApi } = require('../controllers/shopify_api');
const Shop = require("../models/Shop");
const Product = require("../models/Product");
const _ = require("lodash");

const in_array = (array, id) => {
    return array.some(function (item) {
      return item.productId === id;
    });
  }

  const allProducts = async (req, res) => {
    try {
     
      var access_token = "";
      const shop = process.env.SHOP
      if (shop) {
  
        const shopData = await Shop.findOne({ shop }).select(['access_token']);
        access_token = shopData.access_token
      }
  
      const {
        search,
        // endCursor,
        hasNextPage,
        hasPreviousPage,
      } = req.body;
      const endCursor = null
      console.log(req.body, "search");
      let query;
     
      async function recursion_products(endCursor) {
        if (endCursor != "") {
         
          query = `query products{
              products(first: 10, ${search ? ',query:"title:*' + search + '*"' : "" } ,  after: ${endCursor}){ 
                  edges { 
                    cursor 
                    node { 
                            id 
                            title
                            handle
                            description
                              featuredImage{ 
                                url 
                              } 
                              variants(first:1){
                                edges{
                                  node{
                                    price
                                  }
                                }
                              }
                          } 
                        } 
                        pageInfo { 
                          hasNextPage 
                          hasPreviousPage 
                        } 
                }
              }
          `;
        } else {
          console.log("first time and searching");
          query = `query products{
                products(first :10 ${search ? ',query:"title:*' + search + '*"' : ""
            }){ 
                  edges { 
                  cursor 
                  node { 
                          id 
                          title
                          handle
                          description
                            featuredImage{ 
                              url 
                            } 
                            variants(first:1){
                              edges{
                                node{
                                  id
                                  price
                                }
                              }
                            }
        
                        } 
                      } 
                      pageInfo { 
                        hasNextPage 
                        hasPreviousPage 
                      } 
                    } 
                }
            `;
        }
  
        // console.log("Query", query);
  
        let ans1 = await getWithPagination(
          shop,
          access_token,
          query,
          "products"
        );
        console.log("ans1", ans1);
        let responseData = _.get(ans1.data, "products");
        let temp_var = [];
        let ans = ans1.products.edges;
  
        var products = [];
        var endCursorFromApi = "";
        var hasNextPageFromApi = "";
        var hasPreviousPageFromApi = "";
  
        if (ans && Array.isArray(ans) && ans.length > 0) {
          if (
            ans1 &&
            ans1.data &&
            ans1.data.products &&
            ans1.data.products.pageInfo
          ) {
            hasNextPageFromApi =
              ans1.data.products.pageInfo &&
              ans1.data.products.pageInfo.hasNextPage;
            hasPreviousPageFromApi =
              ans1.data.products.pageInfo &&
              ans1.data.products.pageInfo.hasPreviousPage;
          }
  
          var tempArr1 = [];
  
          for (let index = 0; index < ans.length; index++) {
            if (index + 1 == ans.length) {
              endCursorFromApi = ans[index].cursor;
            }
  
            //create arr for Db
            const node = ans[index] && ans[index].node && ans[index].node;
  
            if (node) {
              if (node.id) {
                tempArr1.push(node.id);
              }
  
              products = [
                ...products,
                {
                  id: node.id ? node.id : "",
                  image:
                    node.featuredImage && node.featuredImage.url
                      ? node.featuredImage.url
                      : "",
                  title: node.title ? node.title : "",
                  description:node.description ? node.description : "-",
                  variant_title: "",
                  price:
                    node.variants &&
                      node.variants.edges &&
                      node.variants.edges[0] &&
                      node.variants.edges[0].node.price
                      ? node.variants.edges[0].node.price
                      : "",
                  cursor: ans[index].cursor,
                  productId: node.id ? node.id : "",
                  handle: node.handle
                    ? `https://${shop}/products/${node.handle}`
                    : "",
                },
              ];
            }
          }
  
          //match temp1 arr products with DB
          const getDbProducts = await Product.find({
            shop,
            productId: { $in: tempArr1 },
          });
  
          if (getDbProducts && getDbProducts.length > 0) {
            var pro = products.filter(function (value) {
              console.log(
                "in_array(getDbProducts,value.id)",
                in_array(getDbProducts, value.id)
              );
              return in_array(getDbProducts, value.id) == false;
            });
          } else {
            var pro = products;
          }
  
          if (pro.length == 0) {
            //call again
            return await recursion_products(endCursorFromApi);
          } else {
            var finalAns = {
              products: pro,
              endCursorFromApi,
              hasNextPageFromApi,
              hasPreviousPageFromApi,
            };
            return finalAns;
          }
        }
      }
  
      //call first time
      const resProducts = await recursion_products(endCursor);
      console.log("resProducts: " + resProducts);
    
         res.status(200).send(resProducts);
        
    
    } catch (error) {
      console.log("error", error);
      return res.status(500).send("Internal server error!!");
    }
  };

const getWithPagination = async (shop, token, query, name, value, cursor) => {
    return new Promise(async (resolve, reject) => {
      try {

        const response = await PostApiGraphql(shop, token, query);
  
        if (
          !(
            response &&
            response.data &&
            _.get(response.data, name) &&
            _.get(response.data, name).edges
          )
        ) {
          return reject(
            "Not got Response data, pass name and edge properly in query!"
          );
        }
  
        return resolve(response.data);
      } catch (error) {
        console.log("Error: ", error);
        return reject(error);
      }
    });
};

const getVariants= async (req, res) => {

  console.log("==>1")
  // const { shop, access_token } = ctx.state;

  const { productId } = req.body;
  console.log("==>2", req.body)

  let shop = "rx-stage-store-2.myshopify.com";
  let access_token = "shpua_f797062e7955012f8d1871efc1a8f938"

  console.log("==>3")
  try {
    let query = `query product {
        product(id: "${productId}") {
          id
          title
          handle
          variants(first: 100) {
            edges {
              node {
                id
                title
                price
                compareAtPrice
              }
            }
          }
        }
      }
    `;

    let ans1 = await PostApiGraphql(shop, access_token, query);

    var products = [];

    if (ans1.data && ans1.data.product && ans1.data.product.variants.edges) {
      for(let resProduct of ans1.data.product.variants.edges){
        const info = resProduct.node;
        products.push({
          // id: resProduct.id,
          // title: resProduct.title,
          variant_id: info.id,
          variant_title: info.title,
          variant_price: info.price,
          variant_compare_price:info.compareAtPrice
        })
      }

      console.log("New Array", products)

      res.status(200).json({
        data: products,
        success: true,
        status: 200
      })
    } 
  } catch (error) {
    console.log("error", error);
  }
};

module.exports = {
    allProducts,
    getVariants
}