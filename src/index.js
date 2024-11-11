const express = require("express");
const dotenv = require("dotenv");
const { todoRoutes } = require("./routes/voter/todoRoute");
const { authRoutes } = require("./routes/voter/auth");
const { verifyToken } = require("./middleware/verifyToken");
dotenv.config();


const app = express();
app.use(express.json());

app.get("/", (_, res) => {
  res.send("Hello World");
});

app.use("/api/auth", authRoutes);

app.use("/todo", verifyToken, todoRoutes);


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

module.exports = app;
