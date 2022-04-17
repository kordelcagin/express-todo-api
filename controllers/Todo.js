const Todo = require("../models/Todo");

exports.getAllTodos = async (req, res) => {
  Todo.find()
    .sort("-createdAt")
    .exec((err, todos) => {
      if (err || !todos) {
        return res.status(400).json({
          status: false,
          error: "Something went wrong in finding all todos",
        });
      }
      res.json({ status: true, data: todos });
    });
};

exports.getTodo = async (req, res) => {
  const { id } = req.params;
  Todo.findById(id).exec((err, todo) => {
    if (err || !todo) {
      return res.status(400).json({
        status: false,
        error: "404 todo not found",
      });
    }
    res.json({ status: true, data: todo });
  });
};

exports.createTodo = async (req, res) => {
  const todo = new Todo(req.body);
  todo.save((err, task) => {
    if (err || !task) {
      return res.status(400).json({
        status: false,
        error: "something went wrong",
      });
    }
    res.json({ status: true, data: task });
  });
};

exports.updateTodo = async (req, res) => {
  const { id, task } = req.body;
  Todo.findByIdAndUpdate(id, { task: task }, { new: true }, (err, t) => {
    if (err || !t) {
      return res.status(400).json({
        status: false,
        error: "something went wrong while updating",
      });
    }
    res.json({ status: true, data: t });
  });
};

exports.deleteTodo = async (req, res) => {
  const { id } = req.body;
  Todo.findByIdAndRemove(id, (err, task) => {
    if (err || !task) {
      return res.status(400).json({
        status: false,
        error: "something went wrong while deleting the todo",
      });
    }
    res.json({ status: true, data: task });
  });
};
