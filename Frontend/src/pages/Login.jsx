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
    <div className="content">
      <h2>Login</h2>

      <input
        placeholder="PRN"
        value={prn}
        onChange={(e) => setPrn(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={submit}>Login</button>

      <Link to="/signup">Create One</Link>
    </div>
  );
};

export default Login;
