import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import fs from "fs";
import { pool } from "./db";
import { userRouter } from "./modules/user/user.route";
import { profileRoute } from "./modules/profile/profile.route";
import { authRoute } from "./modules/auth/auth.route";
import logger from "./middleware/logger";
const app: Application = express();

app.use(express.json()); // for parsing application/json so that we can access req.body in our routes
app.use(express.text());
app.use(express.urlencoded({ extended: true })); // extended: true allows to send nested objects in the request body

app.use(logger);

app.get("/", (req: Request, res: Response) => {
  // res.send('Hello World!')
  res.status(200).json({
    message: "Hello World!",
    status: 200,
  });
});

app.use("/api/users", userRouter);
app.use("/api/profile", profileRoute);
app.use("/api/auth", authRoute);

export default app;
