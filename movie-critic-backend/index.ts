import express from "express";
import mongoose from "mongoose";
import movieRoutes from "./routes/movieRoutes";
import reviewRoutes from "./routes/reviewRoutes";
import cors from "cors";


const app = express();
app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Site running successfully");
});

app.use("/api/movies", movieRoutes);
app.use("/api/reviews", reviewRoutes);

const URI =
  "mongodb+srv://mishrasiddharth1999:Reenter2@cluster0.xwyeof8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose
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
