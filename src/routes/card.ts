import { Router } from "express";
import { cardStatusHandler } from "../controllers/card.controller";
import { apiKeyAuthMiddleware } from "../middlewares/auth.middleware";

const router = Router();

/**
 * @swagger
 * /api/card/{cardNumber}:
 *   get:
 *     summary: Get the status of a specific card
 *     tags:
 *       - Cards
 *     parameters:
 *       - in: path
 *         name: cardNumber
 *         required: true
 *         schema:
 *           type: string
 *         description: The card number to retrieve status for
 *     responses:
 *       200:
 *         description: Successful response with card status
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 expiryDate:
 *                   type: string
 *                   description: Expiry date of the card in dd.mm.yyyy format
 *                 status:
 *                   type: string
 *                   description: Current status of the card
 */
router.get("/:cardNumber", apiKeyAuthMiddleware, cardStatusHandler);

export default router;
