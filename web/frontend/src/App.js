import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import { useEffect } from 'react';
import WelcomePage from "./Component/WelcomePage";
import Password from "./Component/Password";
import Dashboard from "./Component/Dashboard";
import Settings from "./Component/Settings";

function App() {

  const navigate = useNavigate();


  return (
    <div>
      <Routes>
        <Route element={<WelcomePage />} path='/' />
        <Route element={<Password />} path='/password' />
        <Route element={<Dashboard />} path='/dashboard' />
        <Route element={<Settings />} path='/settings' />
      </Routes>

    </div>
  );
}

export default App;
