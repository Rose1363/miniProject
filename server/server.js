import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const users = [
  { username: "admin", password: "123456", name: "Administrator" },
  { username: "monika", password: "geller", name: "Monika Geller" },
];

app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);

  if (user) return res.json({ success: true, user });
  return res.status(401).json({ success: false, message: "Invalid credentials" });
});

app.get("/api/users", (req, res) => {
  res.json([
    { firstName: "Rachel", lastName: "Green", age: 28 },
    { firstName: "Ross", lastName: "Geller", age: 30 },
    { firstName: "Joey", lastName: "Tribbiani", age: 32 }
  ]);
});

app.listen(4000, () => console.log("Server running on http://localhost:4000"));
