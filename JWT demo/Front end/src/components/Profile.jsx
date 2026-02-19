import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Profile.css";

const Profile = () => {
  const [user, setUser] = useState({});
  const authToken = localStorage.getItem("authToken");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/");
  };

  useEffect(() => {
    axios
      .get("http://localhost:3000/profile", {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((res) => {
        console.log("User Profile", res.data);
        setUser(res.data);
      })
      .catch((error) => console.log(error));
  }, [authToken]);

  return (
    <div className="profile_wrapper">
      <h2>User Profile...</h2>
      <div className="user_Info">
        <h3>Welcome, {user.email} !</h3>
      </div>
      <button className="logout_btn" onClick={() => handleLogout()}>
        Log Out
      </button>
    </div>
  );
};

export default Profile;
