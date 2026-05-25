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
app.get("/", (req: Request, res: Response) => {
  // res.send('Hello World!')
  res.status(200).json({
    message: "Hello World!",
    status: 200,
  });
});
app.post("/", async (req: Request, res: Response) => {
  // console.log(req.body)
  const { name, email, password } = req.body;
  res.status(201).json({
    message: "Created successfully!",
    status: 201,
    data: { name, email, password },
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
