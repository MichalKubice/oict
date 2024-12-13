import { Router } from "express";
import { cardStatusHandler } from "../controllers/card.controller";
import { apiKeyAuthMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.get("/:cardNumber", apiKeyAuthMiddleware, cardStatusHandler);

export default router;
