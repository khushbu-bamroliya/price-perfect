
import express from "express";
import axios from "axios";
var routers = express.Router();

// routers.get("/api/create-price-rule", async (req,res)=>{
//     console.log("create price rule called");

//     var data = {
//         "price_rule": {
//           "title": "SUMMERSALE10OFF",
//           "target_type": "line_item",
//           "target_selection": "all",
//           "allocation_method": "across",
//           "value_type": "fixed_amount",
//           "value": "-10.0",
//           "customer_selection": "all",
//           "starts_at": "2017-01-19T17:59:10Z"
//         }
//       };
      
//       var config = {
//         method: 'post',
//         url: 'https://hsa-appmixo.myshopify.com/admin/api/2022-04/price_rules.json',
//         headers: { 
//           'X-Shopify-Access-Token': 'shpua_abf3c8e847677bd82b1cca095740133b', 
//           'Content-Type': 'application/json'
//         },
//         data : data
//       };
      
//       axios(config)
//       .then(function (response) {
//         console.log(response.data);
//         res.send({data:response.data,status:res.statusCode});
//       })
//       .catch(function (error) {
//         console.log("Error in create price rule",error);
//       });
// });

// routers.get("/api/create-discount", async (req,res)=>{
//     console.log("create discount code called");

//     var data = {
//         "discount_code": {
//           "code": "SUMMERSALE10OFF"
//         }
//       };
      
//       var config = {
//         method: 'post',
//         url: 'https://hsa-appmixo.myshopify.com/admin/api/2022-04/price_rules/1227871191282/discount_codes.json',
//         headers: { 
//           'X-Shopify-Access-Token': 'shpua_abf3c8e847677bd82b1cca095740133b', 
//           'Content-Type': 'application/json'
//         },
//         data : data
//       };
      
//       axios(config)
//       .then(function (response) {
//         console.log(response.data);
//         res.send({data:response.data,status:res.statusCode});
//       })
//       .catch(function (error) {
//         console.log("Error in create discount",error);
//       });      

// });

export default routers;