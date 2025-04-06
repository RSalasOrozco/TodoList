const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");

const app = express();
const PORT = 5000;

// Middlewares
app.use(cors()); // Permitir solicitudes desde el frontend
app.use(bodyParser.json()); // Parsear JSON

// Rutas
app.use("/api/auth", authRoutes);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});
