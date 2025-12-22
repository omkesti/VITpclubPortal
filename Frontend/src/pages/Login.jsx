import { useState } from "react";

const Login = () => {
  const [prn, setPrn] = useState("");
  const [password, setPassword] = useState("");

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
      localStorage.setItem("token", data.token);
      alert("Login successful");
    }
  };

  return (
    <div className="content">
      <h2>Login</h2>
      <input placeholder="PRN" onChange={(e) => setPrn(e.target.value)} />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={submit}>Login</button>
    </div>
  );
};

export default Login;
