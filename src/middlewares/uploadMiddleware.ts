import multer from "multer";
import path from "path";
import { Request, Response, NextFunction } from "express";

//Storage for img files
const storage = multer.diskStorage({
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

    callback(
      null,
      temp_file_name + "-" + Date.now() + "." + temp_file_extension
    );
  },
});

// Store for img file
const imageStore = multer({
  storage,

  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  },
});

// Upload img files
export const uploadImage = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const upload = imageStore.array("images");

  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json(err.message);
    } else if (err) {
      if (err === "filetype") {
        return res.status(400).json("Image files only!");
      }

      return res.status(500).json(err.message);
    }

    next();
  });
};

const checkFileType = (file: Express.Multer.File, cb: Function) => {
  const filetypes = /jpg|jpeg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);
  if (mimetype && extname) {
    return cb(null, true);
  }
  cb("filetype");
};
