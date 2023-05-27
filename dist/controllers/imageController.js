"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteImage = exports.getImage = void 0;
const fs_1 = __importDefault(require("fs"));
const PostModel_1 = __importDefault(require("../models/PostModel"));
const getImage = async (req, res) => {
    try {
    }
    catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error!";
        res.status(500).json(message);
    }
};
exports.getImage = getImage;
const deleteImage = async (req, res) => {
    try {
        const { name } = req.params;
        if (!name) {
            return res.status(400).json("Image name is required!");
        }
        fs_1.default.stat(`./public/images/${name}`, function (err, stats) {
            console.log(stats); //here we got all information of file in stats variable
            if (err) {
                return console.error(err);
            }
            fs_1.default.unlink(`./public/images/${name}`, function (err) {
                if (err)
                    return console.log(err);
                console.log("file deleted successfully");
            });
        });
        await PostModel_1.default.updateOne({ images: name }, {
            $pull: { images: name },
        });
        res.status(200).json("Image deleted succesfully!");
    }
    catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error!";
        res.status(500).json(message);
    }
};
exports.deleteImage = deleteImage;
