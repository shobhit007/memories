import React, { useState, useEffect } from "react";
import "./login.css";
import { FcGoogle } from "react-icons/fc";
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
      <div className="memory__login-container_card">
        <h1>Welcome to, Memories</h1>
        <input
          type={"email"}
          placeholder="Email"
          value={email}
          onChange={(ev) => setEmail(ev.target.value)}
        />
        <input
          type={"password"}
          placeholder="Password"
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
        />
        <button
          type="button"
          onClick={() => loginWithEmailAndPassword(email, password)}
        >
          Login
        </button>

        <div className="google_button" onClick={loginWithGoogle}>
          <FcGoogle size={24} />
          <p>Login with Google</p>
        </div>
        <div className="signup_link" onClick={() => navigate("/signup")}>
          <p>
            Don't have an account? <span>Sign up</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
