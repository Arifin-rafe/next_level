import express, {
  type Application,
  type Request,
  type Response,
} from "express";

import { pool } from "./db";
import { userRouter } from "./modules/user/user.route";
const app: Application = express();

app.use(express.json()); // for parsing application/json so that we can access req.body in our routes
app.use(express.text());
app.use(express.urlencoded({ extended: true })); // extended: true allows to send nested objects in the request body

app.get("/", (req: Request, res: Response) => {
  // res.send('Hello World!')
  res.status(200).json({
    message: "Hello World!",
    status: 200,
  });
});

app.use('/api/users', userRouter);

app.use("/api/users/:id", userRouter);

app.put("/api/users/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, password, age } = req.body;
  try {
    const result = await pool.query(
      `UPDATE users SET name = COALESCE($1, name),
       password = COALESCE($2, password), age = COALESCE($3, age), 
       updated_at = NOW() WHERE id = $4 RETURNING *`,
      [name, password, age, id],
    );
    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "User not found!",
      });
      return;
    }
    res.status(200).json({
      success: true,
      message: "User updated successfully!",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
});

app.delete("/api/users/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      `DELETE FROM users WHERE id = $1 RETURNING *`,
      [id],
    );
    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "User not found!",
      });
      return;
    }
    res.status(200).json({
      success: true,
      message: "User deleted successfully!",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
});

export default app;
