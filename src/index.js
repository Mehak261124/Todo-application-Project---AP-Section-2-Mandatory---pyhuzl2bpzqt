const express = require("express");
const bodyParser = require("body-parser");
const { prisma } = require("../db/config");

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.get("/", (_, res) => {
  res.send("hello world");
});

app.post("/create", async (req, res) => {
  const { task } = req.body;

  if (!task) {
    return res.status(400).json({ error: "Task is required" });
  }

  try {
    const newTodo = await prisma.todos.create({
      data: {
        task,
      },
    });

    return res.status(201).json({ id: newTodo.id, message: "Todo is created" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/getAll", async (req,res) => {
  const { id,task,completed } = req.body;
  try{
    const result = await prisma.todos.findMany({
      data: {
        id,task,completed
      }
    })
    return res.status(200).json({todos: result})
  } catch(err){
    console.error(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
})

app.patch("/update/:id",async (req,res) => {
  const {id} = req.params;
  const { task,completed } = req.body;
  try{
    if(!id || !task || !completed){
      return res.status(400).json({ message: "No fields provided to update" });
    }
    const todoItem = await prisma.todos.findUnique({
      where :{id : parseInt(id)}
    });
    if(!todoItem){
      return res.status(404).json({ message: "Todo not found" });
    }
    const updatedData = await prisma.todos.update({
      where:{id : parseInt(id)},
      OR: [{task: task},{completed: completed}],
      data: req.body,
    })
    return res.status(200).json({message: "Todo is updated",
      todo: {
        updatedData
      }
    })
  }catch(err){
    console.error(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
})

app.delete("/delete/:id", async(req,res) => {
  const {id} = req.params;

  try{
    const todoItem = await prisma.todos.findUnique({
      where :{id : parseInt(id)}
    });
    if(!todoItem){
      return res.status(404).json({ "message": "Todo not found" });
    }

    const deleteData = await prisma.todos.delete({
      where :{id : parseInt(id)}
    })
    return res.status(200).json({message: "Todo is Deleted"});
  }catch(err){
    console.error(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }

})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

module.exports = app;
