// import React from "react";
// import logo from "./logo.svg";
// import "./App.css";
// import Pricetest from "./Component/Pricetest";

// export default function App() {

//   return (
//     <div>
//       <Pricetest />
//     </div>
//   );
// }


import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Pricetest from "./Component/Pricetest";
import YourTest from "./Component/YourTest";
import { Route, Routes } from "react-router-dom";
import WelcomeBack from "./Component/WelcomeBack";
import CreateTest from "./Component/CreateTest";
import CreateTestPage2 from "./Component/CreateTestPage2";


export default function App() {

  return (
    <div>
      {/* <Routes> */}
        {/* <Route exact path="/test" element={<Test/> } /> */}
        {/* <Route exact path="/createtest" element={<CreateTest/> }  />
      </Routes> */}
      <Pricetest />
      <YourTest />
      <WelcomeBack />
      <CreateTest />
      <CreateTestPage2 />
    </div>
  );
}
