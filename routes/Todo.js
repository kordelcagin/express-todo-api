const express = require("express");
const router = express.Router();

const {
  createTodo,
  getTodo,
  deleteTodo,
  getAllTodos,
  updateTodo,
} = require("../controllers/Todo");

router.get("/list", getAllTodos);
router.get("/:id", getTodo);
router.post("/", createTodo);
router.put("/", updateTodo);
router.delete("/", deleteTodo);

module.exports = router;
