import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [prn, setPrn] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const submit = async () => {
    const res = await fetch("http://localhost:5000/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prn, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.error);
    } else {
      // 🔥 THIS IS THE KEY CHANGE
      login(data.user, data.token);
      alert("Login successful");
      navigate("/");
    }
  };

  return (
    <div className="content"
     style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #7f7cff, #5fd0d8)",
        fontFamily: "system-ui, sans-serif"
      }}>
        <div style={{
      width: "100%",
      maxWidth: "400px",
      backgroundColor: "#ffffff",
      padding: "2rem",
      borderRadius: "14px",
      boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
    }}>
      <h2  style={{
        textAlign: "center",
        marginBottom: "0.5rem",
        fontSize: "1.8rem",
        color: "#0f172a",
      }}>Login</h2>

       <p
      style={{
        textAlign: "center",
        marginBottom: "1.5rem",
        color: "#64748b",
        fontSize: "0.95rem",
      }}
    >
      Login to your account
    </p>

      <input
        placeholder="PRN"
        value={prn}
        onChange={(e) => setPrn(e.target.value)}
        style={{
        width: "90%",
        padding: "0.75rem 1rem",
        marginBottom: "1rem",
        borderRadius: "8px",
        border: "1px solid #cbd5f5",
        fontSize: "0.95rem",
        outline: "none",
        transition: "border-color 0.2s ease, box-shadow 0.2s ease",
        }}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{
        width: "90%",
        padding: "0.75rem 1rem",
        marginBottom: "1.2rem",
        borderRadius: "8px",
        border: "1px solid #cbd5f5",
        fontSize: "0.95rem",
        outline: "none",
        transition: "border-color 0.2s ease, box-shadow 0.2s ease",
        }}
      />

      <button onClick={submit}
       style={{
        width: "100%",
        padding: "0.75rem",
        backgroundColor: "#2563eb",
        color: "#ffffff",
        border: "none",
        borderRadius: "8px",
        fontSize: "1rem",
        cursor: "pointer",
        marginBottom: "1rem",
      }}
      >Login</button>

      <Link to="/signup"  style={{
        textAlign: "center",
        fontSize: "0.9rem",
        color: "#64748b",
      }}>Create One</Link>
    </div>
    </div>
  );
};

export default Login;
