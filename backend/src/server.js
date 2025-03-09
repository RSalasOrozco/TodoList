require("dotenv").config(); // Cargar variables de entorno
const express = require("express");
const cors = require("cors");
const authRoutes = require("../src/routes/authRoutes");
const taskRoutes = require("../src/routes/taskRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use("/api/auth", authRoutes);
app.use("/api", taskRoutes);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
});
