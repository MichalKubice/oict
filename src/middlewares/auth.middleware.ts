import { NextFunction, Request, Response } from "express";
import { UnauthorizedError } from "../utils/errors";
import config from "../config";

export const apiKeyAuthMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const apiKey = req.headers["x-api-key"] || req.headers["authorization"];

  if (!apiKey || apiKey !== config.API_KEY) {
    throw new UnauthorizedError("Unauthorized: Invalid API Key");
  }

  next();
};
