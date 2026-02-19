import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    axios
      .post("http://localhost:3000/login", { email, password })
      .then((res) => {
        if (res.data.token) {
          localStorage.setItem("authToken", res.data.token);
        }
        alert(res.data.message);
        // console.log(res.data.token);
        navigate("/profile");
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  };

  return (
    <div className="wrapper">
      <div className="main_header">
        <h1>Login</h1>
      </div>
      <div className="login_card">
        <div className="input_section">
          <label className="email_label">Email: </label>
          <input
            type="email"
            className="email_input"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input_section">
          <label className="password_label">Password: </label>
          <input
            type="password"
            className="password_input"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="custom_btn">
          <button className="login_btn" onClick={() => handleLogin()}>
            Login
          </button>
        </div>
        <div className="more_section">
          <label className="signup_label">
            Don't have an account?
            <span className="signup_link" onClick={() => navigate("/signup")}>
              Sign Up
            </span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default Login;
