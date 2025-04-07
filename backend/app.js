require("dotenv").config();
const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const authenticate = require("./middlewares/authMiddleware");
const User = require("./models/User"); // Importación clave añadida

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas públicas
app.use("/api/auth", authRoutes);

// Ruta protegida
app.get("/api/profile", authenticate, (req, res) => {
  try {
    const user = User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({
      message: `Welcome ${user.name}`,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        joinedAt: user.createdAt
      }
    });
  } catch (err) {
    console.error("Error in /profile:", err);
    res.status(500).json({ error: err.message });
  }
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
