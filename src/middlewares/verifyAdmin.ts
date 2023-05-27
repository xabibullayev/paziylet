import { RequestHandler, Request, Response, NextFunction } from "express";

interface User {
  isAdmin: boolean;
  // add any other properties as needed
}

interface AuthenticatedRequest extends Request {
  user?: User;
}

export const verifyAdmin: RequestHandler = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const user = req.user;

  if (user && user.isAdmin) {
    // If the user is an admin, call the next middleware function in the chain
    next();
  } else {
    // If the user is not an admin, return an error response
    res.status(403).json("Unauthorized");
  }
};
