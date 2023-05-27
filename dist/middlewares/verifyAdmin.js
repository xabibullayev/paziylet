"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAdmin = void 0;
const verifyAdmin = (req, res, next) => {
    const user = req.user;
    if (user && user.isAdmin) {
        // If the user is an admin, call the next middleware function in the chain
        next();
    }
    else {
        // If the user is not an admin, return an error response
        res.status(403).json("Unauthorized");
    }
};
exports.verifyAdmin = verifyAdmin;
