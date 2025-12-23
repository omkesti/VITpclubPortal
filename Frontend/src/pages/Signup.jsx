import { useState } from "react";
// import { Button } from "../components/ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "../components/ui/dialog";
// import { LoginForm } from "../components/login";

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
      {/* <LoginForm /> */}
      <h2>Sign Up</h2>
      {/* <Dialog>
        <DialogTrigger>Meaw</DialogTrigger>
        <DialogContent>hi mom</DialogContent>
      </Dialog> */}
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
