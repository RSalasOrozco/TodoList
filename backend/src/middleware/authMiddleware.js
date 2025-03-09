const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  // Obtener el token del encabezado de la solicitud
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res
      .status(401)
      .json({ error: "Acceso denegado. No se proporcionó un token." });
  }

  try {
    // Verificar el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id; // Agregar el ID del usuario a la solicitud
    next(); // Continuar con la siguiente función middleware
  } catch (error) {
    res.status(400).json({ error: "Token inválido." });
  }
};

module.exports = authMiddleware;
