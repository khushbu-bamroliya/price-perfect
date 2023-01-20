const getApiUrl = process.env.REACT_NODE_ENV === "production" ? "/" : "http://localhost:8081";
// const getApiUrl = process.env.REACT_NODE_ENV !== "production" ? "https://liam-price-perfect-app.appmixo.in" : "https://liam-price-perfect-app.appmixo.in";

export default getApiUrl; 