const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.createTodo = async (req, res) => {
  const { task } = req.body;
  const user = req.user

  if (!task || typeof task !== "string" || task.trim() === "") {
    return res.status(400).json({ error: "Task is required and must be a non-empty string" });
  }

  try {
    const newTodo = await prisma.todos.create({
      data: { task,userId:"" },
    });
    return res.status(201).json({ id: newTodo.id, message: "Todo is created" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getAllTodos = async (req, res) => {
  console.log("hello ")
  try {
    const todos = await prisma.todos.findMany();
    console.log("Fetched todos:", todos);  

    if (!todos) {
      return res.status(404).json({ message: "No todos found" });
    }
    
    return res.status(200).json({ todos });
  } catch (err) {
    console.error("Error fetching todos:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};


exports.updateTodo = async (req, res) => {
  const { id } = req.params;
  const { task, completed } = req.body;

  if (!task && completed === undefined) {
    return res.status(400).json({ error: "At least one field (task or completed) must be provided for update" });
  }

  try {
    const todoItem = await prisma.todos.findUnique({
      where: { id: parseInt(id) },
    });

    if (!todoItem) return res.status(404).json({ message: "Todo not found" });

    const updatedData = await prisma.todos.update({
      where: { id: parseInt(id) },
      data: { task, completed },
    });

    return res.status(200).json({ message: "Todo is updated", todo: updatedData });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.deleteTodo = async (req, res) => {
  const { id } = req.params;

  try {
    const todoItem = await prisma.todos.findUnique({
      where: { id: parseInt(id) },
    });

    if (!todoItem) return res.status(404).json({ message: "Todo not found" });

    await prisma.todos.delete({
      where: { id: parseInt(id) },
    });

    return res.status(200).json({ message: "Todo is deleted" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
