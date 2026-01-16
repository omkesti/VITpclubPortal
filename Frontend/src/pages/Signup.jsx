import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";

const Signup = () => {
  const [form, setForm] = useState({
    prn: "",
    name: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const submit = async (e) => {
    e?.preventDefault();

    // Reset messages
    setError("");
    setSuccess("");

    // Validation
    if (!form.prn.trim()) {
      setError("PRN is required");
      return;
    }
    if (!form.name.trim()) {
      setError("Name is required");
      return;
    }
    if (!form.email.trim()) {
      setError("Email is required");
      return;
    }
    if (!validateEmail(form.email)) {
      setError("Please enter a valid email address");
      return;
    }
    if (!form.password) {
      setError("Password is required");
      return;
    }
    if (!validatePassword(form.password)) {
      setError("Password must be at least 6 characters long");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong");
        setLoading(false);
      } else {
        setSuccess(data.message || "Account created successfully!");
        setLoading(false);
        // Redirect to login after 2 seconds
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      submit();
    }
  };

  const updateForm = (field, value) => {
    setForm({ ...form, [field]: value });
    setError("");
  };

  return (
    <div
      className="content"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "linear-gradient(135deg, #0F2854 0%, #1C4D8D 25%, #4988C4 50%, #BDE8F5 100%)",
        fontFamily: "system-ui, sans-serif",
        padding: "2rem",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "500px",
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(10px)",
          padding: "3rem",
          borderRadius: "24px",
          boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
          border: "1px solid rgba(255, 255, 255, 0.3)",
        }}
      >
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div
            style={{
              width: "80px",
              height: "80px",
              margin: "0 auto 1.5rem",
              backgroundColor: "#00297f",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 8px 24px rgba(0, 41, 127, 0.3)",
            }}
          >
            <span style={{ fontSize: "2.5rem" }}>✨</span>
          </div>
          <h2
            style={{
              margin: 0,
              marginBottom: "0.5rem",
              fontSize: "2.2rem",
              fontWeight: "700",
              color: "#00297f",
              letterSpacing: "-0.5px",
            }}
          >
            Create Account
          </h2>
          <p
            style={{
              margin: 0,
              color: "#666",
              fontSize: "1rem",
            }}
          >
            Join VIT Connect and explore clubs
          </p>
        </div>

        {/* Success Message */}
        {success && (
          <div
            style={{
              padding: "0.75rem 1rem",
              backgroundColor: "rgba(34, 197, 94, 0.1)",
              border: "1px solid rgba(34, 197, 94, 0.3)",
              borderRadius: "12px",
              color: "#16a34a",
              fontSize: "0.9rem",
              marginBottom: "1.5rem",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <span>✅</span>
            <span>{success}</span>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div
            style={{
              padding: "0.75rem 1rem",
              backgroundColor: "rgba(239, 68, 68, 0.1)",
              border: "1px solid rgba(239, 68, 68, 0.3)",
              borderRadius: "12px",
              color: "#dc2626",
              fontSize: "0.9rem",
              marginBottom: "1.5rem",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <span>⚠️</span>
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={submit}>
          {/* PRN Input */}
          <div style={{ marginBottom: "1.25rem" }}>
            <label
              style={{
                display: "block",
                fontSize: "0.9rem",
                fontWeight: "600",
                color: "#333",
                marginBottom: "0.5rem",
              }}
            >
              PRN
            </label>
            <Input
              type="text"
              placeholder="Enter your PRN"
              value={form.prn}
              onChange={(e) => updateForm("prn", e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={loading}
              style={{
                width: "93%",
                padding: "0.875rem 1rem",
                fontSize: "1rem",
                border: "2px solid rgba(0, 0, 0, 0.1)",
                borderRadius: "12px",
                transition: "all 0.3s ease",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#00297f";
                e.target.style.boxShadow = "0 0 0 3px rgba(0, 41, 127, 0.1)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "rgba(0, 0, 0, 0.1)";
                e.target.style.boxShadow = "none";
              }}
            />
          </div>

          {/* Name Input */}
          <div style={{ marginBottom: "1.25rem" }}>
            <label
              style={{
                display: "block",
                fontSize: "0.9rem",
                fontWeight: "600",
                color: "#333",
                marginBottom: "0.5rem",
              }}
            >
              Full Name
            </label>
            <Input
              type="text"
              placeholder="Enter your full name"
              value={form.name}
              onChange={(e) => updateForm("name", e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={loading}
              style={{
                width: "93%",
                padding: "0.875rem 1rem",
                fontSize: "1rem",
                border: "2px solid rgba(0, 0, 0, 0.1)",
                borderRadius: "12px",
                transition: "all 0.3s ease",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#00297f";
                e.target.style.boxShadow = "0 0 0 3px rgba(0, 41, 127, 0.1)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "rgba(0, 0, 0, 0.1)";
                e.target.style.boxShadow = "none";
              }}
            />
          </div>

          {/* Email Input */}
          <div style={{ marginBottom: "1.25rem" }}>
            <label
              style={{
                display: "block",
                fontSize: "0.9rem",
                fontWeight: "600",
                color: "#333",
                marginBottom: "0.5rem",
              }}
            >
              Email
            </label>
            <Input
              type="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={(e) => updateForm("email", e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={loading}
              style={{
                width: "93%",
                padding: "0.875rem 1rem",
                fontSize: "1rem",
                border: "2px solid rgba(0, 0, 0, 0.1)",
                borderRadius: "12px",
                transition: "all 0.3s ease",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#00297f";
                e.target.style.boxShadow = "0 0 0 3px rgba(0, 41, 127, 0.1)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "rgba(0, 0, 0, 0.1)";
                e.target.style.boxShadow = "none";
              }}
            />
          </div>

          {/* Password Input */}
          <div style={{ marginBottom: "1.5rem" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "0.5rem",
              }}
            >
              <label
                style={{
                  fontSize: "0.9rem",
                  fontWeight: "600",
                  color: "#333",
                }}
              >
                Password
              </label>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  background: "none",
                  border: "none",
                  color: "#4988C4",
                  fontSize: "0.85rem",
                  cursor: "pointer",
                  fontWeight: "500",
                  padding: "0.25rem 0.5rem",
                  borderRadius: "6px",
                  transition: "background-color 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "rgba(73, 136, 196, 0.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                }}
              >
                {showPassword ? "🙈 Hide" : "👁️ Show"}
              </button>
            </div>
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password (min. 6 characters)"
              value={form.password}
              onChange={(e) => updateForm("password", e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={loading}
              style={{
                width: "93%",
                padding: "0.875rem 1rem",
                fontSize: "1rem",
                border: "2px solid rgba(0, 0, 0, 0.1)",
                borderRadius: "12px",
                transition: "all 0.3s ease",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#00297f";
                e.target.style.boxShadow = "0 0 0 3px rgba(0, 41, 127, 0.1)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "rgba(0, 0, 0, 0.1)";
                e.target.style.boxShadow = "none";
              }}
            />
            <p
              style={{
                margin: "0.5rem 0 0 0",
                fontSize: "0.8rem",
                color: "#666",
              }}
            >
              Password must be at least 6 characters long
            </p>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            onClick={submit}
            disabled={loading}
            style={{
              width: "100%",
              padding: "1rem",
              backgroundColor: "#00297f",
              color: "#fde002",
              border: "none",
              borderRadius: "12px",
              fontSize: "1.05rem",
              fontWeight: "600",
              cursor: loading ? "not-allowed" : "pointer",
              transition: "all 0.3s ease",
              opacity: loading ? 0.7 : 1,
              marginBottom: "1.5rem",
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                e.currentTarget.style.backgroundColor = "#fde002";
                e.currentTarget.style.color = "#00297f";
                e.currentTarget.style.transform = "scale(1.02)";
              }
            }}
            onMouseLeave={(e) => {
              if (!loading) {
                e.currentTarget.style.backgroundColor = "#00297f";
                e.currentTarget.style.color = "#fde002";
                e.currentTarget.style.transform = "scale(1)";
              }
            }}
          >
            {loading ? (
              <span
                style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
              >
                <span
                  style={{
                    display: "inline-block",
                    width: "16px",
                    height: "16px",
                    border: "2px solid #fde002",
                    borderTopColor: "transparent",
                    borderRadius: "50%",
                    animation: "spin 0.6s linear infinite",
                  }}
                />
                Creating account...
              </span>
            ) : (
              "Create Account"
            )}
          </Button>
        </form>

        {/* Login Link */}
        <div
          style={{
            textAlign: "center",
            paddingTop: "1.5rem",
            borderTop: "1px solid rgba(0, 0, 0, 0.1)",
          }}
        >
          <p
            style={{
              margin: 0,
              color: "#666",
              fontSize: "0.95rem",
            }}
          >
            Already have an account?{" "}
            <Link
              to="/login"
              style={{
                color: "#00297f",
                fontWeight: "600",
                textDecoration: "none",
                transition: "color 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#4988C4";
                e.currentTarget.style.textDecoration = "underline";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "#00297f";
                e.currentTarget.style.textDecoration = "none";
              }}
            >
              Login here
            </Link>
          </p>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default Signup;
