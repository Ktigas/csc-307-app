// backend.js
import express from "express";
import cors from "cors";
import userServices from "./user-services.js";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

// --- Routes ---

// GET all users (with optional filters: name, job, or both)
app.get("/users", (req, res) => {
  const { name, job } = req.query;

  userServices
    .getUsers(name, job) // handles name, job, or both
    .then((users) => {
      // Map _id to id for frontend
      const usersWithId = users.map((u) => ({ ...u.toObject(), id: u._id }));
      res.json({ users_list: usersWithId });
    })
    .catch((err) => {
      console.error("Error retrieving users:", err);
      res.status(500).json({ error: "Error retrieving users" });
    });
});

// GET user by ID
app.get("/users/:id", (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ error: "User ID is required" });

  userServices
    .findUserById(id)
    .then((user) => {
      if (!user) return res.status(404).json({ error: "User not found" });
      // Map _id to id for frontend
      res.json({ ...user.toObject(), id: user._id });
    })
    .catch((err) => {
      console.error("Error retrieving user:", err);
      res.status(500).json({ error: "Error retrieving user" });
    });
});

// POST new user
app.post("/users", (req, res) => {
  const userToAdd = req.body;

  userServices
    .addUser(userToAdd)
    .then((newUser) =>
      res.status(201).json({ ...newUser.toObject(), id: newUser._id })
    )
    .catch((err) => {
      console.error("Error adding user:", err);
      res.status(500).json({ error: "Error adding user" });
    });
});

// DELETE user by ID
app.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ error: "User ID is required" });

  userServices
    .deleteUserById(id)
    .then((deletedUser) => {
      if (!deletedUser) return res.status(404).json({ error: "User not found" });
      res.json({ message: "User deleted successfully" });
    })
    .catch((err) => {
      console.error("Error deleting user:", err);
      res.status(500).json({ error: "Error deleting user" });
    });
});

// DELETE user by name and job
app.delete("/users", (req, res) => {
  const { name, job } = req.query;
  if (!name || !job)
    return res.status(400).json({ error: "Please provide both name and job" });

  userServices
    .findUserByNameAndJob(name, job)
    .then((user) => {
      if (!user) return res.status(404).json({ error: "User not found" });
      return userServices.deleteUserById(user._id);
    })
    .then(() => res.json({ message: "User deleted successfully" }))
    .catch((err) => {
      console.error("Error deleting user:", err);
      res.status(500).json({ error: "Error deleting user" });
    });
});

// Root route
app.get("/", (req, res) => {
  res.send("Hello World! Have a good day!");
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
