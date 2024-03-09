import React, { useState, useRef, useEffect } from "react";

const Header = () => {
  const [showAddMoviePopup, setShowAddMoviePopup] = useState(false);
  const [showAddReviewPopup, setShowAddReviewPopup] = useState(false);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState("");
  const [reviewerName, setReviewerName] = useState("");
  const [rating, setRating] = useState("");
  const [comments, setComments] = useState("");

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/movies/");
        if (response.ok) {
          const data = await response.json();
          setMovies(data);
        } else {
          console.error("Failed to fetch movies");
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []);

  const handleSubmitReview = async () => {
    try {
      console.log("selectedMovie+++", selectedMovie);
      const response = await fetch("http://localhost:3001/api/reviews/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          movieId: selectedMovie,
          reviewer: reviewerName,
          rating: rating,
          comments: comments,
        }),
      });

      if (response.ok) {
        console.log("Review submitted successfully");
        setReviewerName("");
        setRating("");
        setComments("");
      } else {
        console.error("Failed to submit review");
      }
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/movies/");
        if (response.ok) {
          const data = await response.json();
          setMovies(data);
        } else {
          console.error("Failed to fetch movies");
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []);

  const commentCollector = (e) => {
    console.log(e.target.value);
    setComments(e.target.value);
  };
  const ratingCollector = (e) => {
    console.log(e.target.value);
    setRating(e.target.value);
  };

  const nameCollector = (e) => {
    console.log(e.target.value);
    setReviewerName(e.target.value);
  };
  const addMovieRef = useRef(null);
  const addReviewRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (addMovieRef.current && !addMovieRef.current.contains(event.target)) {
        setShowAddMoviePopup(false);
      }
      if (
        addReviewRef.current &&
        !addReviewRef.current.contains(event.target)
      ) {
        setShowAddReviewPopup(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const openAddMoviePopup = () => {
    setShowAddMoviePopup(true);
  };

  const closeAddMoviePopup = () => {
    setShowAddMoviePopup(false);
  };

  const openAddReviewPopup = () => {
    setShowAddReviewPopup(true);
  };

  const closeAddReviewPopup = () => {
    setShowAddReviewPopup(false);
  };

  const createMovie = async () => {
    const movieName = document.getElementById("movieName").value;
    const releaseDate = document.getElementById("releaseDate").value;

    const response = await fetch("http://localhost:3001/api/movies/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: movieName,
        releaseDate: new Date(releaseDate),
      }),
    });

    if (response.ok) {
      closeAddMoviePopup();
    } else {
      alert("Failed to create movie. Please try again.");
    }
  };

  return (
    <header style={{ background: "#E3E8ED", padding: "10px 20px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ fontWeight: "bold" }}>MOVIECRITIC</div>
        <div>
          <button
            style={{
             backgroundColor:"white",
              color: "#6558F5",
              marginRight: "10px",
              padding: "7px 14px",
              borderRadius: "3px",
              cursor: "pointer",
              border: '1px solid #6558F5'
            }}
            onClick={openAddMoviePopup}
          >
            Add new Movie
          </button>
          <button
            style={{
              background: "#6558F5",
              color: "white",
              padding: "7px 14px",
              borderRadius: "3px",
              cursor: "pointer",
              border: 'none'
            }}
            onClick={openAddReviewPopup}
          >
            Add new Review
          </button>
        </div>
      </div>

      {showAddMoviePopup && (
        <div
          ref={addMovieRef}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "white",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <button
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
            onClick={closeAddMoviePopup}
          >
            X
          </button>
          <h2 style={{ fontWeight: "500", marginBottom: "30px" }}>
            Add a movie
          </h2>
          <input
            type="text"
            id="movieName"
            placeholder="Name"
            style={{
              color: "#C3CFD9",
              borderColor: "#C5CED6",
              padding: "5px",
              width: "100%",
              boxSizing: "border-box",
              border: "1px solid grey",
              borderRadius: "3px",
              marginBottom: "22px"
            }}
          />
          <input
            type="date"
            id="releaseDate"
            placeholder="Release date"
            style={{
              color: "#C3CFD9",
              borderColor: "#C5CED6",
              marginBottom: "22px",
              padding: "5px",
              width: "100%",
              boxSizing: "border-box",
              border: "1px solid grey",
              borderRadius: "3px"
            }}
          />
          <button
            style={{
              background: "#6558F5",
              color: "white",
              padding: "8px 16px",
              borderRadius: "5px",
              cursor: "pointer",
              float: "right",
              border: "none"
            }}
            onClick={createMovie}
          >
            Create movie
          </button>
        </div>
      )}

      {showAddReviewPopup && (
        <div
          ref={addReviewRef}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "white",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <h2 style={{ fontWeight: "500", marginBottom: "30px" }}>
            Add new Review
          </h2>
          <button
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
            onClick={closeAddReviewPopup}
          >
            X
          </button>
          <h2
            style={{ fontWeight: "500", marginBottom: "10px" }}
            placeholder="Select a movie"
          ></h2>
          <select
            id="movieSelect"
            style={{
              marginBottom: "10px",
              padding: "5px",
              borderColor: "#C5CED6",
              width: "100%",
              boxSizing: "border-box",
              marginBottom: "22px"
            }}
            onChange={(event) => setSelectedMovie(event.target.value)}
          >
            {movies.map((movie) => (
              <option key={movie._id} value={movie._id}>
                {movie.name}
              </option>
            ))}
          </select>
          <input
            type="text"
            id="reviewerName"
            placeholder="Your Name"
            style={{
                color: "#C3CFD9",
                borderColor: "#C5CED6",
                padding: "5px",
                width: "100%",
                boxSizing: "border-box",
                border: "1px solid grey",
                borderRadius: "3px",
                marginBottom: "22px"
            }}
            value={reviewerName}
            onChange={(e) => nameCollector(e)}
          />
          <input
            type="number"
            id="rating"
            placeholder="Rating out of 10"
            min="1"
            max="10"
            style={{
                color: "#C3CFD9",
                borderColor: "#C5CED6",
                padding: "5px",
                width: "100%",
                boxSizing: "border-box",
                border: "1px solid grey",
                borderRadius: "3px",
                marginBottom: "22px"
            }}
            value={rating}
            onChange={(e) => ratingCollector(e)}
          />
          <textarea
            id="comments"
            placeholder="Review comments"
            style={{
              color: "#C3CFD9",
              borderColor: "#C5CED6",
              marginBottom: "10px",
              padding: "5px",
              width: "100%",
              boxSizing: "border-box",
            }}
            value={comments}
            onChange={(e) => commentCollector(e)}
          ></textarea>
          <button
            style={{
                background: "#6558F5",
                color: "white",
                padding: "8px 16px",
                borderRadius: "5px",
                cursor: "pointer",
                float: "right",
                border: "none"
            }}
            onClick={handleSubmitReview}
          >
            Add review
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
