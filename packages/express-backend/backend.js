import express from "express";

const app = express();
const port = 8000;

const users = {
  users_list: [
    { id: "xyz789", name: "Charlie", job: "Janitor" },
    { id: "abc123", name: "Mac", job: "Bouncer" },
    { id: "ppp222", name: "Mac", job: "Professor" },
    { id: "yat999", name: "Dee", job: "Aspring actress" },
    { id: "zap555", name: "Dennis", job: "Bartender" },
    { id: "qwe123", name: "Cindy", job: "Zookeeper" }
  ]
};


const findUserByName = (name) => {
  return users["users_list"].filter((user) => user["name"] === name);
};

const findUsersByNameAndJob = (name, job) => {
  return users["users_list"].filter(
    (user) => user["name"] === name && user["job"] === job
  );
};

const findUserById = (id) => {
  return users["users_list"].find((user) => user["id"] === id);
};

const addUser = (user) => {
  users["users_list"].push(user);
  return user;
};

const deleteUserById = (id) => {
  const index = users["users_list"].findIndex((user) => user["id"] === id);
  if (index !== -1) {
    users["users_list"].splice(index, 1);
    return true;
  }
  return false;
};


app.use(express.json());


app.get("/", (req, res) => {
  res.send("Hello World! Have a good day!");
});

app.get("/users", (req, res) => {
  const { name, job } = req.query;

  let result;
  if (name && job) {
    result = findUsersByNameAndJob(name, job);
  } else if (name) {
    result = findUserByName(name);
  } else {
    result = users["users_list"];
  }

  res.send({ users_list: result });
});

app.get("/users/:id", (req, res) => {
  const id = req.params["id"];
  const result = findUserById(id);

  if (result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    res.send(result);
  }
});

app.post("/users", (req, res) => {
  const userToAdd = req.body;
  addUser(userToAdd);
  res.status(201).send();
});

app.delete("/users/:id", (req, res) => {
  const id = req.params["id"];
  const success = deleteUserById(id);

  if (success) {
    res.status(204).send(); // No Content
  } else {
    res.status(404).send("User not found.");
  }
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
