import express from "express";
import connectDB from "./db/db.js";
import dotenv from "dotenv";
import cors from "cors";
import bookmarkRoutes from "./routes/bookmarkroutes.js";
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
await connectDB();

app.use("/api", bookmarkRoutes);
app.get("/", (req, res) => {
  res.send("Server is running");
});

app.listen(process.env.PORT || 5000, () => {
  console.log("Server started");
});
