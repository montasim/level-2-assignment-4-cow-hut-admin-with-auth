"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateUserId = void 0;
let lastUserId = 0;
const generateUserId = () => {
    lastUserId++;
    return String(lastUserId).padStart(5, '0');
};
exports.generateUserId = generateUserId;
