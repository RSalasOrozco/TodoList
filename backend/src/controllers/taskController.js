const {
  createTask,
  getTasksByUser,
  updateTask,
  completeTask,
  deleteTask
} = require("../models/Task");

// Crear una nueva tarea
const createTaskHandler = (req, res) => {
  const { userId, description } = req.body;
  createTask(userId, description, (err) => {
    if (err) {
      return res.status(400).json({ error: "Error al crear la tarea" });
    }
    res.status(201).json({ message: "Tarea creada exitosamente" });
  });
};

// Obtener las tareas de un usuario
const getTasksHandler = (req, res) => {
  const { userId } = req.params;
  getTasksByUser(userId, (err, tasks) => {
    if (err) {
      return res.status(400).json({ error: "Error al obtener las tareas" });
    }
    res.json({ tasks });
  });
};

// Marcar una tarea como completada
const completeTaskHandler = (req, res) => {
  const { taskId } = req.params;
  completeTask(taskId, (err) => {
    if (err) {
      return res.status(400).json({ error: "Error al completar la tarea" });
    }
    res.json({ message: "Tarea completada exitosamente" });
  });
};

// Actualizar una tarea
const updateTaskHandler = (req, res) => {
  const { taskId } = req.params;
  const { description, date, time } = req.body;
  updateTask(taskId, description, date, time, (err) => {
    if (err) {
      return res.status(400).json({ error: "Error al actualizar la tarea" });
    }
    res.json({ message: "Tarea actualizada exitosamente" });
  });
};

// Eliminar una tarea
const deleteTaskHandler = (req, res) => {
  const { taskId } = req.params;
  deleteTask(taskId, (err) => {
    if (err) {
      return res.status(400).json({ error: "Error al eliminar la tarea" });
    }
    res.json({ message: "Tarea eliminada exitosamente" });
  });
};

module.exports = {
  createTaskHandler,
  getTasksHandler,
  updateTaskHandler,
  completeTaskHandler,
  deleteTaskHandler
};
