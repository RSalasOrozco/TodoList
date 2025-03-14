const { register, findByEmail } = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Registrar un nuevo usuario
const registerUser = (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);

  register(username, email, hashedPassword, (err) => {
    if (err) {
      return res
        .status(400)
        .json({ error: "El correo electrónico ya está en uso" });
    }
    res.status(201).json({ message: "Usuario registrado exitosamente" });
  });
};

// Iniciar sesión
const loginUser = (req, res) => {
  const { email, password } = req.body;

  findByEmail(email, (err, user) => {
    if (err || !user) {
      return res
        .status(400)
        .json({ error: "Correo electrónico no encontrado" });
    }

    const isMatch = bcrypt.compareSync(password, user.password);
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
