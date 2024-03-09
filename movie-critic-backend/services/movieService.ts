import Movie, { MovieDocument } from "../models/Movie";
import Review, { ReviewDocument } from "../models/Review";

const movieService = {
  async getAllMovies(): Promise<any> {
    const moviesWithReviews = await Movie.find().populate("reviews");

    const moviesWithUpdatedReviews = await Promise.all(
      moviesWithReviews.map(async (movie) => {
        const reviews = await Review.find({ movieId: movie._id });

        let totalRating = 0;
        reviews.forEach((review) => {
          totalRating += review.rating;
        });
        const averageRating =
          reviews.length > 0 ? totalRating / reviews.length : 0;

        return { ...movie.toObject(), reviews, averageRating };
      })
    );

    return moviesWithUpdatedReviews;
  },

  async getAMovie(id: any): Promise<any> {
    const moviesWithReviews = await Movie.find({ _id: id }).populate("reviews");

    const reviews = await Review.find({ movieId: id });

    let totalRating = 0;
    reviews.forEach((review) => {
      totalRating += review.rating;
    });
    const averageRating = reviews.length > 0 ? totalRating / reviews.length : 0;

    return { ...moviesWithReviews, reviews, averageRating };
  },

  async createMovie(name: string, releaseDate: Date): Promise<MovieDocument> {
    const movie = new Movie({ name, releaseDate });
    return await movie.save();
  },

  async deleteMovie(id: string): Promise<void> {
    await Movie.findByIdAndDelete(id);
  },
};

export default movieService;
