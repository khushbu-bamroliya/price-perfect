//shopify apis
const { PostApiGraphql, PostApiRest, DemoGrapqlApi } = require('../controllers/shopify_api');
const Shop = require("../models/Shop");
const Product = require("../models/Product");
const _ = require("lodash");
const createTestModal = require('../models/createTestModal');
const { decodeJWT } = require('../controllers/utils');


const in_array = (array, id) => {
  return array.some(function (item) {
    return item.productId === id;
  });
}

const allProducts = async (req, res) => {
  try {
    
const item_per_page = 10;
    //let {shop} = req.headers
    var shop = process.env.SHOP;
    //shop = await decodeJWT(shop)
    //shop = shop.data
    var access_token = "";
    // const shop = process.env.SHOP
    console.log("shop", shop);
    if (shop) {

      const shopData = await Shop.findOne({ shop }).select(['access_token']);
      access_token = shopData.access_token
    }

    const {
      search,
      // endCursor,
      hasNextPageCursor,
      hasPreviousPageCursor,
    } = req.body;
    console.log("hasPreviousPageCursor", hasPreviousPageCursor);
    const endCursor = null
    console.log(req.body, "search");
    let query;

    async function recursion_products(endCursor) {
      if (!search) {
        console.log("cursor not blank", endCursor);
        let lastData;
        let firstData;
        if (hasPreviousPageCursor !== null) {
          lastData = item_per_page;
          firstData = null;
        } else {
          lastData = null;
          firstData = item_per_page;
        }
        query = `query products{
              products(first: ${firstData}, last:${lastData}, ${search ? 'query: "tag_not:price_perfect_duplicate AND title:*' + search + '*"' : 'query:"tag_not:price_perfect_duplicate"'}, after: ${endCursor} , before: ${JSON.stringify(hasPreviousPageCursor)}){ 
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
                          endCursor
                          hasNextPage
                          hasPreviousPage
                          startCursor
                        } 
                }
              }
          `;
        console.log("query: " + query);
      } else {
        console.log("first time and searching");
        query = `query products{
                products(first :10 ${search ? 'query: "tag_not:price_perfect_duplicate AND title:*' + search + '*"' : 'query:"tag_not:price_perfect_duplicate"'}){ 
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
      var hasNextPageFromApi = ans1.products.pageInfo.hasNextPage;
      var hasPreviousPageFromApi = ans1.products.pageInfo.hasPreviousPage;
      var startCursorFromApi = ans1.products.pageInfo.startCursor;

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
                  node.featuredImage && node.featuredImage.url
                    ? node.featuredImage.url
                    : "",
                title: node.title ? node.title : "",
                description: node.description ? node.description : "-",
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
            startCursorFromApi
          };
          return finalAns;
        }
      }
    }

    //call first time
    const resProducts = await recursion_products(JSON.stringify(hasNextPageCursor));
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

const getVariants = async (req, res) => {

  console.log("==>1")
  // const { shop, access_token } = ctx.state;
  //let {shop} = req.headers
  var shop = process.env.SHOP;

  //shop = await decodeJWT(shop)
  //shop = shop.data
  const { productId } = req.body;
  console.log("==>2", req.body)

  // var shop = process.env.SHOP;
  var access_token;

  const shopData = await Shop.findOne({ shop }).select(["access_token"]);

  if (shopData && shopData.access_token) {
    access_token = shopData.access_token;
  }

  console.log("==>3")
  try {
    let query = `query product {
        product(id: "${productId}") {
          id
          title
          handle
          featuredImage {

            src

          }
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
      for (let resProduct of ans1.data.product.variants.edges) {
        const info = resProduct.node;

        products.push({
          // id: resProduct.id,
          // title: resProduct.title,
          id: info.id,
          variantTitle: info.title,
          variantPrice: info.price,
          variantComparePrice: info.compareAtPrice,
          featuredImage: ans1.data.product.featuredImage ? ans1.data.product.featuredImage.src: "",
          productTitle: ans1.data.product.title
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


const createDuplicateProduct = async (req, res) => {
  try {

    //console.log("1")

    var { productId, productTitle,featuredImage,productPrice, objectToBeSent, handle, trafficSplit, fullProductId, testCases, status } = req.body;
    //console.log("==>2", req.body)

    //let {shop} = req.headers
    var shop = process.env.SHOP;

    //shop = await decodeJWT(shop)
    //shop = shop.data

    // var shop = process.env.SHOP;
    var access_token;
    let newObjectToBeSent;
    let objectToBeSentCreated = [];
    let newDuplicateVariantsArray = [];
    const shopData = await Shop.findOne({ shop }).select(["access_token"]);

    if (shopData && shopData.access_token) {
      access_token = shopData.access_token;
    }

    console.log("==>3")
    const duplicateProductId = [];
    let originalProductTags = [];
    let duplicateVariantsIds = [];


    for (let i = 0; i < objectToBeSent?.testCases.length; i++) {


      var query = `mutation {
      productDuplicate(productId: "gid://shopify/Product/${productId}",
        newTitle: "${productTitle}",
        includeImages: true,
        newStatus: ACTIVE) {
        newProduct {
          id
          title
          tags
          vendor
          productType
          variants(first: 100) {
            nodes {
              id
              title
            }
          }
        }
        imageJob {
          id
          done
        }
        userErrors {
          field
          message
        }
      }
    }
    `;
      let NewRes = await PostApiGraphql(shop, access_token, query);

      let newMakeArr = NewRes.data.productDuplicate.newProduct.variants.nodes;
      let duplicateVariantId = NewRes.data.productDuplicate.newProduct.id;
      // console.log(newMakeArr); return false;
      // console.log("NewRes", NewRes.data.productDuplicate.newProduct.variants.nodes)
      duplicateProductId.push(NewRes.data.productDuplicate.newProduct.id)
      console.log("duplicateProductId", duplicateProductId);



      newMakeArr.map((i) => {
        duplicateVariantsIds.push(i.id)
      })

      NewRes?.data?.productDuplicate?.newProduct?.tags
      console.log("variants array loop i=", i);

      //new code

      for (j = 0; j < newMakeArr.length; j++) {

        console.log("j =", j, objectToBeSent?.testCases[i]);
        console.log("product id:", duplicateVariantId, "var id:", newMakeArr[j].id)

        var query_var = '';

        // console.log(objectToBeSent?.testCases[i].variants[j], 'umi');

        if (objectToBeSent?.testCases[i].variants[j].abVariantComparePrice != null) {

          // query_var = `
          // mutation {
          //   productUpdate(input: {
          //     id: "${duplicateVariantId}",
          //     tags: "jash",
          //     variants:[{
          //       id:"${newMakeArr[j].id}",
          //       price:"${objectToBeSent?.testCases[i].variants[j].abVariantPrice}",
          //       compareAtPrice: "${objectToBeSent?.testCases[i].variants[j].abVariantComparePrice}"
          //     }]
          //   }) { 
          //     product {
          //       id
          //       title
          //       tags
          //       variants(first:100) {
          //         edges {
          //           node {
          //             id
          //             title
          //             price
          //             compareAtPrice
          //           }
          //         }
          //       }
          //     }
          //   }
          // }`
console.log("object tests", objectToBeSent.testCases);
          query_var = `
        mutation productVariantUpdate {
          productVariantUpdate(
          input: {
            id: "${newMakeArr[j].id}",
            price: "${objectToBeSent?.testCases[i].variants[j].abVariantPrice}",
            compareAtPrice: "${objectToBeSent?.testCases[i].variants[j].abVariantComparePrice}"
          
        }
        ) {
            productVariant {
              id
              title
              inventoryPolicy
              inventoryQuantity
              price
              compareAtPrice
              product
              {
                id
              }
            }
            userErrors {
              field
              message
            }
          }
        }
        `

        }
        else {
          // query_var = `
          // mutation {
          //   productUpdate(input: {
          //     id: "${duplicateVariantId}",
          //     tags: "jash",
          //     variants:[{
          //       id:"${newMakeArr[j].id}",
          //       price:"${objectToBeSent?.testCases[i].variants[j].abVariantPrice}",
          //     }]
          //   }) { 
          //     product {
          //       id
          //       title
          //       tags
          //       variants(first:100) {
          //         edges {
          //           node {
          //             id
          //             title
          //             price
          //             compareAtPrice
          //           }
          //         }
          //       }
          //     }
          //   }
          // }`

          query_var = `
        mutation productVariantUpdate {
          productVariantUpdate(
          input: {
            id: "${newMakeArr[j].id}",
            price: "${objectToBeSent?.testCases[i].variants[j].abVariantPrice}",
          
        }
        ) {
            productVariant {
              id
              title
              inventoryPolicy
              inventoryQuantity
              price
              compareAtPrice
              product
              {
                id
              }
            }
            userErrors {
              field
              message
            }
          }
        }
        `
        }

        // console.log(query_var, 'query_var');

        const NewPriceAtDuplicateProduct = await PostApiGraphql(shop, access_token, query_var);


        objectToBeSent.testCases[i].variants[j].duplicateProductId = NewPriceAtDuplicateProduct.data.productVariantUpdate.productVariant.product.id;
        objectToBeSent.testCases[i].variants[j].duplicateVariantId = NewPriceAtDuplicateProduct.data.productVariantUpdate.productVariant.id;


        console.log("NewPriceAtDuplicateProduct33333", NewPriceAtDuplicateProduct.data.productVariantUpdate.productVariant.product.id)

        newObjectToBeSent = { ...objectToBeSent.testCases[i].variants[j], "duplicateVariantId": newMakeArr[j].id }
        console.log("newObjectToBeSent2222", newObjectToBeSent);
        newDuplicateVariantsArray.push(newObjectToBeSent)
      }
      console.log("newDuplicateVariantsArray", newDuplicateVariantsArray);
      newObjectToBeSent = { ...objectToBeSent.testCases[i] }
      objectToBeSentCreated.push(newObjectToBeSent)
      console.log("newObjectToBeSent", newObjectToBeSent);
      //new code
    }


    originalProductTags.push('price_perfect_duplicate', `handle | ${handle}`)

    console.log("originalProductTags", originalProductTags)

    console.log("duplicateVariantsIds", duplicateVariantsIds)


    duplicateProductId.map(async (i) => {

      let addTagsInDuplicateProduct = `mutation {
          productUpdate(input: {id: "${i}", tags: "${originalProductTags}"}) { 
            product {
              id
              title
              tags
            }
          }
        }
        `
      let TagRes = await PostApiGraphql(shop, access_token, addTagsInDuplicateProduct);
      // console.log("TagRes", TagRes)
    })


    duplicateProductId.map(async (i) => {
      const addMetaFieldQuery = `mutation{
  productUpdate(input : {
    id: "${i}",
    metafields: [
      {
        namespace: "seo",
        key: "hidden",
        value: "1",
        type: "single_line_text_field",
      }
    ]
  } ) {
    product {
      metafields(first: 100) {
        edges {
          node {
            namespace
            key
            value
          }
        }
      }
    }
  }
}
`

      let metafieldResponse = await PostApiGraphql(shop, access_token, addMetaFieldQuery);
      // console.log("metafieldResponse", metafieldResponse);
    })
    console.log("objectToBeSentCreated", JSON.stringify(objectToBeSentCreated));
    // res.status(200).json({
    //   data: { duplicateProductId, originalProductTags, duplicateVariantsIds, objectToBeSent: objectToBeSentCreated },
    //   success: true,
    //   status: 200
    // })

    //Db API
    console.log("==>22", req.body);

    // let { trafficSplit, productId,testCases, status } = req.body;

    let createTestData = await createTestModal.create({ trafficSplit, testCases: objectToBeSentCreated, productId: 'gid://shopify/Product/' + productId, status, productPrice, featuredImage, productTitle })

    if (!createTestData) {
      return res.json("Create Test case error...!")
    }
console.log("createTestData", createTestData);
    res.status(200).json({
      data: createTestData,
      handle,
      success: true,
      status: 200
    })
  } catch (error) {
    console.log("Error for duplicate product", error);
  }
}


module.exports = {
  allProducts,
  getVariants, createDuplicateProduct
}

