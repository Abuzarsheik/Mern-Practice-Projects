import Todo from "../models/todos.model.js";

// @desc Get all todos
export const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user?.id });
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// @desc Create new todo
export const createTodo = async (req, res) => {
  try {
    const { title } = req.body;
    if (!title) {
      return res.status(400).send({ message: "Title is missing" });
    }
    const newTodo = new Todo({ title, user: req.user?.id });
    await newTodo.save();

    res.json(newTodo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// @desc Update todo
export const updateTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) return res.status(404).json({ message: "Todo not found" });
    if (todo.user?.toString() !== req.user?.id)
      return res.status(403).json({ message: "authorization failed" });

    const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updatedTodo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// @desc Delete todo
export const deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) return res.status(404).json({ message: "todo not found" });
    if (todo.user?.toString() !== req.user?.id)
      return res.status(403).json({ message: "authorization failed" });

    await Todo.findByIdAndDelete(req.params.id);
    res.json({ message: "Todo deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
