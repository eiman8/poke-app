import express from "express";
import cors from "cors";
import authRoutes from "./src/routes/auth.routes.js";
import errorHandler from "./src/middleware/error.middleware.js";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

// app.get("/api/test", (req, res) => {
//   res.json({ message: "Backend is running! 🚀🚀" });
// });

app.use("/api/auth", authRoutes);
app.use(errorHandler);

export default app;
