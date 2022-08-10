import React, { useState, useEffect } from "react";
import "./signup.css";
import { useNavigate } from "react-router-dom";
import { Context } from "../../context/Context";

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { createUser, state } = Context();
  const { user } = state;

  useEffect(() => {
    if (user) {
      navigate("/");
      return;
    }
  }, []);

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
        <button type="button" onClick={() => createUser(email, password)}>
          Sign up
        </button>
        <div className="signup_link" onClick={() => navigate("/login")}>
          <p>
            Already have an account? <span>Log in</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
