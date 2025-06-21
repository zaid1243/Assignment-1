import express from "express";
const app = express();

app.use(express.json());
const api = [];

app.get("/user", (req, res) => {
  const { name, age } = req.body;
  if (!name || !age) {
    return res.status(400).send({ message: "enter name as well age" });
  }
  if (typeof name !== "string" || typeof age !== "number") {
    return res.send({
      message: "invalid input The name must string and age must be number",
    });
  }

  const isSame = api.find((user) => user.name === name);
  if (isSame) {
    return res.send({
      message: "the username already exists try another name",
    });
  }
  api.push({ name, age });
  res
    .status(200)
    .send({ user: `new user with name ${name} age ${age}`, users: api });
});

app.get("/", (req, res) => {
  res.send("heeloo");
});

app.listen(3000, () => {
  console.log("the server is running on port 3000");
});
