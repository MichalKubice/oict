import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cardRoutes from "./routes/card.routes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Health Check Endpoint
app.get("/root", (req: Request, res: Response) => {
  res.send({
    status: "OK",
  });
});

// Routes
app.use("/api", cardRoutes);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
