import { Request, Response } from "express";

export const healthCheckHandler = (_req: Request, res: Response) => {
  res.status(200).json({ status: "OK", message: "Hello World" });
};
