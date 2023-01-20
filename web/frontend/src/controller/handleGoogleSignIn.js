export const handleGoogleSignIn = (setLoader, shop) => {
  console.log("shop from handleGoogleSignIn",shop);
  console.log("Signing in...");
  if (window.location.hostname === "localhost") {
    console.log("Hello 1");
    window.open(`${window.location.hostname}/google/auth`, "_self")
    
  } else {
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

export function getUser(name,navigate, shop) {
  console.log("Cookie flag1");
  // Split cookie string and get all individual name=value pairs in an array
  var cookieArr = document.cookie.split(";");

  // Loop through the array elements
  for(var i = 0; i < cookieArr.length; i++) {
      var cookiePair = cookieArr[i].split("=");
    
      /* Removing whitespace at the beginning of the cookie name
      and compare it with the given string */
      if(name == cookiePair[0].trim()) {
        
        const config = {
          method: "GET",
          mode:"no-cors",
          credentials:"same-origin"
        }
        try {
          fetch(`/api/googleuser/${JSON.stringify(decodeURIComponent(cookiePair[1])).replaceAll('"','')}`, config)
          .then(async (res) => {
            if (res) {
              navigate("/homeDashboard")
            }
            console.log("res2",await res.json())
          })
          .catch((err) =>  console.log(err) );
          
        } catch (error) {
          console.log("error", error);
        }

      
      }
  }

  return navigate('/');
}