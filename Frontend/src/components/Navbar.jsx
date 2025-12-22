import { Link } from "react-router-dom";
import logo from "../assets/VitConnect_Logo.png";
// import noti from "../assets/notification_icon.png";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="logo-head">
        <div className="imgdiv">
          <img id="web-logo" src={logo} alt="logo" />
        </div>
        <div className="web-name">
          <Link to="/">
            <span id="VIT-head">VIT</span>
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
          <button id="signin-btn">Sign In</button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
