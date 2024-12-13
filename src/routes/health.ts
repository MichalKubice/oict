import { Router } from "express";
import { healthCheckHandler } from "../controllers/health.controller";

const router = Router();

/**
 * @swagger
 * /api/health:
 *   get:
 *     summary: Health check endpoint to verify API status
 *     tags:
 *       - Health
 *     responses:
 *       200:
 *         description: API is healthy and running
 *       500:
 *         description: Internal Server Error
 */
router.get("/", healthCheckHandler);

export default router;
