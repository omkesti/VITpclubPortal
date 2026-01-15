import loc from "../assets/location.png";
import mail from "../assets/mail.png";
import phoneCall from "../assets/phone-call.png";

const Contact = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #eaf0ff, #f4f6f9)",
        padding: "5rem 5%",
      }}
    >
      {/* Header */}
      <div
        style={{
          textAlign: "center",
          maxWidth: "45rem",
          margin: "0 auto 4rem",
        }}
      >
        <h1
          style={{
            fontSize: "2.6rem",
            color: "#1f3c88",
            marginBottom: "0.6rem",
          }}
        >
          Contact Us
        </h1>
        <p
          style={{
            fontSize: "1rem",
            color: "#555",
            lineHeight: "1.7",
          }}
        >
          We’re here to help you. Reach out for any questions, suggestions,
          or support.
        </p>
      </div>

      {/* Main Wrapper */}
      <div
        style={{
          display: "flex",
          gap: "3rem",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        {/* Send Message */}
        <div
          style={{
            background: "#fff",
            padding: "2.2rem",
            width: "100%",
            maxWidth: "25rem",
            borderRadius: "1rem",
            boxShadow: "0 0.8rem 2rem rgba(31,60,136,0.15)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h3
            style={{
              marginBottom: "1.6rem",
              color: "#1f3c88",
              fontSize: "1.3rem",
              textAlign: "center",
            }}
          >
            Send us a message
          </h3>

          <label style={labelStyle}>Name</label>
          <input placeholder="Your Name" style={inputStyle} />

          <label style={labelStyle}>Email</label>
          <input
            type="email"
            placeholder="your.email@vit.edu"
            style={inputStyle}
          />

          <label style={labelStyle}>Message</label>
          <textarea
            placeholder="Tell us how we can help you..."
            style={{
              ...inputStyle,
              height: "8rem",
              resize: "none",
            }}
          />

          <button
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.06)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.transform = "scale(1)")
            }
            style={{
              width: "100%",
              padding: "0.9rem",
              background: "linear-gradient(90deg, #1f3c88, #3a6ff7)",
              color: "#fff",
              border: "none",
              borderRadius: "0.7rem",
              fontSize: "1rem",
              cursor: "pointer",
              marginTop: "0.6rem",
              transition: "transform 0.3s ease",
            }}
          >
            Send Message
          </button>
        </div>

        {/* Get in Touch */}
        <div
          style={{
            background: "#fff",
            padding: "2.2rem",
            width: "100%",
            maxWidth: "25rem",
            borderRadius: "1rem",
            boxShadow: "0 0.8rem 2rem rgba(0,0,0,0.12)",
          }}
        >
          <h3
            style={{
              color: "#1f3c88",
              marginBottom: "2rem",
              fontSize: "1.3rem",
            }}
          >
            Get in Touch
          </h3>

          {/* Address (looks like button, acts like link) */}
          <a
            href="https://www.google.com/maps?q=Vishwakarma+Institute+of+Technology+Pune"
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#e4ecff";
              e.currentTarget.style.opacity = "0.9";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#f0f4ff";
              e.currentTarget.style.opacity = "1";
            }}
            style={{
              display: "flex",
              gap: "1rem",
              padding: "1rem",
              marginBottom: "1.6rem",
              borderRadius: "0.8rem",
              background: "#f0f4ff",
              textDecoration: "none",
              color: "#1f3c88",
              transition: "background 0.25s ease, opacity 0.25s ease",
            }}
          >
            <img src={loc} alt="Address" style={{ width: "1.6rem" }} />
            <div>
              <p style={{ fontWeight: "600", marginBottom: "0.3rem" }}>
                Address
              </p>
              <p style={{ lineHeight: "1.5", color: "#555" }}>
                VIT Pune, Bibwewadi, Pune – 411037
              </p>
            </div>
          </a>

          {infoRow(mail, "Email", "vit.connect@vit.edu")}
          {infoRow(phoneCall, "Phone", "+91 20 2437 XXXX")}

          <div
            style={{
              marginTop: "2rem",
              paddingTop: "1.2rem",
              borderTop: "0.06rem solid #eee",
            }}
          >
            <p style={{ fontWeight: "600", marginBottom: "0.4rem" }}>
              Office Hours
            </p>
            <p>Mon – Fri: 9:00 AM – 5:00 PM</p>
            <p>Sat: 9:00 AM – 1:00 PM</p>
            <p>Sunday: Closed</p>
          </div>
        </div>
      </div>
    </div>
  );
};

/* Reusable styles */
const labelStyle = {
  fontWeight: "600",
  fontSize: "0.9rem",
  alignSelf: "flex-start",
};

const inputStyle = {
  width: "100%",
  padding: "0.75rem",
  margin: "0.5rem 0 1.2rem",
  borderRadius: "0.6rem",
  border: "0.06rem solid #ccc",
  fontSize: "0.9rem",
};

const infoRow = (icon, title, text) => (
  <div
    style={{
      display: "flex",
      gap: "1rem",
      marginBottom: "1.4rem",
      alignItems: "flex-start",
    }}
  >
    <img src={icon} alt={title} style={{ width: "1.6rem" }} />
    <div>
      <p style={{ fontWeight: "600", marginBottom: "0.3rem" }}>{title}</p>
      <p style={{ color: "#555", lineHeight: "1.5" }}>{text}</p>
    </div>
  </div>
);

export default Contact;
