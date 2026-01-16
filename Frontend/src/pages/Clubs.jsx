import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";

const Clubs = () => {
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [imageErrors, setImageErrors] = useState({});

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

  // Get unique categories
  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(clubs.map((club) => club.category))];
    return ["All", ...uniqueCategories.sort()];
  }, [clubs]);

  // Filter clubs based on search and category
  const filteredClubs = useMemo(() => {
    return clubs.filter((club) => {
      const matchesSearch =
        club.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        club.short_code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        club.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" || club.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [clubs, searchQuery, selectedCategory]);

  const handleImageError = (clubId) => {
    setImageErrors((prev) => ({ ...prev, [clubId]: true }));
  };

  // Loading skeleton component
  const LoadingSkeleton = () => (
    <div
      style={{
        width: "100%",
        minHeight: "380px",
        backgroundColor: "rgba(255, 255, 255, 0.05)",
        borderRadius: "16px",
        // padding: "1.5rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1rem",
        animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      }}
    >
      <div
        style={{
          width: "120px",
          height: "120px",
          borderRadius: "50%",
          backgroundColor: "rgba(255, 255, 255, 0.1)",
        }}
      />
      <div
        style={{
          width: "80%",
          height: "24px",
          borderRadius: "8px",
          backgroundColor: "rgba(255, 255, 255, 0.1)",
        }}
      />
      <div
        style={{
          width: "60%",
          height: "20px",
          borderRadius: "8px",
          backgroundColor: "rgba(255, 255, 255, 0.1)",
        }}
      />
      <div
        style={{
          width: "70%",
          height: "20px",
          borderRadius: "8px",
          backgroundColor: "rgba(255, 255, 255, 0.1)",
        }}
      />
    </div>
  );

  return (
    <>
      <div
        className="content"
        style={{
          position: "relative",
          // top: "64px",
          width: "95%",
          backgroundColor: "#242424",
          color: "#fde002",
          padding: "2rem 0 1.5rem 5%",
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          zIndex: 10,
        }}
      >
        <div className="clubs-head">
          <div className="head-content">
            <h1
              style={{
                margin: 0,
                fontSize: "2.5rem",
                fontWeight: "700",
                marginBottom: "1rem",
                letterSpacing: "0.5px",
              }}
            >
              Explore Clubs
            </h1>
            <p
              style={{
                margin: 0,
                fontSize: "1.1rem",
                color: "rgba(253, 224, 2, 0.9)",
                marginBottom: "1.5rem",
              }}
            >
              Discover and join clubs that match your interests
            </p>

            <div
              style={{
                marginTop: "1rem",
                fontSize: "0.95rem",
                color: "rgba(253, 224, 2, 0.8)",
              }}
            >
              {loading ? (
                "Loading clubs..."
              ) : (
                <>
                  Showing {filteredClubs.length} of {clubs.length} clubs
                </>
              )}
            </div>
          </div>

          {/* Search and Filter Section */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "1rem",
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <div style={{ minWidth: "250px", maxWidth: "500px" }}>
              <Input
                className="club-search"
                type="text"
                placeholder="Search clubs by name, code, or category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.95)",
                  color: "#1a1a1a",
                  fontSize: "1rem",
                  padding: "0.75rem 1rem",
                  borderRadius: "1rem",
                  width: "250px",
                }}
              />
            </div>
            <div
              style={{
                display: "flex",
                gap: "0.5rem",
                flexWrap: "wrap",
                alignItems: "center",
              }}
            >
              {categories.map((category) => (
                <Button
                  className="select-btn"
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  variant={
                    selectedCategory === category ? "default" : "outline"
                  }
                  style={{
                    backgroundColor:
                      selectedCategory === category
                        ? "#fde002"
                        : "rgba(255, 255, 255, 0.1)",
                    color:
                      selectedCategory === category ? "#00297f" : "#fde002",
                    border:
                      selectedCategory === category
                        ? "2px solid #fde002"
                        : "2px solid rgba(253, 224, 2, 0.3)",
                    fontWeight: "600",
                    transition: "all 0.3s ease",
                  }}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* Results count */}
          {/* <div
            style={{
              marginTop: "1rem",
              fontSize: "0.95rem",
              color: "rgba(253, 224, 2, 0.8)",
            }}
          >
            {loading ? (
              "Loading clubs..."
            ) : (
              <>
                Showing {filteredClubs.length} of {clubs.length} clubs
              </>
            )}
          </div> */}
        </div>
      </div>

      <div
        style={{
          minHeight: "calc(100vh - 64px)",
          background:
            "linear-gradient(135deg, #0F2854 0%, #1C4D8D 25%, #4988C4 50%, #BDE8F5 100%)",
          padding: "2rem",
          paddingTop: "1rem",
          marginTop: "0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            // marginTop: "200px",
            // padding: "1rem 0 1rem 0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            flexWrap: "wrap",
            // gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            // gap: "2rem",
            maxWidth: "1400px",
            // margin: "10px",
            // margin: "200px auto 0",
          }}
        >
          {loading ? (
            // Loading skeletons
            Array.from({ length: 6 }).map((_, index) => (
              <LoadingSkeleton key={index} />
            ))
          ) : filteredClubs.length === 0 ? (
            // Empty state
            <div
              style={{
                gridColumn: "1 / -1",
                textAlign: "center",
                padding: "4rem 2rem",
                color: "#fff",
              }}
            >
              <div
                style={{
                  fontSize: "4rem",
                  marginBottom: "1rem",
                  opacity: 0.5,
                }}
              >
                🔍
              </div>
              <h2
                style={{
                  fontSize: "1.8rem",
                  marginBottom: "0.5rem",
                  fontWeight: "600",
                }}
              >
                No clubs found
              </h2>
              <p style={{ fontSize: "1.1rem", opacity: 0.8 }}>
                Try adjusting your search or filter criteria
              </p>
            </div>
          ) : (
            // Club cards
            filteredClubs.map((club) => (
              // <div className="club-div">
              <div
                key={club.id}
                className="club-card"
                style={{
                  width: "17vw",
                  margin: "15px",
                  backgroundColor: "rgba(255, 255, 255, 0.95)",
                  backdropFilter: "blur(10px)",
                  borderRadius: "20px",
                  padding: "1.5rem",
                  boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  cursor: "pointer",
                  position: "relative",
                  overflow: "hidden",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-8px)";
                  e.currentTarget.style.boxShadow =
                    "0 16px 40px rgba(0, 0, 0, 0.25)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 8px 24px rgba(0, 0, 0, 0.15)";
                }}
              >
                {/* Decorative gradient overlay */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "4px",
                    background:
                      "linear-gradient(90deg, #fde002, #4988C4, #BDE8F5)",
                  }}
                />

                {/* Club Image */}
                <div
                  style={{
                    width: "140px",
                    height: "140px",
                    borderRadius: "50%",
                    marginBottom: "1.5rem",
                    overflow: "hidden",
                    border: "4px solid #fde002",
                    boxShadow: "0 4px 16px rgba(253, 224, 2, 0.3)",
                    backgroundColor: "#f0f0f0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {imageErrors[club.id] ? (
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        backgroundColor: "#e0e0e0",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "3rem",
                      }}
                    >
                      🎯
                    </div>
                  ) : (
                    <img
                      src={`/clubImages/${club.milestones}`}
                      alt={club.name}
                      onError={() => handleImageError(club.id)}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  )}
                </div>

                {/* Club Name */}
                <h3
                  style={{
                    margin: 0,
                    marginBottom: "0.75rem",
                    fontSize: "1.4rem",
                    fontWeight: "700",
                    color: "#00297f",
                    lineHeight: "1.3",
                  }}
                >
                  {club.name}
                </h3>

                {/* Club Code Badge */}
                <div
                  style={{
                    display: "inline-block",
                    padding: "0.4rem 0.8rem",
                    backgroundColor: "#00297f",
                    color: "#fde002",
                    borderRadius: "20px",
                    fontSize: "0.85rem",
                    fontWeight: "600",
                    marginBottom: "1rem",
                    letterSpacing: "0.5px",
                  }}
                >
                  {club.short_code}
                </div>

                {/* Category Badge */}
                <div
                  style={{
                    display: "inline-block",
                    padding: "0.35rem 0.75rem",
                    backgroundColor: "rgba(73, 136, 196, 0.15)",
                    color: "#4988C4",
                    borderRadius: "12px",
                    fontSize: "0.8rem",
                    fontWeight: "600",
                    marginBottom: "1.25rem",
                    border: "1px solid rgba(73, 136, 196, 0.3)",
                  }}
                >
                  {club.category}
                </div>

                {/* View Details Button */}
                <Link
                  to={`/clubs/${club.id}`}
                  style={{
                    display: "inline-block",
                    width: "100%",
                    padding: "0.75rem 0 0.75rem 0",
                    backgroundColor: "#00297f",
                    color: "#fde002",
                    borderRadius: "12px",
                    textDecoration: "none",
                    fontWeight: "600",
                    fontSize: "1rem",
                    transition: "all 0.3s ease",
                    border: "2px solid transparent",
                    marginTop: "auto",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#fde002";
                    e.currentTarget.style.color = "#00297f";
                    e.currentTarget.style.transform = "scale(1.02)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#00297f";
                    e.currentTarget.style.color = "#fde002";
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                >
                  View Details →
                </Link>
              </div>
              // </div>
            ))
          )}
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
    </>
  );
};

export default Clubs;
