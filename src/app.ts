import express from "express";
import userRouter from "./routes/users.router.js";

const app = express();

const route = express.Router();

app.use(express.json());

route.get("/", (req, res) => {
  res.json({ message: "opa mundo" });
});

app.use(route);
app.use(userRouter);

export default app;
