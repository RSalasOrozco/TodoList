const db = require("../db/database");
const bcrypt = require("bcryptjs");

// Registro de usuario
const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  try {
    // Verificar si el email ya existe
    db.get(
      "SELECT email FROM users WHERE email = ?",
      [email],
      async (err, row) => {
        if (err) {
          return res.status(500).json({ error: "Error en la base de datos" });
        }
        if (row) {
          return res.status(400).json({ error: "El email ya está registrado" });
        }

        // Hash de la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insertar nuevo usuario
        db.run(
          "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
          [name, email, hashedPassword],
          function (err) {
            if (err) {
              return res
                .status(500)
                .json({ error: "Error al registrar usuario" });
            }
            res.status(201).json({ message: "Usuario registrado con éxito" });
          }
        );
      }
    );
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

// Login de usuario
const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ error: "Email y contraseña son obligatorios" });
  }

  try {
    // Buscar usuario por email
    db.get(
      "SELECT * FROM users WHERE email = ?",
      [email],
      async (err, user) => {
        if (err) {
          return res.status(500).json({ error: "Error en la base de datos" });
        }
        if (!user) {
          return res.status(404).json({ error: "Usuario no encontrado" });
        }

        // Comparar contraseña con hash almacenado
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return res.status(401).json({ error: "Credenciales inválidas" });
        }

        // Éxito (en el futuro, aquí generaremos un JWT)
        res
          .status(200)
          .json({
            message: "Login exitoso",
            user: { id: user.id, name: user.name, email: user.email }
          });
      }
    );
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

module.exports = { register, login };
