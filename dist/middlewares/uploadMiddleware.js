"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadImage = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
//Storage for img files
const storage = multer_1.default.diskStorage({
    destination: (re, file, cb) => {
        cb(null, "./public/images");
    },
    filename: (req, file, callback) => {
        const temp_file_arr = file.originalname.split(".");
        let temp_file_name = temp_file_arr[0];
        for (let i = 1; i < temp_file_arr.length - 1; i++) {
            temp_file_name = temp_file_name + "." + temp_file_arr[i];
        }
        const temp_file_extension = temp_file_arr[temp_file_arr.length - 1];
        callback(null, temp_file_name + "-" + Date.now() + "." + temp_file_extension);
    },
});
// Store for img file
const imageStore = (0, multer_1.default)({
    storage,
    fileFilter: (req, file, cb) => {
        checkFileType(file, cb);
    },
});
// Upload img files
const uploadImage = (req, res, next) => {
    const upload = imageStore.array("images");
    upload(req, res, (err) => {
        if (err instanceof multer_1.default.MulterError) {
            return res.status(400).json(err.message);
        }
        else if (err) {
            if (err === "filetype") {
                return res.status(400).json("Image files only!");
            }
            return res.status(500).json(err.message);
        }
        next();
    });
};
exports.uploadImage = uploadImage;
const checkFileType = (file, cb) => {
    const filetypes = /jpg|jpeg|png/;
    const extname = filetypes.test(path_1.default.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) {
        return cb(null, true);
    }
    cb("filetype");
};
