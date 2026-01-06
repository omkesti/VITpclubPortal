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
    <div className="content"
     style={{
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg,  #7f7cff, #5fd0d8)",
    fontFamily: "system-ui, sans-serif",
     }}
    >
      <div 
      style={{
      width: "100%",
      maxWidth: "450px",
      backgroundColor: "#ffffff",
      padding: "2.5rem",
      borderRadius: "18px",
      boxShadow: "0 25px 50px rgba(0,0,0,0.25)",
      display: "flex",
      flexDirection: "column",
      }}
      >
      {/* <LoginForm /> */}
      <h2
        style={{textAlign: "center",
        fontSize: "1.9rem",
        fontWeight: "600",
        color: "#0f172a",
        marginBottom: "0.4rem",
      }}
      >Sign Up</h2>
      {/* <Dialog>
        <DialogTrigger>Meaw</DialogTrigger>
        <DialogContent>hi mom</DialogContent>
      </Dialog> */}

       <p style={{
          textAlign: "center",
          fontSize: "0.95rem",
          color: "#64748b",
          marginBottom: "1.8rem",
       }}
       >Sign up to get started</p>

      <input
        style={{width: "92%",
        padding: "0.75rem 1rem",
        marginBottom: "1rem",
        borderRadius: "8px",
        border: "1px solid #cbd5f5",
        fontSize: "0.95rem",
        outline: "none",
        }}
        placeholder="PRN"
        onChange={(e) => setForm({ ...form, prn: e.target.value })}
      />
      <input
         style={{width: "92%",
        padding: "0.75rem 1rem",
        marginBottom: "1rem",
        borderRadius: "8px",
        border: "1px solid #cbd5f5",
        fontSize: "0.95rem",
        outline: "none",
        }}
        placeholder="Name"
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <input
         style={{width: "92%",
        padding: "0.75rem 1rem",
        marginBottom: "1rem",
        borderRadius: "8px",
        border: "1px solid #cbd5f5",
        fontSize: "0.95rem",
        outline: "none",
        }}
        placeholder="Email"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <input
         style={{width: "92%",
        padding: "0.75rem 1rem",
        marginBottom: "1rem",
        borderRadius: "8px",
        border: "1px solid #cbd5f5",
        fontSize: "0.95rem",
        outline: "none",
        }}
        type="password"
        placeholder="Password"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <button 
      style={{
              width: "100%",
        padding: "0.8rem",
        marginTop: "0.5rem",
        backgroundColor: "#2563eb",
        color: "#ffffff",
        border: "none",
        borderRadius: "8px",
        fontSize: "1rem",
        fontWeight: "500",
        cursor: "pointer",
      }}
      onClick={submit}>Register</button>
    </div>
    </div>
  );
};

export default Signup;
