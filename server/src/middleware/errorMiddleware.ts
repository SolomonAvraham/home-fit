import { Request, Response, NextFunction } from "express";

const errorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.status || 500;
  res
    .status(statusCode)
    .json({ error: err.message || "Internal Server Error" });
};

export default errorMiddleware;
