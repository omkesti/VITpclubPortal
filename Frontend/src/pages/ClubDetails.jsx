import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "../components/ui/button";

const ClubDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [club, setClub] = useState(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const [applying, setApplying] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:5000/clubs/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setClub(data.club);
        setEvents(data.events);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [id]);

  const applyToClub = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login first");
        navigate("/login");
        return;
      }

      setApplying(true);
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
        setApplying(false);
        return;
      }

      alert("Application submitted successfully!");
      setApplying(false);
    } catch (err) {
      alert("Something went wrong");
      setApplying(false);
    }
  };

  // Loading skeleton
  const LoadingSkeleton = () => (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #0F2854 0%, #1C4D8D 25%, #4988C4 50%, #BDE8F5 100%)",
        padding: "2rem",
        marginTop: "64px",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          borderRadius: "24px",
          padding: "3rem",
          animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        }}
      >
        <div
          style={{
            width: "200px",
            height: "200px",
            borderRadius: "50%",
            backgroundColor: "rgba(0, 0, 0, 0.1)",
            margin: "0 auto 2rem",
          }}
        />
        <div
          style={{
            width: "60%",
            height: "40px",
            backgroundColor: "rgba(0, 0, 0, 0.1)",
            borderRadius: "8px",
            margin: "0 auto 1rem",
          }}
        />
        <div
          style={{
            width: "80%",
            height: "20px",
            backgroundColor: "rgba(0, 0, 0, 0.1)",
            borderRadius: "8px",
            margin: "0 auto",
          }}
        />
      </div>
    </div>
  );

  if (loading) return <LoadingSkeleton />;

  if (!club) {
    return (
      <div
        className="content"
        style={{
          minHeight: "100vh",
          background:
            "linear-gradient(135deg, #0F2854 0%, #1C4D8D 25%, #4988C4 50%, #BDE8F5 100%)",
          padding: "2rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            textAlign: "center",
            color: "#fff",
            padding: "3rem",
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            borderRadius: "20px",
            backdropFilter: "blur(10px)",
          }}
        >
          <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>😕</div>
          <h2 style={{ fontSize: "1.8rem", marginBottom: "0.5rem" }}>
            Club not found
          </h2>
          <p style={{ marginBottom: "2rem", opacity: 0.9 }}>
            The club you're looking for doesn't exist or has been removed.
          </p>
          <Button
            onClick={() => navigate("/clubs")}
            style={{
              backgroundColor: "#fde002",
              color: "#00297f",
              fontWeight: "600",
              borderRadius: "1rem",
              padding: "0.6rem 1.2rem",
              cursor: "pointer",
            }}
          >
            ← Back to Clubs
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="content"
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #0F2854 0%, #1C4D8D 25%, #4988C4 50%, #BDE8F5 100%)",
        padding: "2rem",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {/* Back Button */}
        <Button
          onClick={() => navigate("/clubs")}
          variant="outline"
          style={{
            marginBottom: "2rem",
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            border: "2px solid rgba(253, 224, 2, 0.3)",
            color: "#fde002",
            fontWeight: "600",
            padding: "0.6rem 1.2rem",
            borderRadius: "1rem",
            cursor: "pointer",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "rgba(253, 224, 2, 0.2)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
          }}
        >
          ← Back to Clubs
        </Button>

        {/* Main Content Card */}
        <div
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(10px)",
            borderRadius: "24px",
            padding: "3rem",
            boxShadow: "0 20px 60px rgba(0, 0, 0, 0.2)",
            border: "1px solid rgba(255, 255, 255, 0.3)",
          }}
        >
          {/* Hero Section */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              marginBottom: "3rem",
              paddingBottom: "2rem",
              borderBottom: "2px solid rgba(0, 41, 127, 0.1)",
            }}
          >
            {/* Club Image */}
            <div
              style={{
                width: "200px",
                height: "200px",
                borderRadius: "50%",
                marginBottom: "1.5rem",
                overflow: "hidden",
                border: "5px solid #fde002",
                boxShadow: "0 8px 24px rgba(253, 224, 2, 0.4)",
                backgroundColor: "#f0f0f0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {imageError ? (
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    backgroundColor: "#e0e0e0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "4rem",
                  }}
                >
                  🎯
                </div>
              ) : (
                <img
                  src={`/clubImages/${club.milestones}`}
                  alt={club.name}
                  onError={() => setImageError(true)}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              )}
            </div>

            {/* Club Name */}
            <h1
              style={{
                fontSize: "2.8rem",
                fontWeight: "700",
                color: "#00297f",
                marginBottom: "0.5rem",
                letterSpacing: "-0.5px",
              }}
            >
              {club.name}
            </h1>

            {/* Club Code and Category */}
            <div
              style={{
                display: "flex",
                gap: "1rem",
                flexWrap: "wrap",
                justifyContent: "center",
                marginBottom: "1.5rem",
              }}
            >
              <div
                style={{
                  display: "inline-block",
                  padding: "0.5rem 1rem",
                  backgroundColor: "#00297f",
                  color: "#fde002",
                  borderRadius: "20px",
                  fontSize: "0.9rem",
                  fontWeight: "600",
                  letterSpacing: "0.5px",
                }}
              >
                {club.short_code}
              </div>
              <div
                style={{
                  display: "inline-block",
                  padding: "0.5rem 1rem",
                  backgroundColor: "rgba(73, 136, 196, 0.15)",
                  color: "#4988C4",
                  borderRadius: "20px",
                  fontSize: "0.9rem",
                  fontWeight: "600",
                  border: "1px solid rgba(73, 136, 196, 0.3)",
                }}
              >
                {club.category}
              </div>
            </div>

            {/* Description */}
            {club.description && (
              <p
                style={{
                  color: "#555",
                  lineHeight: "1.8",
                  fontSize: "1.1rem",
                  maxWidth: "800px",
                  margin: "0 auto",
                }}
              >
                {club.description}
              </p>
            )}
          </div>

          {/* Info Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "2rem",
              marginBottom: "3rem",
            }}
          >
            {/* President Info Card */}
            {club.president_name && (
              <div
                style={{
                  padding: "1.5rem",
                  backgroundColor: "rgba(0, 41, 127, 0.05)",
                  borderRadius: "16px",
                  border: "1px solid rgba(0, 41, 127, 0.1)",
                }}
              >
                <div
                  style={{
                    fontSize: "0.85rem",
                    color: "#666",
                    fontWeight: "600",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                    marginBottom: "0.5rem",
                  }}
                >
                  President
                </div>
                <div
                  style={{
                    fontSize: "1.2rem",
                    color: "#00297f",
                    fontWeight: "600",
                  }}
                >
                  {club.president_name}
                </div>
                {club.president_year && (
                  <div
                    style={{
                      fontSize: "0.95rem",
                      color: "#666",
                      marginTop: "0.3rem",
                    }}
                  >
                    Year: {club.president_year}
                  </div>
                )}
              </div>
            )}

            {/* Events Count Card */}
            <div
              style={{
                padding: "1.5rem",
                backgroundColor: "rgba(73, 136, 196, 0.05)",
                borderRadius: "16px",
                border: "1px solid rgba(73, 136, 196, 0.1)",
              }}
            >
              <div
                style={{
                  fontSize: "0.85rem",
                  color: "#666",
                  fontWeight: "600",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  marginBottom: "0.5rem",
                }}
              >
                Upcoming Events
              </div>
              <div
                style={{
                  fontSize: "2rem",
                  color: "#4988C4",
                  fontWeight: "700",
                }}
              >
                {events.length}
              </div>
            </div>
          </div>

          {/* Events Section */}
          <div style={{ marginBottom: "3rem" }}>
            <h2
              style={{
                fontSize: "1.8rem",
                fontWeight: "700",
                color: "#00297f",
                marginBottom: "1.5rem",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <span>📅</span> Events
            </h2>

            {events.length === 0 ? (
              <div
                style={{
                  padding: "3rem",
                  textAlign: "center",
                  backgroundColor: "rgba(0, 0, 0, 0.02)",
                  borderRadius: "16px",
                  border: "2px dashed rgba(0, 0, 0, 0.1)",
                }}
              >
                <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>📆</div>
                <p
                  style={{
                    color: "#666",
                    fontSize: "1.1rem",
                    fontWeight: "500",
                  }}
                >
                  No events scheduled yet
                </p>
                <p style={{ color: "#999", marginTop: "0.5rem" }}>
                  Check back later for upcoming events!
                </p>
              </div>
            ) : (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                  gap: "1.5rem",
                }}
              >
                {events.map((event) => (
                  <div
                    key={event.id}
                    style={{
                      padding: "1.5rem",
                      backgroundColor: "#f8f9ff",
                      borderRadius: "16px",
                      border: "1px solid rgba(0, 41, 127, 0.1)",
                      transition: "all 0.3s ease",
                      cursor: "pointer",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-4px)";
                      e.currentTarget.style.boxShadow =
                        "0 8px 24px rgba(0, 41, 127, 0.15)";
                      e.currentTarget.style.borderColor =
                        "rgba(0, 41, 127, 0.3)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "none";
                      e.currentTarget.style.borderColor =
                        "rgba(0, 41, 127, 0.1)";
                    }}
                  >
                    <div
                      style={{
                        fontSize: "1.3rem",
                        fontWeight: "700",
                        color: "#00297f",
                        marginBottom: "0.8rem",
                        lineHeight: "1.3",
                      }}
                    >
                      {event.title}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.5rem",
                      }}
                    >
                      {event.date && (
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.5rem",
                            color: "#666",
                            fontSize: "0.95rem",
                          }}
                        >
                          <span>📅</span>
                          <span>{event.date}</span>
                        </div>
                      )}
                      {event.venue && (
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.5rem",
                            color: "#666",
                            fontSize: "0.95rem",
                          }}
                        >
                          <span>📍</span>
                          <span>{event.venue}</span>
                        </div>
                      )}
                      {event.description && (
                        <div
                          style={{
                            marginTop: "0.8rem",
                            paddingTop: "0.8rem",
                            borderTop: "1px solid rgba(0, 0, 0, 0.1)",
                            color: "#555",
                            fontSize: "0.9rem",
                            lineHeight: "1.6",
                          }}
                        >
                          {event.description}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Apply Button */}
          <div
            style={{
              paddingTop: "2rem",
              borderTop: "2px solid rgba(0, 41, 127, 0.1)",
            }}
          >
            <Button
              onClick={applyToClub}
              disabled={applying}
              style={{
                width: "100%",
                padding: "1rem 2rem",
                backgroundColor: "#00297f",
                color: "#fde002",
                fontSize: "1.1rem",
                fontWeight: "600",
                borderRadius: "12px",
                border: "none",
                cursor: applying ? "not-allowed" : "pointer",
                transition: "all 0.3s ease",
                opacity: applying ? 0.7 : 1,
              }}
              onMouseEnter={(e) => {
                if (!applying) {
                  e.currentTarget.style.backgroundColor = "#fde002";
                  e.currentTarget.style.color = "#00297f";
                  e.currentTarget.style.transform = "scale(1.02)";
                }
              }}
              onMouseLeave={(e) => {
                if (!applying) {
                  e.currentTarget.style.backgroundColor = "#00297f";
                  e.currentTarget.style.color = "#fde002";
                  e.currentTarget.style.transform = "scale(1)";
                }
              }}
            >
              {applying ? "Submitting..." : "Apply to Club"}
            </Button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
      `}</style>
    </div>
  );
};

export default ClubDetails;
