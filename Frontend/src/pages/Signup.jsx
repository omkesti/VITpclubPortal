import { useState } from "react";

const Signup = () => {
  const [form, setForm] = useState({
    prn: "",
    name: "",
    email: "",
    password: "",
  });

  const submit = async () => {
    const res = await fetch("http://localhost:5000/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    alert(data.message || data.error);
  };

  return (
    <div className="content">
      <h2>Sign Up</h2>
      <input
        placeholder="PRN"
        onChange={(e) => setForm({ ...form, prn: e.target.value })}
      />
      <input
        placeholder="Name"
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <input
        placeholder="Email"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <button onClick={submit}>Register</button>
    </div>
  );
};

export default Signup;
