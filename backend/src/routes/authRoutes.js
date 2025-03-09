const express = require("express");
const authController = require("../controllers/authController");

const router = express.Router();

// Ruta para registrar un usuario
router.post("/register", authController.registerUser);

// Ruta para iniciar sesión
router.post("/login", authController.loginUser);

module.exports = router;
