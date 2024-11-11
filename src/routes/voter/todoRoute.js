const express = require("express");
const todoRoutes = express.Router();
const todoController = require("../../controllers/todo"); // Corrected path

todoRoutes.post("/create", todoController.createTodo);
todoRoutes.get("/getAll", todoController.getAllTodos);
todoRoutes.patch("/update/:id", todoController.updateTodo);
todoRoutes.delete("/delete/:id", todoController.deleteTodo);

module.exports = { todoRoutes };
