import type { Request, Response, NextFunction } from "express";
import config from "../config";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { pool } from "../db";
const auth = (... roles: any) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    console.log(roles);
    try {
      const token = req.headers.authorization;
      if (!token) {
        res.status(401).json({
          success: false,
          message: "Unauthorized: No token provided",
        });
      }
      const decoded = jwt.verify(
        token as string,
        config.secret as string,
      ) as JwtPayload;
      // console.log("Decoded token:", decoded);
      const userData = await pool.query(
        `SELECT * FROM users WHERE email = $1`,
        [decoded.email],
      );
      // console.log("User data:", userData);
      // console.log("User data:", userData.rows[0]);
      const user = userData.rows[0];
      if (userData.rowCount === 0) {
        res.status(404).json({
          success: false,
          message: "Unauthorized access: User not found",
        });
      }
      if (!user?.is_active) {
        res.status(403).json({
          success: false,
          message: "Forbidden: User account is inactive",
        });
      }
      console.log("User data:", user);
      req.user = decoded;
      next();
    } catch (error) {
      next(error);
    }
  };
};

export default auth;
