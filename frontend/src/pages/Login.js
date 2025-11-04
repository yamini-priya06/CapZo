import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import axios from "axios";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user"); // default role
  const [status, setStatus] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setStatus("Logging in...");

    try {
      const response = await axios.post("http://localhost:5001/api/auth/login", {
        email,
        password,
        role, // 👈 include role in request
      });

      const { token, user } = response.data;

      // ✅ Save user data
      localStorage.setItem("token", token);
      localStorage.setItem("role", user.role);
      localStorage.setItem("userInfo", JSON.stringify(user));

      setStatus("✅ Login successful!");

      // ✅ Navigate based on role
      setTimeout(() => {
        if (user.role === "admin") {
          navigate("/admin-dashboard");
        } else {
          navigate("/dashboard");
        }
      }, 1000);
    } catch (error) {
      console.error("Login error:", error);
      if (error.response?.data?.message) {
        setStatus("❌ " + error.response.data.message);
      } else {
        setStatus("❌ Invalid credentials. Please try again.");
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Welcome Back</h2>
        <p className="sub-text">Sign in to continue booking your dream venues ✨</p>

        <form onSubmit={handleLogin}>
          <div className="input-group">
            <i className="fa-solid fa-envelope"></i>
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <i className="fa-solid fa-lock"></i>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <i className="fa-solid fa-user-shield"></i>
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button type="submit">Login</button>
        </form>

        {status && <p className="login-status">{status}</p>}

        <div className="extra-links">
          <a href="/register">Don’t have an account? Register</a>
        </div>
      </div>
    </div>
  );
}

export default Login;