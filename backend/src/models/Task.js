const db = require("../config/db");

// Crear la tabla de tareas
db.run(`
  
  CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    description TEXT NOT NULL,
    date TEXT NOT NULL,
    time TEXT NOT NULL,
    completed INTEGER DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES users(id))`);

// Función para crear una tarea
const createTask = (userId, description, date, time, callback) => {
  const query = `INSERT INTO tasks (user_id, description) VALUES (?, ?)`;
  db.run(query, [userId, description, date, time], callback);
};

// Función para obtener las tareas de un usuario
const getTasksByUser = (userId, callback) => {
  const query = `SELECT * FROM tasks WHERE user_id = ?`;
  db.all(query, [userId], callback);
};

// Función para actualizar una tarea
const updateTask = (taskId, description, date, time, callback) => {
  const query = `UPDATE tasks SET description = ?, date = ?, time = ? WHERE id = ?`;
  db.run(query, [description, date, time, taskId], callback);
};

// Función para marcar una tarea como completada
const completeTask = (taskId, callback) => {
  const query = `UPDATE tasks SET completed = 1 WHERE id = ?`;
  db.run(query, [taskId], callback);
};

// Función para eliminar una tarea
const deleteTask = (taskId, callback) => {
  const query = `DELETE FROM tasks WHERE id = ?`;
  db.run(query, [taskId], callback);
};

module.exports = {
  createTask,
  getTasksByUser,
  updateTask,
  completeTask,
  deleteTask
};
