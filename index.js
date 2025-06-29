import express from "express";
const app = express();

app.use(express.json());

const api = [];

app.get("/user", (req, res, next) => {
  try {
    const { name, age } = req.body;
    if (!name || !age) {
      let err = new Error("enter name as well age");
      err.status = 400;
      throw err;
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
    res.status(200).send({
      user: `new user with name ${name} age ${age}`,
      users: api,
    });
  } catch (err) {
    next(err);
  }
});

app.get("/", (req, res) => {
  res.send("helllllow");
});

// ------- global error handler --------
app.use((err, req, res, next) => {
  console.log("Caught error:", err.message);
  res
    .status(err.status || 500)
    .send({ error: err.message || "something went wrong" });
});

app.listen(3000, () => {
  console.log("the server is running on port 3000");
});
