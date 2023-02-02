const getApiUrl = process.env.REACT_APP_NODE_ENV === "production" ? "https://liam-price-perfect-app.appmixo.in" : "";
//  const getApiUrl = process.env.REACT_APP_NODE_ENV !== "production" ? "https://liam-price-perfect-app.appmixo.in" : "https://liam-price-perfect-app.appmixo.in";

export default getApiUrl; 