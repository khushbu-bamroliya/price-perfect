import React from "react";
import logo from "./logo.svg";
import "./App.css";
import YourTest from "./Component/YourTest";
import { Route, Routes } from "react-router-dom";
import WelcomeBack from "./Component/WelcomeBack";
import CreateTest from "./Component/CreateTest";
import CreateTestPage2 from "./Component/CreateTestPage2";
import SignUp from "./Component/SignUp"
import Revenue from "./Component/Revenue";
import HomeDashboard from "./Component/HomeDashboard";
import WelcomePage from "./Component/WelcomePage";

export default function App() {

  return (
    <div>
      <Routes>
        <Route element={<WelcomePage />} path='/'/>
        <Route element={<SignUp />} path='/signup'/>
        <Route element={<HomeDashboard /> } path='/homeDashboard' />
      </Routes>
      {/* <WelcomePage /> */}
      {/* <SignUp /> */}
      {/* <Revenue /> */}
      {/* <ResultPage /> */}
      {/* <homeDashboard /> */}
      {/* <YourTest /> */}
      {/* <WelcomeBack /> */}
      {/* <CreateTest /> */}
      {/* <CreateTestPage2 /> */}
    </div>
  );
}
