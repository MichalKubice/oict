import express from "express";
import helmet from "helmet";
import healthRouter from "./routes/health";
import cardRouter from "./routes/card";
import dotenv from "dotenv";
import { errorHandler } from "./middlewares/errorHandler";
import { NotFoundError } from "./utils/errors";
import config from "./config";

async function main() {
  dotenv.config();
  const app = express();
  // app.use("/docs", swaggerUi.serve, swaggerUi.setup(openApiDoc));
  app.use(helmet());

  app.use(express.json());

  app.use("/api/health", healthRouter);
  app.use("/api/card", cardRouter);

  app.use(() => {
    throw new NotFoundError("Route not found");
  });

  app.use(errorHandler);

  const PORT = config.PORT;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

main();
