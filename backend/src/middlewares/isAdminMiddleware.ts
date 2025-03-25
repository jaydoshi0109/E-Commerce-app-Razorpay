import {  Response, NextFunction } from "express";
import { CustomRequest} from "./authMiddleware";

export const isAdminMiddleware = (
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ) => {
    if (req.user && req.user.isAdmin) {
      next(); // Allow access
    } else {
      res.status(403).json({ message: "Access denied: Admins only" });
    }
  };