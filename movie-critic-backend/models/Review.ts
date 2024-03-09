import mongoose, { Document } from 'mongoose';

export interface ReviewDocument extends Document {
  movieId: mongoose.Types.ObjectId;
  reviewer?: string;
  rating: number;
  comments: string;
}

const reviewSchema = new mongoose.Schema({
  movieId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Movie',
    required: true
  },
  reviewer: {
    type: String
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 10
  },
  comments: {
    type: String,
    required: true
  }
});

const Review = mongoose.model<ReviewDocument>('Review', reviewSchema);

export default Review;
