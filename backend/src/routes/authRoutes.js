const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Verificar si el correo electrónico ya está en uso
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "El correo electrónico ya está en uso" });
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Registrar el usuario
    User.register(username, email, hashedPassword, (err) => {
      if (err) {
        return res.status(400).json({ error: "Error al registrar el usuario" });
      }
      res.status(201).json({ message: "Usuario registrado exitosamente" });
    });
  } catch (error) {
    res.status(500).json({ error: "Error en el servidor" });
  }
});
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  console.log("Datos recibidos:", { email, password }); // Log para depuración

  try {
    const user = await User.findByEmail(email);
    if (!user) {
      console.log("Usuario no encontrado"); // Log para depuración
      return res
        .status(400)
        .json({ error: "Correo electrónico no encontrado" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("Contraseña incorrecta"); // Log para depuración
      return res.status(400).json({ error: "Contraseña incorrecta" });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h"
      }
    );

    console.log("Token generado:", token); // Log para depuración
    res.json({ token, username: user.username });
  } catch (error) {
    console.error("Error en el servidor:", error); // Log para depuración
    res.status(500).json({ error: "Error en el servidor" });
  }
});

module.exports = router;
