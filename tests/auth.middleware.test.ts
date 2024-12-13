import { Request, Response, NextFunction } from "express";
import { apiKeyAuthMiddleware } from "../src/middlewares/auth.middleware";
import { UnauthorizedError } from "../src/utils/errors";
import config from "../src/config";

describe("apiKeyAuthMiddleware", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    req = {
      headers: {},
    };
    res = {};
    next = jest.fn();
  });

  it("should call next() when a valid authorization header is provided", () => {
    req.headers = {
      authorization: config.API_KEY,
    };

    apiKeyAuthMiddleware(req as Request, res as Response, next);

    expect(next).toHaveBeenCalled();
  });

  it("should throw UnauthorizedError when no API key is provided", () => {
    expect(() => {
      apiKeyAuthMiddleware(req as Request, res as Response, next);
    }).toThrow(UnauthorizedError);
  });

  it("should throw UnauthorizedError when an invalid authorization header is provided", () => {
    req.headers = {
      authorization: "invalid-key",
    };

    expect(() => {
      apiKeyAuthMiddleware(req as Request, res as Response, next);
    }).toThrow(UnauthorizedError);
  });
});
