import express from "express";
import jwt from "jsonwebtoken";
import cors from "cors";

const app = express();
const port = 3000;

const privateKey = "This is a Secret key.";

app.use(cors());
app.use(express.json());

const users = [];

app.get("/", (req, res) => {
  res.send("Simple APIs");
});

app.listen(port, () => {
  console.log(`Sandbox listening on port ${port}`);
});

app.post("/signup", (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400).json({
      message: "All fields Required!",
    });
  }
  const existedUser = users.find((u) => u.email === email);
  if (existedUser) {
    return res.status(400).json({
      message: "User Already Registered!",
    });
  }
  const newUser = {
    id: users.length + 1,
    name: name,
    email: email,
    password: password,
  };
  users.push(newUser);
  console.log("-------------------------------");
  console.log(users);
  const { password: _, ...userWithoutPassword } = newUser;
  res.status(201).json({
    message: "User Signed up Successfully!",
    user: userWithoutPassword,
  });
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const getUser = users.find(
    (u) => u.email === email && u.password === password,
  );
  console.log("Found user", getUser);
  if (!getUser) {
    return res.status(401).json({
      message: "Invalid Credentials!",
    });
  }
  const token = jwt.sign({ email: email, id: getUser.id }, privateKey);
  if (token) {
    return res.status(200).json({
      message: "Login Successfull!",
      token: token,
    });
  }
});

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "Authorization header missing" });
  }
  const token = authHeader && authHeader.split(" ")[1];
  try {
    const payload = jwt.verify(token, privateKey);
    const { id, email } = payload;
    const existingUser = users.find(
      (user) => user.email === email && user.id === id,
    );
    if (!existingUser) {
      return res.status(401).json({ message: "Invalid token" });
    }
    req.user = { email, id };
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
}

app.get("/profile", authMiddleware, (req, res) => {
  res.status(200).json({ id: req.user.id, email: req.user.email });
});

// app.get("/profile", (req, res) => {
//   res.send("User Profile...");
//   console.log(users);
// });
