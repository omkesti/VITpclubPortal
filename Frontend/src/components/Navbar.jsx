import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/VitConnect_Logo.png";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const [hovered, setHovered] = useState(null);

  const navLinkStyle = {
    textDecoration: "none",
    color: "#ffffffff",
    fontSize: "0.95rem",
    fontWeight: "500",
    padding: "0.75rem 1.2rem",
    borderRadius: "0.6rem",
    backgroundColor: "transparent",
    border: "1.5px solid transparent",
    transition: "all 0.3s ease",
    display: "inline-block",
    position: "relative",
  };

  const navLinkHover = {
    backgroundColor: "#2563eb",
    color: "#ffffff",
    transform: "translateY(-2px)",
    boxShadow: "0 8px 20px rgba(37, 99, 235, 0.35)",
    border: "1.5px solid #2563eb",
  };

  const activeUnderline = {
    position: "absolute",
    bottom: "4px",
    left: "15%",
    width: "70%",
    height: "3px",
    backgroundColor: "#2563eb",
    borderRadius: "4px",
  };

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Clubs", path: "/clubs" },
    { name: "Events", path: "/events" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <div className="navbar">
      {/* LOGO SECTION */}
      <div className="logo-head" onClick={() => navigate("/")}>
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

      {/* NAV LINKS */}
      <div className="main-links">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.name}
              to={item.path}
              style={{
                ...navLinkStyle,
                ...(hovered === item.name ? navLinkHover : {}),
              }}
              onMouseEnter={() => setHovered(item.name)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* TOP UNDERLINE FOR ACTIVE PAGE */}
              {isActive && <span style={activeUnderline} />}
              {item.name}
            </Link>
          );
        })}

        {/* AUTH BUTTON (UNCHANGED) */}
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
