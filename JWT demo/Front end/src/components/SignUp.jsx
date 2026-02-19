import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../css/SignUp.css";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignUp = () => {
    axios
      .post("http://localhost:3000/signup", { name, email, password })
      .then((res) => {
        alert(res.data.message);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="wrapper">
      <div className="main_header">
        <h1>Sign Up</h1>
      </div>
      <div className="signup_card">
        <div className="input_section">
          <label className="name_label">Name: </label>
          <input
            type="text"
            className="name_input"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
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
          <button className="signup_btn" onClick={() => handleSignUp()}>
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
