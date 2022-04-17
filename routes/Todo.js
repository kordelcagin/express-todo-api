const express = require("express");
const router = express.Router();

const {
  createTodo,
  getTodo,
  deleteTodo,
  getAllTodos,
  updateTodo,
} = require("../controllers/Todo");

router.get("/todos", getAllTodos);
router.get("/todo/:id", getTodo);
router.post("/todo", createTodo);
router.put("/todo", updateTodo);
router.delete("/todo", deleteTodo);

module.exports = router;
