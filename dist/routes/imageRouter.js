"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const imageController_1 = require("../controllers/imageController");
const router = (0, express_1.Router)();
router.post("/:name", imageController_1.deleteImage);
router.post("/:name", imageController_1.deleteImage);
exports.default = router;
