
import express from "express";
import dotenv from "dotenv";
import authRoutes from "./auth/router/auth.router";
import { connectDB } from "./db/db";
import cors from "cors";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(cors());

app.use(express.urlencoded({ extended: true }));

connectDB();

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.use("/api",authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
