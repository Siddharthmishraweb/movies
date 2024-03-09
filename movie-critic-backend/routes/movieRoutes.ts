import express from 'express';
import movieController from '../controllers/movieController';

const router = express.Router();

router.get('/', movieController.getAllMovies);
router.get('/:id', movieController.getAMovie);
router.post('/', movieController.createMovie);
router.delete('/:id', movieController.deleteMovie);

export default router;
