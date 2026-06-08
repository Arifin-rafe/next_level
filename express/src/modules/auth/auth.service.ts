import bcrypt from "bcryptjs";
import { pool } from "../../db";
import jwt from "jsonwebtoken";
import config from "../../config";

const loginUserIntoDB = async (payload: {
  email: string;
  password: string;
}) => {
  const { email, password } = payload;
  const userData = await pool.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);

  if (userData.rows.length === 0) {
    throw new Error("User not found with the given email");
  }
  const user = userData.rows[0];
  const matchedPassword = await bcrypt.compare(password, user.password);
  if (!matchedPassword) {
    throw new Error("Invalid password");
  }

  // generate token
  const jwtpayload = {
    id: user.id,
    name: user.name,
    is_active: user.is_active,
    email: user.email,
  };
  const accessToken = jwt.sign(jwtpayload, config.secret as string, {
    expiresIn: "1d",
  });
    return {accessToken};
};

export const authService = {
  loginUserIntoDB,
};
