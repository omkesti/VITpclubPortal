import { useNavigate, Link } from "react-router-dom";
import logo from "../assets/VitConnect_Logo.png";
import { useEffect, useState } from "react";
// import noti from "../assets/notification_icon.png";

const Navbar = () => {
  const navigate = useNavigate(); // ✅ TOP LEVEL
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("token"));
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login"); // ✅ SAFE
  };

  return (
    <div className="navbar">
      <div className="logo-head">
        <div className="imgdiv">
          <img id="web-logo" src={logo} alt="logo" />
        </div>
        <div className="web-name">
          <Link to="/">
            1<span id="VIT-head">VIT</span>
            <span id="connect-head">Connect</span>
          </Link>
        </div>
      </div>

      <div className="main-links">
        <Link className="nav-links" to="/">
          Home
        </Link>
        <Link className="nav-links" to="/clubs">
          Clubs
        </Link>
        <Link className="nav-links" to="/events">
          Events
        </Link>
        {/* <img id="noti-icon" src={noti} alt="notification" /> */}
        <Link to="/signup">
          <button className="nav-btns">Sign In</button>
        </Link>
        {/* <Link to="/login">
          {token ? (
            <button onClick={logout}>Logout</button>
          ) : (
            <a href="/login">Login</a>
          )}
        </Link> */}

        {isLoggedIn ? (
          <button className="nav-btns" onClick={logout}>
            Logout
          </button>
        ) : (
          <button className="nav-btns" onClick={() => navigate("/login")}>
            Login
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
