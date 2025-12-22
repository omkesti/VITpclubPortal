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
    <div className="content" style={{ padding: "2rem" }}>
      <h1>Events</h1>

      {events.length === 0 && <p>No upcoming events</p>}

      {events.map((event) => (
        <div
          key={event.id}
          style={{
            border: "1px solid #ccc",
            borderRadius: "6px",
            padding: "1rem",
            marginBottom: "1rem",
          }}
        >
          <h3>{event.title}</h3>
          <p>
            <strong>Date:</strong> {event.event_date}
          </p>
          <p>
            <strong>Venue:</strong> {event.venue}
          </p>
          <p>
            <strong>Organized by:</strong>{" "}
            <Link to={`/clubs/${event.club_id}`}>{event.club_name}</Link>
          </p>
        </div>
      ))}
    </div>
  );
};

export default Events;
