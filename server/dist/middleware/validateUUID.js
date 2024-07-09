"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUUID = void 0;
const validateUUID = (req, res, next) => {
    const { id } = req.params;
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[4-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(id)) {
        return res.status(400).json({ message: "Invalid UUID format" });
    }
    next();
};
exports.validateUUID = validateUUID;
