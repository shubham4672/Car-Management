import "../styles/Login.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", data.token);
      navigate("/home");
    } catch (error) {
      console.error("Login failed:", error);
      setErrorMessage("Invalid email or password");
    }
  };

  return (
    <div className='login-container'>
      <h2 className='text-3xl font-bold mt-9'>Login</h2>
      {errorMessage && <p className='error-message'>{errorMessage}</p>}
      <form className='max-w-md' onSubmit={handleSubmit}>
        <input
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Email'
          required
        />
        <input
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Password'
          required
        />
        <button
          type='submit'
          className='mt-4 bg-blue-600 hover:bg-blue-500 w-1/3 text-xl font-medium'
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
