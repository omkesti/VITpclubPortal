import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Clubs = () => {
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/clubs")
      .then((res) => res.json())
      .then((data) => {
        setClubs(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <p style={{ padding: "2rem", marginTop: "10vh" }}>Loading clubs...</p>
    );

  return (
    <div className="content" style={{ padding: "2rem" }}>
      <h1>Clubs</h1>

      {clubs.map((club) => (
        <div
          key={club.id}
          style={{
            border: "1px solid #ccc",
            padding: "1rem",
            marginBottom: "1rem",
            borderRadius: "8px",
          }}
        >
          <h3>{club.name}</h3>
          <p>
            <b>Code:</b> {club.short_code}
          </p>
          <p>
            <b>Category:</b> {club.category}
          </p>
          <Link to={`/clubs/${club.id}`}>View Details</Link>
        </div>
      ))}
    </div>
  );
};

export default Clubs;
