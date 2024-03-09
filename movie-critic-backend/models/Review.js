"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const reviewSchema = new mongoose_1.default.Schema({
    movieId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
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
const Review = mongoose_1.default.model('Review', reviewSchema);
exports.default = Review;
