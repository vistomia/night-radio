import express from "express";

const app = express();

const route = express.Router();

app.use(express.json());

route.get("/", (req, res) => {
  res.json({ message: "opa mundo" });
});

app.use(route);

app.listen(3000, () => {
  console.log("ligou");
});

export default app;
