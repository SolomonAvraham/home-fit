"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorMiddleware = (err, req, res, next) => {
    const statusCode = err.status || 500;
    res
        .status(statusCode)
        .json({ error: err.message || "Internal Server Error" });
};
exports.default = errorMiddleware;
