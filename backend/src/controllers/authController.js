const { register, findByUsername } = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Registrar un nuevo usuario
const registerUser = async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  register(username, hashedPassword, (err) => {
    if (err) {
      return res.status(400).json({ error: "El usuario ya existe" });
    }
    res.status(201).json({ message: "Usuario registrado exitosamente" });
  });
};

// Iniciar sesión
const loginUser = async (req, res) => {
  const { username, password } = req.body;

  findByUsername(username, async (err, user) => {
    if (err || !user) {
      return res.status(400).json({ error: "Usuario no encontrado" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Contraseña incorrecta" });
    }

    // Generar token JWT
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h"
    });

    res.json({ token });
  });
};

module.exports = { registerUser, loginUser };
