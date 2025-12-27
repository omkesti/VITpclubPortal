import { useNavigate, Link } from "react-router-dom";
import logo from "../assets/VitConnect_Logo.png";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  return (
    <div className="navbar">
      <div
        className="logo-head"
        onClick={() => {
          navigate("/");
        }}
      >
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

        {user ? (
          <button
            className="nav-btns"
            onClick={() => {
              logout();
              navigate("/login");
            }}
          >
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
