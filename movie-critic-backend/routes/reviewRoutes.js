"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const reviewController_1 = __importDefault(require("../controllers/reviewController"));
const router = express_1.default.Router();
router.post('/', reviewController_1.default.createReview);
router.get('/search', reviewController_1.default.searchReviews);
exports.default = router;
