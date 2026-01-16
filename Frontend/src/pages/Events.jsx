import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedClub, setSelectedClub] = useState("All");
  const [sortBy, setSortBy] = useState("date"); // 'date' or 'club'

  useEffect(() => {
    fetch("http://localhost:5000/events")
      .then((res) => res.json())
      .then((data) => {
        setEvents(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  // Get unique clubs
  const clubs = useMemo(() => {
    const uniqueClubs = [
      ...new Map(
        events.map((event) => [event.club_id, event.club_name])
      ).values(),
    ];
    return ["All", ...uniqueClubs.sort()];
  }, [events]);

  // Filter and sort events
  const filteredEvents = useMemo(() => {
    let filtered = events.filter((event) => {
      const matchesSearch =
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.club_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (event.venue &&
          event.venue.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesClub =
        selectedClub === "All" || event.club_name === selectedClub;
      return matchesSearch && matchesClub;
    });

    // Sort events
    if (sortBy === "date") {
      filtered.sort((a, b) => {
        const dateA = new Date(a.event_date);
        const dateB = new Date(b.event_date);
        return dateA - dateB;
      });
    } else if (sortBy === "club") {
      filtered.sort((a, b) => a.club_name.localeCompare(b.club_name));
    }

    return filtered;
  }, [events, searchQuery, selectedClub, sortBy]);

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "TBA";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Check if event is upcoming
  const isUpcoming = (dateString) => {
    if (!dateString) return false;
    const eventDate = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return eventDate >= today;
  };

  // Loading skeleton
  const LoadingSkeleton = () => (
    <div
      style={{
        width: "100%",
        maxWidth: "400px",
        backgroundColor: "rgba(255, 255, 255, 0.05)",
        borderRadius: "20px",
        padding: "2rem",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      }}
    >
      <div
        style={{
          width: "80%",
          height: "28px",
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
          width: "95%",
          backgroundColor: "#242424",
          color: "#fde002",
          padding: "2rem 0 1.5rem 5%",
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          zIndex: 10,
        }}
      >
        <div className="events-head">
          <div className="events-head-content">
            <div className="heading-content">
              <h1
                style={{
                  margin: 0,
                  fontSize: "2.5rem",
                  fontWeight: "700",
                  marginBottom: "1rem",
                  letterSpacing: "0.5px",
                }}
              >
                Upcoming Events
              </h1>
              <p
                style={{
                  margin: 0,
                  fontSize: "1.1rem",
                  color: "rgba(253, 224, 2, 0.9)",
                  marginBottom: "1.5rem",
                }}
              >
                Discover exciting events happening across campus
              </p>

              {/* Results count */}
              <div
                style={{
                  marginTop: "1rem",
                  fontSize: "0.95rem",
                  color: "rgba(253, 224, 2, 0.8)",
                }}
              >
                {loading ? (
                  "Loading events..."
                ) : (
                  <>
                    Showing {filteredEvents.length} of {events.length} events
                  </>
                )}
              </div>
            </div>

            {/* Search and Filter Section */}
            <div className="event-search-filter-container">
              <div className="search-sort-container">
                {/* Search div */}
                <div
                  className="event-search-div"
                  style={{
                    display: "flex",
                    minWidth: "250px",
                    maxWidth: "500px",
                  }}
                >
                  <Input
                    className="event-search"
                    type="text"
                    placeholder="Search events by title, club, or venue..."
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
                {/* Sort by div */}
                <div
                  className="event-sort-div"
                  style={{
                    display: "flex",
                    gap: "0.5rem",
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      fontSize: "0.9rem",
                      color: "rgba(253, 224, 2, 0.8)",
                      marginRight: "0.5rem",
                    }}
                  >
                    Sort by:
                  </span>
                  <Button
                    onClick={() => setSortBy("date")}
                    variant={sortBy === "date" ? "default" : "outline"}
                    style={{
                      backgroundColor:
                        sortBy === "date"
                          ? "#fde002"
                          : "rgba(255, 255, 255, 0.1)",
                      color: sortBy === "date" ? "#00297f" : "#fde002",
                      border:
                        sortBy === "date"
                          ? "2px solid #fde002"
                          : "2px solid rgba(253, 224, 2, 0.3)",
                      fontWeight: "600",
                      fontSize: "0.85rem",
                      padding: "0.5rem 1rem",
                      borderRadius: "1rem",
                      cursor: "pointer",
                    }}
                  >
                    📅 Date
                  </Button>
                  <Button
                    onClick={() => setSortBy("club")}
                    variant={sortBy === "club" ? "default" : "outline"}
                    style={{
                      backgroundColor:
                        sortBy === "club"
                          ? "#fde002"
                          : "rgba(255, 255, 255, 0.1)",
                      color: sortBy === "club" ? "#00297f" : "#fde002",
                      border:
                        sortBy === "club"
                          ? "2px solid #fde002"
                          : "2px solid rgba(253, 224, 2, 0.3)",
                      fontWeight: "600",
                      fontSize: "0.85rem",
                      padding: "0.5rem 1rem",
                      borderRadius: "1rem",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                    }}
                  >
                    🎯 Club
                  </Button>
                </div>
              </div>
              {/* Club filter div */}
              <div
                style={{
                  display: "flex",
                  gap: "0.5rem",
                  flexWrap: "wrap",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {clubs.map((club) => (
                  <Button
                    className="select-btn"
                    key={club}
                    onClick={() => setSelectedClub(club)}
                    variant={selectedClub === club ? "default" : "outline"}
                    style={{
                      backgroundColor:
                        selectedClub === club
                          ? "#fde002"
                          : "rgba(255, 255, 255, 0.1)",
                      color: selectedClub === club ? "#00297f" : "#fde002",
                      border:
                        selectedClub === club
                          ? "2px solid #fde002"
                          : "2px solid rgba(253, 224, 2, 0.3)",
                      fontWeight: "600",
                      transition: "all 0.3s ease",
                    }}
                  >
                    {club}
                  </Button>
                ))}
              </div>
              {/* <div
                style={{
                  display: "flex",
                  gap: "0.5rem",
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    fontSize: "0.9rem",
                    color: "rgba(253, 224, 2, 0.8)",
                    marginRight: "0.5rem",
                  }}
                >
                  Sort by:
                </span>
                <Button
                  onClick={() => setSortBy("date")}
                  variant={sortBy === "date" ? "default" : "outline"}
                  style={{
                    backgroundColor:
                      sortBy === "date"
                        ? "#fde002"
                        : "rgba(255, 255, 255, 0.1)",
                    color: sortBy === "date" ? "#00297f" : "#fde002",
                    border:
                      sortBy === "date"
                        ? "2px solid #fde002"
                        : "2px solid rgba(253, 224, 2, 0.3)",
                    fontWeight: "600",
                    fontSize: "0.85rem",
                    padding: "0.5rem 1rem",
                    borderRadius: "1rem",
                    cursor: "pointer",
                  }}
                >
                  📅 Date
                </Button>
                <Button
                  onClick={() => setSortBy("club")}
                  variant={sortBy === "club" ? "default" : "outline"}
                  style={{
                    backgroundColor:
                      sortBy === "club"
                        ? "#fde002"
                        : "rgba(255, 255, 255, 0.1)",
                    color: sortBy === "club" ? "#00297f" : "#fde002",
                    border:
                      sortBy === "club"
                        ? "2px solid #fde002"
                        : "2px solid rgba(253, 224, 2, 0.3)",
                    fontWeight: "600",
                    fontSize: "0.85rem",
                    padding: "0.5rem 1rem",
                    borderRadius: "1rem",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                  }}
                >
                  🎯 Club
                </Button>
              </div> */}
            </div>

            {/* Results count
            <div
              style={{
                marginTop: "1rem",
                fontSize: "0.95rem",
                color: "rgba(253, 224, 2, 0.8)",
                textAlign: "center",
              }}
            >
              {loading ? (
                "Loading events..."
              ) : (
                <>
                  Showing {filteredEvents.length} of {events.length} events
                </>
              )}
            </div> */}
          </div>
        </div>
      </div>

      <div
        className="content"
        style={{
          minHeight: "100vh",
          background:
            "linear-gradient(135deg, #0F2854 0%, #1C4D8D 25%, #4988C4 50%, #BDE8F5 100%)",
          padding: "2rem",
          paddingTop: "1rem",
          marginTop: "0",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            flexWrap: "wrap",
            gap: "2rem",
            maxWidth: "1400px",
            margin: "200px auto 0",
          }}
        >
          {loading ? (
            // Loading skeletons
            Array.from({ length: 6 }).map((_, index) => (
              <LoadingSkeleton key={index} />
            ))
          ) : filteredEvents.length === 0 ? (
            // Empty state
            <div
              style={{
                width: "100%",
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
                📅
              </div>
              <h2
                style={{
                  fontSize: "1.8rem",
                  marginBottom: "0.5rem",
                  fontWeight: "600",
                }}
              >
                No events found
              </h2>
              <p style={{ fontSize: "1.1rem", opacity: 0.8 }}>
                {searchQuery || selectedClub !== "All"
                  ? "Try adjusting your search or filter criteria"
                  : "No upcoming events at the moment. Check back later!"}
              </p>
            </div>
          ) : (
            // Event cards
            filteredEvents.map((event) => (
              <div
                key={event.id}
                className="event-card"
                style={{
                  width: "100%",
                  maxWidth: "400px",
                  backgroundColor: "rgba(255, 255, 255, 0.95)",
                  backdropFilter: "blur(10px)",
                  borderRadius: "20px",
                  padding: "2rem",
                  boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  display: "flex",
                  flexDirection: "column",
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

                {/* Event Title */}
                <h3
                  style={{
                    margin: 0,
                    marginBottom: "1rem",
                    fontSize: "1.6rem",
                    fontWeight: "700",
                    color: "#00297f",
                    lineHeight: "1.3",
                  }}
                >
                  {event.title}
                </h3>

                {/* Event Date */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    marginBottom: "1rem",
                    padding: "0.6rem 1rem",
                    backgroundColor: isUpcoming(event.event_date)
                      ? "rgba(253, 224, 2, 0.15)"
                      : "rgba(0, 0, 0, 0.05)",
                    borderRadius: "12px",
                  }}
                >
                  <span style={{ fontSize: "1.2rem" }}>📅</span>
                  <div>
                    <div
                      style={{
                        fontSize: "0.85rem",
                        color: "#666",
                        fontWeight: "600",
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                      }}
                    >
                      {isUpcoming(event.event_date) ? "Upcoming" : "Past Event"}
                    </div>
                    <div
                      style={{
                        fontSize: "1rem",
                        color: "#00297f",
                        fontWeight: "600",
                      }}
                    >
                      {formatDate(event.event_date)}
                    </div>
                  </div>
                </div>

                {/* Venue */}
                {event.venue && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      marginBottom: "1rem",
                      color: "#555",
                      fontSize: "0.95rem",
                    }}
                  >
                    <span style={{ fontSize: "1.1rem" }}>📍</span>
                    <span>{event.venue}</span>
                  </div>
                )}

                {/* Organized by Club */}
                <div
                  style={{
                    marginTop: "auto",
                    paddingTop: "1rem",
                    borderTop: "2px solid rgba(0, 41, 127, 0.1)",
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
                    Organized by
                  </div>
                  <Link
                    to={`/clubs/${event.club_id}`}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      padding: "0.5rem 1rem",
                      backgroundColor: "#00297f",
                      color: "#fde002",
                      borderRadius: "12px",
                      textDecoration: "none",
                      fontWeight: "600",
                      fontSize: "0.95rem",
                      transition: "all 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#fde002";
                      e.currentTarget.style.color = "#00297f";
                      e.currentTarget.style.transform = "scale(1.05)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "#00297f";
                      e.currentTarget.style.color = "#fde002";
                      e.currentTarget.style.transform = "scale(1)";
                    }}
                  >
                    <span>🎯</span>
                    {event.club_name}
                  </Link>
                </div>
              </div>
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

export default Events;
