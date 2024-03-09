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
const movieService_1 = __importDefault(require("../services/movieService"));
const movieController = {
    getAllMovies(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const movies = yield movieService_1.default.getAllMovies();
                res.json(movies);
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    },
    getAMovie(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const movieId = req.params.id; // Accessing the movie ID from the request parameters
                const movie = yield movieService_1.default.getAMovie(movieId);
                res.json(movie);
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    },
    createMovie(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, releaseDate } = req.body;
            try {
                const movie = yield movieService_1.default.createMovie(name, releaseDate);
                res.status(201).json(movie);
            }
            catch (error) {
                res.status(400).json({ message: error.message });
            }
        });
    },
    deleteMovie(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            try {
                yield movieService_1.default.deleteMovie(id);
                res.status(204).end();
            }
            catch (error) {
                res.status(404).json({ message: error.message });
            }
        });
    }
};
exports.default = movieController;
