const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = User.create(name, email, hashedPassword);
    res.status(201).json({ id: userId, name, email });
  } catch (err) {
    if (err.message.includes("UNIQUE constraint failed")) {
      return res.status(409).json({ error: "Email already exists" });
    }
    res.status(500).json({ error: "Server error" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = User.findByEmail(email);

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: "1h"
  });
  res.json({ token });
};

module.exports = { register, login };
