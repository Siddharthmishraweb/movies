import { Request, Response } from 'express';
import reviewService from '../services/reviewService';

const reviewController = {
  async createReview(req: Request, res: Response): Promise<void> {
    const { movieId, reviewer, rating, comments } = req.body;
    try {
      const review = await reviewService.createReview(movieId, reviewer, rating, comments);
      res.status(201).json(review);
    } catch (error:any) {
      res.status(400).json({ message: error.message });
    }
  },

  async searchReviews(req: Request, res: Response): Promise<void> {
    const searchParam = req.query.search as string;
    try {
      const reviews = await reviewService.searchReviews(searchParam);
      res.json(reviews);
    } catch (error:any) {
      res.status(500).json({ message: error.message });
    }
  }
};

export default reviewController;
