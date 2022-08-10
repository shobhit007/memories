import React from "react";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import { Provider } from "./context/Context";

import Login from "../src/components/login/Login";
import Signup from "../src/components/signup/Signup";
import Home from "./components/Home/Home";

const App = () => {
  return (
    <Router>
      <Provider>
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/login" element={<Login />}></Route>
          <Route exact path="/signup" element={<Signup />}></Route>
        </Routes>
      </Provider>
    </Router>
  );
};

export default App;
