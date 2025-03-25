import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface DecodedUser {
  id: string;
  isAdmin: boolean;
}

export interface CustomRequest extends Request {
  user?: DecodedUser;
}

export const authMiddleware = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];

    try {
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET as string
      ) as DecodedUser;

      req.user = {
        id: decoded.id,
        isAdmin: decoded.isAdmin,
      };

      next();
    } catch (error) {
      res.status(401).json({ message: "Invalid or expired token" });
      return;
    }
  } else {
    res.status(401).json({ message: "Authorization token missing" });
    return;
  }
};
