import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import { Pool } from "pg";
const app: Application = express();
const port = 5000;

app.use(express.json()); // for parsing application/json so that we can access req.body in our routes
app.use(express.text());
app.use(express.urlencoded({ extended: true })); // extended: true allows to send nested objects in the request body

const pool = new Pool({
  connectionString:
    "postgresql://neondb_owner:npg_doZCwaVn1tm4@ep-calm-sound-apd1dng0-pooler.c-7.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require",
});

const initDB = async () => {
  try {
    await pool.query(`CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  is_active BOOLEAN DEFAULT true,
  age INT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  deleted_at TIMESTAMP
);`);
    console.log("Database connected successfully");
  } catch (error) {
    console.log(error);
  }
};

initDB();
app.get("/", (req: Request, res: Response) => {
  // res.send('Hello World!')
  res.status(200).json({
    message: "Hello World!",
    status: 200,
  });
});
app.post("/", async (req: Request, res: Response) => {
  // console.log(req.body)
  const { name, email, password,age } = req.body;
  const result = await pool.query(
    `INSERT INTO users (name, email, password,age) VALUES ($1, $2, $3,$4) RETURNING *`,[name, email, password,age]
  );
  console.log(name, email, password,age);
  res.status(201).json({
    message: "Created successfully!",
    status: 201,
    data: { name, email, password,age },

  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
