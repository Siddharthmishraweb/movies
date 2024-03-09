import express from 'express';
import reviewController from '../controllers/reviewController';

const router = express.Router();

router.post('/', reviewController.createReview);
router.get('/search', reviewController.searchReviews);

export default router;
