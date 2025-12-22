import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const ClubDetails = () => {
  const studentId = 1; // prototype user
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
      const res = await fetch("http://localhost:5000/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ club_id: club.id }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      alert("Application submitted!");
    } catch (err) {
      alert("Something went wrong");
    }
  };

  return (
    <div className="content" style={{ padding: "2rem" }}>
      {/* <Link to={`/clubs`}>Go Back</Link> */}
      <button
        onClick={() => navigate("/clubs")}
        style={{
          marginBottom: "1rem",
          padding: "0.5rem 1rem",
          cursor: "pointer",
        }}
      >
        ← Back to Clubs
      </button>
      <h1>{club.name}</h1>

      <p>{club.description}</p>

      <h3>President</h3>
      <p>
        {club.president_name} ({club.president_year})
      </p>

      <h3>Events</h3>
      {events.length === 0 && <p>No events yet</p>}

      {events.map((event) => (
        <div key={event.id} style={{ marginBottom: "1rem" }}>
          <strong>{event.title}</strong>
          <p>
            {event.date} — {event.venue}
          </p>
        </div>
      ))}
      <button
        onClick={applyToClub}
        style={{
          margin: "1rem 0",
          padding: "0.6rem 1.2rem",
          cursor: "pointer",
        }}
      >
        Apply to Club
      </button>
    </div>
  );
};

export default ClubDetails;
