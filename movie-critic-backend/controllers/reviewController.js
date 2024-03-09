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
const reviewService_1 = __importDefault(require("../services/reviewService"));
const reviewController = {
    createReview(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { movieId, reviewer, rating, comments } = req.body;
            try {
                const review = yield reviewService_1.default.createReview(movieId, reviewer, rating, comments);
                res.status(201).json(review);
            }
            catch (error) {
                res.status(400).json({ message: error.message });
            }
        });
    },
    searchReviews(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const searchParam = req.query.search;
            try {
                const reviews = yield reviewService_1.default.searchReviews(searchParam);
                res.json(reviews);
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
};
exports.default = reviewController;
