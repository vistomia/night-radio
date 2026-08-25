import { Router } from "express";

const userRouter = Router();

userRouter.get("/users", (req, res) => {
  res.json({ message: "ola usuario" });
});

export default userRouter;
