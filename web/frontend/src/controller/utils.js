const getApiUrl = process.env.REACT_NODE_ENV === "production" ? "/" : "http://localhost:8081";

export default getApiUrl;