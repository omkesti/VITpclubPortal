import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/events")
      .then((res) => res.json())
      .then((data) => {
        setEvents(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <p style={{ padding: "2rem" }}>Loading events...</p>;

  return (
    <div className="content"  style={{
      marginTop:"64px",
      minHeight: "100vh",
      background: "linear-gradient(135deg, #7f7cff, #5fd0d8)",
      padding: "3rem 1rem",
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",   
      alignItems: "center",   
    }}>
      <h1>Events</h1>

      {events.length === 0 && <p>No upcoming events</p>}

      {events.map((event) => (
        <div
          key={event.id}
          style={{
          width: "100%",
          maxWidth: "800px",
          background: "rgba(255, 255, 255, 0.95)",
          borderRadius: "16px",
          padding: "2.5rem",
          boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
        }}
        >
          <h3 
           style={{
          fontSize: "2.2rem",
          color: "#333",
          marginBottom: "0.5rem",
          }}
          >{event.title}</h3>
          <p
          style={{
          color: "#555",
          lineHeight: "1.6",
          marginBottom: "2rem",
         }}>
            <strong>Date:</strong> {event.event_date}
          </p>
          <p 
          style={{
          color: "#555",
          lineHeight: "1.6",
          marginBottom: "2rem",
          }}>
            <strong>Venue:</strong> {event.venue}
          </p>
          <p 
          style={{
          color: "#555",
          lineHeight: "1.6",
          marginBottom: "2rem",
          }}>
            <strong>Organized by:</strong>{" "}
            <Link to={`/clubs/${event.club_id}`}>{event.club_name}</Link>
          </p>
        </div>
      ))}
    </div>
  );
};

export default Events;
