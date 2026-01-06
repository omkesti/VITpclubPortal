import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const ClubDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [club, setClub] = useState(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5000/clubs/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setClub(data.club);
        setEvents(data.events);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p style={{ padding: "2rem" }}>Loading...</p>;

  const applyToClub = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login first");
        return;
      }

      const res = await fetch("http://localhost:5000/applications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, 
        },
        body: JSON.stringify({ club_id: club.id }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || data.message);
        return;
      }

      alert("Application submitted!");
    } catch (err) {
      alert("Something went wrong");
    }
  };

  return (
     <div
    style={{
      marginTop:"64px",
      minHeight: "100vh",
      background: "linear-gradient(135deg, #7f7cff, #5fd0d8)",
      padding: "3rem 1rem",
      display: "flex",
      justifyContent: "center",
    }}
  >
    <div
      style={{
        width: "100%",
        maxWidth: "800px",
        background: "rgba(255, 255, 255, 0.95)",
        borderRadius: "16px",
        padding: "2.5rem",
        boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
      }}
    >
      {/* Back Button */}
      <button
        onClick={() => navigate("/clubs")}
        style={{
          background: "transparent",
          border: "none",
          color: "#5a57ff",
          fontSize: "1rem",
          fontWeight: "600",
          cursor: "pointer",
          marginBottom: "1.5rem",
        }}
      >
        ← Back to Clubs
      </button>

      {/* Club Name */}
      <h1
        style={{
          fontSize: "2.2rem",
          color: "#333",
          marginBottom: "0.5rem",
        }}
      >
        {club.name}
      </h1>

      <p
        style={{
          color: "#555",
          lineHeight: "1.6",
          marginBottom: "2rem",
        }}
      >
        {club.description}
      </p>

      {/* President Section */}
      <h3 style={{ color: "#444", marginBottom: "0.3rem" }}>
        President
      </h3>
      <p style={{ color: "#666", marginBottom: "2rem" }}>
        {club.president_name} ({club.president_year})
      </p>

      {/* Events */}
      <h3 style={{ color: "#444", marginBottom: "1rem" }}>
        Events
      </h3>

      {events.length === 0 && (
        <p style={{ color: "#777" }}>No events yet</p>
      )}

      {events.map((event) => (
        <div
          key={event.id}
          style={{
            padding: "1rem 1.2rem",
            borderRadius: "12px",
            background: "#f4f6ff",
            marginBottom: "1rem",
          }}
        >
          <strong style={{ color: "#333", fontSize: "1.05rem" }}>
            {event.title}
          </strong>
          <p style={{ color: "#666", marginTop: "0.3rem" }}>
            {event.date} — {event.venue}
          </p>
        </div>
      ))}

      {/* Apply Button */}
      <button
        onClick={applyToClub}
        style={{
          marginTop: "2rem",
          width: "100%",
          padding: "0.9rem",
          borderRadius: "10px",
          border: "none",
          background: "linear-gradient(135deg, #5a57ff, #43c3dd)",
          color: "#fff",
          fontSize: "1rem",
          fontWeight: "600",
          cursor: "pointer",
          transition: "transform 0.2s ease",
        }}
        onMouseEnter={(e) =>
          (e.target.style.transform = "scale(1.02)")
        }
        onMouseLeave={(e) =>
          (e.target.style.transform = "scale(1)")
        }
      >
        Apply to Club
      </button>
    </div>
  </div>
);
};

export default ClubDetails;
