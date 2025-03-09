const express = require("express");
const taskController = require("../controllers/taskController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

// Middleware de autenticación
router.use(authMiddleware);

// Crear una tarea
router.post("/tasks", taskController.createTaskHandler);

// Obtener las tareas de un usuario
router.get("/tasks/:userId", taskController.getTasksHandler);

// Marcar una tarea como completada
router.put("/tasks/complete/:taskId", taskController.completeTaskHandler);

// Actualizar una tarea
router.put("/tasks/:taskId", taskController.updateTaskHandler);

// Eliminar una tarea
router.delete("/tasks/:taskId", taskController.deleteTaskHandler);

module.exports = router;
