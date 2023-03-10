import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import { useEffect, useState } from 'react';
import CreateTestStep1 from './Component/CreateTestStep1';

// import CreateTestStep2 from './Component/CreateTestStep2';
import HomeDashboard from './Component/HomeDashboard';
import ReviewTestPage from './NewComponents/ReviewTestPage';
import SignUp from './Component/SignUp';
import ViewOrManageTestPage from './Component/ViewOrManageTestPage';
import WelcomePage from './Component/WelcomePage';
import YourProfile from './Component/YourProfile';
import YourTests from './Component/YourTests';
import { getUser 





} from "./controller/handleGoogleSignIn"
import ForgotPassword from "./Component/ForgotPassword"
import Loader from './Component/Loader';
import CreateTestStep2 from './NewComponents/CreateTestStep2';
import cookieReader from './controller/cookieReader';

function App() {

  const navigate = useNavigate();

  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [productImage, setProductImage] = useState();
  const objectSent = (childdata) => {
    console.log("childdata: " + childdata);
    setData(childdata);
  }
  const getProductImage = (childdata) => {
    console.log("getProductImage: " + childdata);
    setProductImage(childdata)
  }
  console.log("data", data);

  // const shop = document.cookie.match('(^|;)\\s*' + "shop" + '\\s*=\\s*([^;]+)')?.pop() || ''
  const shop = cookieReader('shop')
  console.log("shop is: " + shop);
  console.log("window link", window.location.href);
  console.log("window path", window.location.pathname);
  const urlPath = window.location.pathname
  useEffect(() => {
    getUser("token", navigate, shop, setLoading, urlPath)

  }, [])

  return (

    loading ? <Loader size={40} /> : <>
      {shop ? (<>

        <Routes>
          <Route element={<WelcomePage shop={shop} />} path='/' />
          <Route element={<SignUp />} path='/signup' />
          <Route element={<ForgotPassword />} path='/forgot-password' />
          <Route element={<HomeDashboard />} path='/homeDashboard' />
          <Route element={<CreateTestStep1 shop={shop} getProductImage={getProductImage} />} path="/createtest" />
          <Route element={<CreateTestStep2 shop={shop} objectSent={objectSent} />} path="/createtest/step2" />
          <Route element={<YourTests />} path="/yourtests" />
          <Route element={<ReviewTestPage created={data} productImage={productImage} />} path="/reviewtest" />
          <Route element={<YourProfile />} path="/profile" />
          <Route element={<ViewOrManageTestPage />} path="/managetest" />
        </Routes>
      </>) :
        "Please open app from the Shopify admin panel."
      }
    </>
  );
}

export default App;
