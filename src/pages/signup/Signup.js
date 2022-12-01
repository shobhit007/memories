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
  }, [user, navigate]);

  return (
    <div className="memory__signup-container">
      <div className="memory__signup-container__card">
        <h1 className="heading">
          Welcome to, <br /> Memories
        </h1>
        <input
          type={"email"}
          placeholder="Email"
          value={email}
          className="input"
          onChange={(ev) => setEmail(ev.target.value)}
        />
        <input
          type={"password"}
          placeholder="Password"
          value={password}
          className="input"
          onChange={(ev) => setPassword(ev.target.value)}
        />
        <button
          type="button"
          className="btn__signup"
          onClick={() => createUser(email, password)}
        >
          Sign up
        </button>
        <p className="nav__link">
          Already have an account?{" "}
          <strong className="navigate__link" onClick={() => navigate("/login")}>
            Login
          </strong>
        </p>
      </div>
    </div>
  );
};

export default Signup;
