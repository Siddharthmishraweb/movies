import Review, { ReviewDocument } from '../models/Review';

const reviewService = {
  async createReview(movieId: string, reviewer: string, rating: number, comments: string): Promise<ReviewDocument> {
    const review = new Review({ movieId, reviewer, rating, comments });
    return await review.save();
  },

  async searchReviews(searchParam: string): Promise<ReviewDocument[]> {
    return await Review.find({ comments: { $regex: searchParam, $options: 'i' } });
  }
};

export default reviewService;
