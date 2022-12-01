import React from "react";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import { Provider } from "./context/Context";

import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import Home from "./pages/home/Home";
import Post from "./pages/post/Post";
import Account from "./pages/account/Account";

const App = () => {
  return (
    <Router>
      <Provider>
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/login" element={<Login />}></Route>
          <Route exact path="/signup" element={<Signup />}></Route>
          <Route exact path="/:uid/new-post" element={<Post />}></Route>
          <Route exact path="/:uid/account" element={<Account />}></Route>
        </Routes>
      </Provider>
    </Router>
  );
};

export default App;
