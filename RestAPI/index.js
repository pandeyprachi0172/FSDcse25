import express from "express";

const app = express();

app.use(express.json());

let users = [
  {
    id: 1,
    name: "prachi",
    email: "prachia@gmail.com"
  }
];

app.get("/users", (req, res) => {
  res.json(users);
});

// POST request to create a new user
app.post("/users", (req, res) => {
  const user = {
    id: users.length + 1,
    name: req.body.name,
    email: req.body.email,
  };

  users.push(user);
  res.json(user);
});

// PUT request to update a user by ID
app.put("/users/:id", (req, res) => {
  let user = users.find(u => u.id === Number(req.params.id));

  if (!user) {
    return res.status(404).send("User not found");
  }

  user.name = req.body.name;
  user.email = req.body.email;

  res.send("User updated successfully");
});

// DELETE request to delete a user by ID
app.delete("/users/:id", (req, res) => {
  let userIndex = users.findIndex(
    u => u.id === Number(req.params.id)
  );

  if (userIndex === -1) {
    return res.status(404).send("User not found");
  }

  users.splice(userIndex, 1);

  res.send("User deleted successfully");
});

app.listen(8000, () => {
  console.log("Server is running on http://localhost:8000");
});
