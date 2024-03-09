"use strict";
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
const Movie_1 = __importDefault(require("../models/Movie"));
const Review_1 = __importDefault(require("../models/Review"));
const movieService = {
    getAllMovies() {
        return __awaiter(this, void 0, void 0, function* () {
            const moviesWithReviews = yield Movie_1.default.find().populate('reviews');
            const moviesWithUpdatedReviews = yield Promise.all(moviesWithReviews.map((movie) => __awaiter(this, void 0, void 0, function* () {
                const reviews = yield Review_1.default.find({ movieId: movie._id });
                let totalRating = 0;
                reviews.forEach(review => {
                    totalRating += review.rating;
                });
                const averageRating = reviews.length > 0 ? totalRating / reviews.length : 0;
                return Object.assign(Object.assign({}, movie.toObject()), { reviews, averageRating });
            })));
            return moviesWithUpdatedReviews;
        });
    },
    getAMovie(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const moviesWithReviews = yield Movie_1.default.find({ _id: id }).populate('reviews');
            const reviews = yield Review_1.default.find({ movieId: id });
            console.log("reviews::::: ", reviews);
            let totalRating = 0;
            reviews.forEach(review => {
                totalRating += review.rating;
            });
            const averageRating = reviews.length > 0 ? totalRating / reviews.length : 0;
            return Object.assign(Object.assign({}, moviesWithReviews), { reviews, averageRating });
            ;
        });
    },
    createMovie(name, releaseDate) {
        return __awaiter(this, void 0, void 0, function* () {
            const movie = new Movie_1.default({ name, releaseDate });
            return yield movie.save();
        });
    },
    deleteMovie(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Movie_1.default.findByIdAndDelete(id);
        });
    }
};
exports.default = movieService;
