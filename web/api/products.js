//shopify apis
const { PostApiGraphql } = require('../controllers/shopify_api');
const Shop = require("../models/Shop");
const Product = require("../models/Product");
const _ = require("lodash");

const in_array = (array, id) => {
    return array.some(function (item) {
      return item.productId === id;
    });
  }

const allProducts = async (ctx) => {
    try {
      const { shop } = req.headers;

      var access_token = "";

      if(shop){
        access_token = await Shop.findOne({shop}).select(['access_token']);
      }

      const {
        search,
        endCursor,
        hasNextPage,
        hasPreviousPage,
      } = req.body;

      console.log(req.body, "request.body");
      let query;

      async function recursion_products(endCursor) {
        if (endCursor != "") {
          console.log("cursor not blank", endCursor);
          query = `query products{
            products(first :20 ${
              //search ? ",query:title:*" + search + "*" : "" //old
              search ? ',query:"title:*' + search + '*"' : "" //new
            },after:"${endCursor}"){ 
                edges { 
                  cursor 
                  node { 
                          id 
                          title
                          handle
                            featuredImage{ 
                              originalSrc 
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
              products(first :20${
                search ? ',query:"title:*' + search + '*"' : ""
              }){ 
                edges { 
                cursor 
                node { 
                        id 
                        title
                        handle
                          featuredImage{ 
                            originalSrc 
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

        console.log("Query", query);

        let ans1 = await getWithPagination(
          shop,
          access_token,
          query,
          "products"
        );

        let responseData = _.get(ans1.data, "products");
        let temp_var = [];
        let ans = ans1.data.products.edges;

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
          var tempArr2 = [];

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
                    node.featuredImage && node.featuredImage.originalSrc
                      ? node.featuredImage.originalSrc
                      : "",
                  title: node.title ? node.title : "",
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

          // console.log(getDbProducts, 'getDbProducts');

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

          //console.log(pro.length, 'pro length');

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
      return res.status(200).send(resProducts);
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
            response.data.data &&
            _.get(response.data.data, name) &&
            _.get(response.data.data, name).edges
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

module.exports = {
    allProducts
}