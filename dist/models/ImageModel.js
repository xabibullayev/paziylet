"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const imageSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
});
const Image = mongoose_1.default.model("Image", imageSchema);
exports.default = Image;
