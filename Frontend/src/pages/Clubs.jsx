import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import img_path from "../assets/";

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

  return (<>
     <h1
      style={{
        position: "relative",
        top: "64px",          // navbar height
        left: 0,
        width: "100%",
        padding: "1rem 2rem",
        margin: 0,
        backgroundColor:"#00297f",
        color: "#fde002",
        fontSize: "2rem",
        fontWeight: "600",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
      }}
    >
      Clubs
    </h1>
   <div
        style={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #0F2854, #1C4D8D, #4988C4,   #BDE8F5)",
          padding: "2rem",
        }}
      >
    <div className="content" 
    style={{ 

    color:"#7ec8e3",
    marginTop:"120px",
    padding: "2rem",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
    gap: "2rem",
    textAlign: "center", 
       }}>

      {clubs.map((club) => (
        <div
          key={club.id}
          style={{
             opacity:"0.95",
             width: "100%",
             boxSizing: "border-box",         
             minHeight: "320px", 
             backgroundColor: "#272e80f5",
             boxShadow: "5px 5px 5px rgba(0,0,0,0.15)",
             border: "1px solid #ccc",
             padding: "1rem",
             borderRadius: "8px",
             transition: " 0.2s ease, box-shadow 0.2s ease"
          }
        }
        >
          <img style={{objectFit: "cover", borderRadius: "50%",
            height:" 100px",
            marginBottom:"3rem",
          }} src={`../../clubImages/${club.milestones}`}></img>
          <h3>{club.name}</h3>
          <p>
            <b>Code:</b> {club.short_code}
          </p>
          <p>
            <b>Category:</b> {club.category}
          </p>
          <Link to={`/clubs/${club.id}`}
           style={{
            display: "inline-block",
            padding: "0.6rem 1.2rem",
            marginTop: "1rem",
            backgroundColor: "#2563eb",
            color: "#ffffff",
            borderRadius: "8px",
            textDecoration: "none",
            fontWeight: "500",
            fontSize: "0.95rem",
            cursor: "pointer",
             transition: "color 0.4s ease",
          }}
            onMouseDown={(e) => {
            e.target.style.color = "#fde047"; 
            }}
          >View Details</Link>
        </div>
      ))}
    </div>
  </div>
   </>
  );
};

export default Clubs;
