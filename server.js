const express = require("express");
const app = express();

/* Si quiero leer el body de un JSON debo entrar esta linea:*/
app.use(express.json());

let dB = [
  {
    id: 1,
    name: "eduard",
  },
  {
    id: 2,
    name: "javi",
  },
  {
    id: 3,
    name: "daniel",
  },
];

app.get("/users/:id", (req, res) => {
  const requestedId = Number(req.params.id);
  const requestedUser = dB.find((user) => user.id === requestedId);
  res.send(requestedUser);
});

app.get("/users", (req, res) => {
  const uName = req.query.name;
  const requestedUser = dB.find((user) => user.name === uName);
  if (uName) res.send(requestedUser);
  else res.send(dB);
});

app.post("/users", (req, res) => {
  const newUser = req.body;
  dB.push(newUser);
  res.send(dB);
});

app.put("/users/:id", (req, res) => {
  const requestedId = Number(req.params.id);
  const requestedUser = dB.find((user) => user.id === requestedId);
  const newUser = req.body;

  requestedUser.name = newUser.name;

  res.send(dB);
});

app.delete("/users/:id", (req, res) => {
  const requestedId = Number(req.params.id);
  dB = dB.filter((user) => user.id !== requestedId);
  res.send(dB);
});

app.listen(3000, () => console.log("Server is up and running"));
