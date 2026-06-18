import { JwtPayload } from 'jsonwebtoken';
declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload; // You can replace 'any' with your user type
    }
  }
}