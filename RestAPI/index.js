import express from "express";

const app = express();

app.use(express.json());

let users = [
  {
    id: 1,
    name: "pragya",
    email: "prachi@gmail.com",
  },
];

// GET - Get all users
app.get("/users", (req, res) => {
  res.json(users);
});

// POST - Create a new user
app.post("/users", (req, res) => {
  const user = {
    id: users.length + 1,
    name: req.body.name,
    email: req.body.email,
  };

  users.push(user);
  res.json(user);
});

// PUT - Update a user by ID
app.put("/users/:id", (req, res) => {
  const user = users.find((u) => u.id === Number(req.params.id));

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  user.name = req.body.name;
  user.email = req.body.email;

  res.json({
    message: "User updated successfully",
    user: user,
  });
});

// Start server
app.listen(8000, () => {
  console.log("Server is running on http://localhost:8000");
});
