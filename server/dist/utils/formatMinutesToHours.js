"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = formatMinutesToHours;
function formatMinutesToHours(minutes) {
    if (minutes === 0) {
        return "0";
    }
    if (minutes < 10) {
        return `${minutes} minutes`;
    }
    if (minutes < 60) {
        return `${minutes} minutes`;
    }
    else {
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;
        return `${String(hours).padStart(2, "0")}:${String(remainingMinutes).padStart(2, "0")} hours`;
    }
}
