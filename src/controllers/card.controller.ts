import { NextFunction, Request, Response } from "express";
import {
  cardNumberSchema,
  cardValiditySchema,
  cardStateSchema,
  CardValidity,
  CardState,
} from "../utils/schemas";
import { ExternalApiError } from "../utils/errors";
import { z } from "zod";
import { CardInfoResponse } from "../utils/types";
import { formatDate } from "../utils/formatters";
import config from "../config";

const BASE_API_URL = config.BASE_API_URL;

export const cardStatusHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const validatedParams = cardNumberSchema.parse(req.params);
    const { cardNumber } = validatedParams;

    let validityData: CardValidity;
    let stateData: CardState;
    try {
      const [validityResponse, stateResponse] = await Promise.all([
        fetch(`${BASE_API_URL}/${cardNumber}/validity`),
        fetch(`${BASE_API_URL}/${cardNumber}/state`),
      ]);

      if (!validityResponse.ok) {
        throw new ExternalApiError(
          `Failed to fetch card validity: ${validityResponse.status} ${validityResponse.statusText}`
        );
      }

      if (!stateResponse.ok) {
        throw new ExternalApiError(
          `Failed to fetch card state: ${stateResponse.status} ${stateResponse.statusText}`
        );
      }

      const [validityJson, stateJson] = await Promise.all([
        validityResponse.json(),
        stateResponse.json(),
      ]);

      validityData = cardValiditySchema.parse(validityJson);
      stateData = cardStateSchema.parse(stateJson);
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new ExternalApiError("Invalid data received from external API");
      }

      throw error;
    }

    const cardInfo: CardInfoResponse = {
      expiryDate: formatDate(validityData.validity_end),
      status: stateData.state_description,
    };

    res.status(200).json(cardInfo);
  } catch (e) {
    next(e);
  }
};
