import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import { useEffect } from 'react';
import CreateTestStep1 from './Component/CreateTestStep1';
import CreateTestStep2 from './Component/CreateTestStep2';
import HomeDashboard from './Component/HomeDashboard';
import ReviewTestPage from './Component/ReviewTestPage';
import SignUp from './Component/SignUp';
import ViewOrManageTestPage from './Component/ViewOrManageTestPage';
import WelcomePage from './Component/WelcomePage';
import YourProfile from './Component/YourProfile';
import YourTests from './Component/YourTests';
import { getUser } from "./controller/handleGoogleSignIn"
import ForgotPassword from "./Component/ForgotPassword"

function App() {

  const navigate = useNavigate();
  useEffect(() => {
    getUser("token", navigate)
  },[])

  return (
    <div>
      <Routes>

      <Route element={<WelcomePage />} path='/'/>
        <Route element={<SignUp />} path='/signup'/>
        <Route element={<ForgotPassword />} path='/forgot-password'/>
        <Route element={<HomeDashboard /> } path='/homeDashboard' />
        <Route element={<CreateTestStep1/>} path="/createtest"/>
        <Route element={<CreateTestStep2/>} path="/createtest2/:id/:title"/>
        <Route element={<YourTests/>} path="/yourtests"/>
        <Route element={<ReviewTestPage/>} path="/reviewtest"/>
        <Route element={<YourProfile/>} path="/profile"/>
        <Route element={<ViewOrManageTestPage/>} path="/managetest"/>
      </Routes>
    </div>
  );
}

export default App;
  