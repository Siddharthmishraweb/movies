"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const movieController_1 = __importDefault(require("../controllers/movieController"));
const router = express_1.default.Router();
router.get('/', movieController_1.default.getAllMovies);
router.get('/:id', movieController_1.default.getAMovie);
router.post('/', movieController_1.default.createMovie);
router.delete('/:id', movieController_1.default.deleteMovie);
exports.default = router;
