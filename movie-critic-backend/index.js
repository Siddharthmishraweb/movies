"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const movieRoutes_1 = __importDefault(require("./routes/movieRoutes"));
const reviewRoutes_1 = __importDefault(require("./routes/reviewRoutes"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/api/movies", movieRoutes_1.default);
app.use("/api/reviews", reviewRoutes_1.default);
const URI = "mongodb+srv://mishrasiddharth1999:Reenter2@cluster0.xwyeof8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
mongoose_1.default
    .connect(URI, {})
    .then(() => {
    console.log("Connected to MongoDB");
    app.listen(3001, () => {
        console.log("Server is running on port 3001");
    });
})
    .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
});
