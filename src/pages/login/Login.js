import React, { useState, useEffect } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";
import { Context } from "../../context/Context";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { state, loginWithEmailAndPassword, loginWithGoogle } = Context();
  const { user } = state;

  useEffect(() => {
    if (user) {
      navigate("/");
      return;
    }
  }, [user, navigate]);

  return (
    <div className="memory__login-container">
      <div className="memory__login-container__card">
        <h1 className="heading">
          Welcome to, <br /> Memories
        </h1>
        <input
          type={"email"}
          placeholder="Email"
          value={email}
          onChange={(ev) => setEmail(ev.target.value)}
          className="input email"
        />
        <input
          type={"password"}
          placeholder="Password"
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
          className="input password"
        />
        <button
          type="button"
          onClick={() => loginWithEmailAndPassword(email, password)}
          className="btn__login"
        >
          Login
        </button>

        <div className="google__button" onClick={loginWithGoogle}>
          <p>Login with Google</p>
        </div>

        <p className="nav__link">
          Don't have an account?{" "}
          <strong
            className="navigate__link"
            onClick={() => navigate("/signup")}
          >
            Sign up
          </strong>
        </p>
      </div>
    </div>
  );
};

export default Login;
