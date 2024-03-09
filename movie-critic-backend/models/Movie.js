"use strict";
// import mongoose, { Document } from 'mongoose';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// export interface MovieDocument extends Document {
//   name: string;
//   releaseDate: Date;
//   reviews: mongoose.Types.ObjectId[];
// }
// const movieSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true
//   },
//   releaseDate: {
//     type: Date,
//     required: true
//   },
//   reviews: [{
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Review'
//   }],
//   averageRating: { // Define the averageRating field in the schema
//     type: Number,
//     default: 0 // Set a default value if needed
//   }
// });
// const Movie = mongoose.model<MovieDocument>('Movie', movieSchema);
// export default Movie;
const mongoose_1 = __importDefault(require("mongoose"));
const movieSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true
    },
    releaseDate: {
        type: Date,
        required: true
    },
    reviews: [{
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'Review'
        }],
    averageRating: {
        type: Number,
        default: 0 // Set a default value if needed
    }
});
// Define a pre-save hook to calculate the average rating
movieSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Find all reviews for this movie
            const reviews = yield mongoose_1.default.model('Review').find({ movieId: this._id });
            // Calculate the average rating
            let sumOfRatings = 0;
            reviews.forEach((review) => {
                sumOfRatings += review.rating;
            });
            const averageRating = sumOfRatings / reviews.length;
            // Update the averageRating field
            this.averageRating = averageRating;
            next();
        }
        catch (error) {
            next(error);
        }
    });
});
const Movie = mongoose_1.default.model('Movie', movieSchema);
exports.default = Movie;
