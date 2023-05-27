import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction, RequestHandler } from "express";

interface AuthenticatedRequest extends Request {
  user?: string | JwtPayload;
}

export const verifyUser: RequestHandler = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.access_token;

    if (!token) {
      return res.status(401).json("Unauthorized!");
    }

    const jwt_secret = process.env.JWT_SECRET;

    if (!jwt_secret) {
      console.log(new Error("jwt secret key env not found!"));
      return res.status(500).json("Server error!");
    }

    try {
      const user = jwt.verify(token, jwt_secret);

      req.user = user;

      next();
    } catch (err) {
      return res.status(403).json("Invalid token!");
    }
  } catch (err) {
    res.status(401).json("Unssfsfsdfs");
  }
};
