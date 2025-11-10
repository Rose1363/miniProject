const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const PORT = 4000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

const users = [
  { id: 1, name: "Alice", email: "alice@example.com", role: "Admin" },
  { id: 2, name: "Bob", email: "bob@example.com", role: "Editor" },
  { id: 3, name: "Charlie", email: "charlie@example.com", role: "Viewer" }
];

app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  if (username === "admin" && password === "123456") {
    return res.json({
      success: true,
      user: { username, password, name: "Administrator" }
    });
  } else {
    return res.status(401).json({
      success: false,
      message: "Invalid credentials"
    });
  }
});

app.get("/api/users", (req, res) => res.json(users));

app.get("/home", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "home.html"));
});

app.listen(PORT, () => console.log(`✅ Server running at http://localhost:${PORT}`));
