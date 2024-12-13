import { z } from "zod";
import { sendApiResponse } from "../utils/response";
import { Request, Response } from "express";
import { NotFoundError, UnauthorizedError } from "../utils/errors";

export function errorHandler(
  error: Error,
  _req: Request,
  res: Response,
  _next: unknown
): void {
  console.error(error.stack);

  if (error instanceof z.ZodError) {
    const formErrors: Record<string, string> = error.errors.reduce(
      (acc, err) => {
        acc[err.path.join(".")] = err.message;
        return acc;
      },
      {} as Record<string, string>
    );

    sendApiResponse(
      res,
      {
        status: "validation_error",
        errors: formErrors,
      },
      400
    );
    return;
  }

  if (error instanceof NotFoundError) {
    sendApiResponse(
      res,
      {
        status: "error",
        error: error.message,
      },
      404
    );
    return;
  }

  if (error instanceof UnauthorizedError) {
    sendApiResponse(
      res,
      {
        status: "error",
        error: error.message,
      },
      401
    );
    return;
  }

  sendApiResponse(
    res,
    {
      status: "error",
      error: error.message || "An unknown error occurred",
    },
    500
  );

  return;
}
