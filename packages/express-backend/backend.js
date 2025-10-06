// backend.js
import express from "express";
import cors from "cors";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

// Generate random ID: 3 letters + 3 digits
const generateRandomID = () => {
  const letters = "abcdefghijklmnopqrstuvwxyz";
  let id = "";

  for (let i = 0; i < 3; i++) {
    id += letters.charAt(Math.floor(Math.random() * letters.length));
  }

  id += Math.floor(Math.random() * 1000).toString().padStart(3, "0");

  return id;
};

const users = {
  users_list: [
    { id: "xyz789", name: "Charlie", job: "Janitor" },
    { id: "abc123", name: "Mac", job: "Bouncer" },
    { id: "ppp222", name: "Mac", job: "Professor" },
    { id: "yat999", name: "Dee", job: "Aspring actress" },
    { id: "zap555", name: "Dennis", job: "Bartender" },
  ],
};

// Helper functions
const findUserByName = (name) => users.users_list.filter((user) => user.name === name);
const findUserById = (id) => users.users_list.find((user) => user.id === id);

// GET all users (with optional filters)
app.get("/users", (req, res) => {
  const { name, job } = req.query;
  let result = users.users_list;

  if (name) result = result.filter((user) => user.name === name);
  if (job) result = result.filter((user) => user.job === job);

  res.send({ users_list: result });
});

// GET user by ID
app.get("/users/:id", (req, res) => {
  const user = findUserById(req.params.id);
  if (!user) return res.status(404).send("Resource not found.");
  res.send(user);
});

// POST new user
app.post("/users", (req, res) => {
  const userToAdd = req.body;
  userToAdd.id = generateRandomID(); // <-- Use new ID generator
  users.users_list.push(userToAdd);
  res.status(201).send(userToAdd); // send the created user
});

// DELETE user by ID
app.delete("/users/:id", (req, res) => {
  const id = req.params.id;
  const user = findUserById(id);
  if (!user) return res.status(404).send("User not found");

  users.users_list = users.users_list.filter((u) => u.id !== id);
  res.status(204).send();
});

// DELETE user by name and job (optional)
app.delete("/users", (req, res) => {
  const { name, job } = req.query;
  const userToDelete = users.users_list.find((u) => u.name === name && u.job === job);
  if (!userToDelete) return res.status(404).send("User not found");

  users.users_list = users.users_list.filter((u) => u.id !== userToDelete.id);
  res.status(204).send();
});

// Root route
app.get("/", (req, res) => {
  res.send("Hello World! Have a good day!");
});

// Start server
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
