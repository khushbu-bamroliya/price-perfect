import cookieReader from "./cookieReader";

export const handleGoogleSignIn = (setLoading, shop) => {
  console.log("Hey Google");
  setLoading({manual : true})
  // console.log("shop from handleGoogleSignIn",shop);
  console.log("Signing in...");
  if (window.location.hostname === "localhost") {
    setLoading({manual : false})
    console.log("Hello 1");
    window.open(`/google/auth`, "_self")
    
  } else {
    setLoading({manual : false})
    console.log("Hello 2");
    window.open(window.location.origin + "/google/auth", "_self");

  }
}
export const handleGoogleLogout = async () => {
  if (window.location.hostname === "localhost") {
    console.log("Hello 132");
    window.open(`/google/logout`, "_self")
    
  } else {
    console.log("Hello 232");
    window.open(window.location.origin + "/google/logout", "_self");

  }}

export function getUser(name,navigate, shop, setLoading,urlPath) {
  setLoading(true)
  const tok = cookieReader('token')
  console.log("Cookie flag1", tok);
  if (tok) {
    try {
      const config = {
        method: "GET",
        mode:"no-cors",
        credentials:"same-origin"
      }
      fetch(`/api/googleuser/${tok}`, config)
      .then(async (res) => {
        if (res) {
          navigate(urlPath)

          setLoading(false)
        }
        console.log("res2",await res.json())
      })
      .catch((err) =>  console.log("logout error",err) );
      
    } catch (error) {
      console.log("logout catch error", error);
    }
  }else{

    navigate("/")
    setLoading(false)
  }
}