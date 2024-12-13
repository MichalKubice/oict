// utils/response.ts
import { Response } from "express";

interface ApiSuccess<T> {
  status: "ok";
  data: T;
}

interface ApiError {
  status: "error";
  error: string;
}

interface ApiValidationErrors {
  status: "validation_error";
  errors: Record<string, string>;
}

type ApiResponse<T extends object = object> =
  | ApiSuccess<T>
  | ApiError
  | ApiValidationErrors;

export const sendApiResponse = <T extends object>(
  res: Response,
  response: ApiResponse<T>,
  status?: number
): Response<ApiResponse<T>> => {
  let httpStatus = status || 200;

  switch (response.status) {
    case "ok":
      httpStatus = status || 200;
      break;
    case "validation_error":
      httpStatus = status || 400;
      break;
    case "error":
      httpStatus = status || 500;
      break;
    default:
      httpStatus = 500;
      response = {
        status: "error",
        error: "Internal server error",
      };
  }

  return res.status(httpStatus).json(response);
};
