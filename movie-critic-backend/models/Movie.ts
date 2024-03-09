import mongoose, { Document } from 'mongoose';
import { ReviewDocument } from './Review';

export interface MovieDocument extends Document {
  name: string;
  releaseDate: Date;
  reviews: mongoose.Types.ObjectId[];
  averageRating: number;
}

const movieSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  releaseDate: {
    type: Date,
    required: true
  },
  reviews: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Review'
  }],
  averageRating: {
    type: Number,
    default: 0
  }
});

movieSchema.pre<MovieDocument>('save', async function(next) {
  try {
    const reviews = await mongoose.model<ReviewDocument>('Review').find({ movieId: this._id });

    let sumOfRatings = 0;
    reviews.forEach((review: ReviewDocument) => {
      sumOfRatings += review.rating;
    });
    const averageRating = sumOfRatings / reviews.length;

    this.averageRating = averageRating;
    next();
  } catch (error:any) {
    next(error);
  }
});

const Movie = mongoose.model<MovieDocument>('Movie', movieSchema);

export default Movie;
