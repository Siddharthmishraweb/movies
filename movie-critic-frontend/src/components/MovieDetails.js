import React from "react";
import ReviewCard from "./ReviewCard";
import "./moviedetails.css";
import Header from "./Header";
import Footer from "./Footer";

const MovieDetails = (props) => {
  console.log(props.movie);
  const { name } = props.movie[0];
  const reviews = props.movie.reviews;
  const averageRating = props.movie.averageRating;

  return (
    <>
      <Header />
      <div style={{ padding: "30px" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div className="movie-title" style={{ color: "rgb(41, 56, 69)" }}>
            {name}
          </div>
          <div className="rating" style={{ color: "rgb(101, 88, 245)" }}>
            Rating: {averageRating}
          </div>
        </div>

        <div className="reviews">
          {reviews.map((review, index) => (
            <ReviewCard
              key={index}
              comment={review.comments}
              rating={review.rating}
              reviewer={review.reviewer}
            />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MovieDetails;
