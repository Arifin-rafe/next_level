import express, {
  type Application,
  type Request,
  type Response,
} from "express";

import { pool } from "./db";
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
app.post("/api/users", async (req: Request, res: Response) => {
  // console.log(req.body)
  const { name, email, password, age } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO users (name, email, password,age) VALUES ($1, $2, $3,$4) RETURNING *`,
      [name, email, password, age],
    );
    console.log(name, email, password, age);
    res.status(201).json({
      message: "User created successfully!",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
      error: error,
    });
  }
});

app.get("/api/users", async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`SELECT * FROM users`);
    res.status(200).json({
      success: true,
      message: "Users fetched successfully!",
      data: result.rows,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
});

app.get("/api/users/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await pool.query(`SELECT * FROM users WHERE id = $1`, [id]);
    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "User not found!",
      });
      return;
    }
    res.status(200).json({
      success: true,
      message: "User fetched successfully!",
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
