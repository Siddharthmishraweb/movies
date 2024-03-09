import { Request, Response } from 'express';
import movieService from '../services/movieService';

const movieController = {
  async getAllMovies(req: Request, res: Response): Promise<void> {
    try {
      const movies = await movieService.getAllMovies();
      res.json(movies);
    } catch (error:any) {
      res.status(500).json({ message: error.message });
    }
  },
  async getAMovie(req: Request, res: Response): Promise<void> {
    try {
        const movieId = req.params.id;
        const movie = await movieService.getAMovie(movieId);
        res.json(movie);
    } catch (error:any) {
        res.status(500).json({ message: error.message });
    }
},
  async createMovie(req: Request, res: Response): Promise<void> {
    const { name, releaseDate } = req.body;
    try {
      const movie = await movieService.createMovie(name, releaseDate);
      res.status(201).json(movie);
    } catch (error:any) {
      res.status(400).json({ message: error.message });
    }
  },

  async deleteMovie(req: Request, res: Response): Promise<void> {
    const id = req.params.id;
    try {
      await movieService.deleteMovie(id);
      res.status(204).end();
    } catch (error:any) {
      res.status(404).json({ message: error.message });
    }
  }
};

export default movieController;
