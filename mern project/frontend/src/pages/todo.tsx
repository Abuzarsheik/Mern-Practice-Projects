import { useEffect, useState } from "react";
import {
  fetchTodos,
  addTodo,
  toggleTodo,
  deleteTodo,
} from "../services/todoService.tsx";
import TodoInput from "../components/TodoInput.tsx";
import TodoList from "../components/TodoList.tsx";

interface Todo {
  _id: string;
  title: string;
  completed: boolean;
}

export default function Todos({ onLogout }: { onLogout: () => void }) {
  const [todos, setTodos] = useState<Todo[]>([]);

  const loadTodos = async ( ) => {
    try {
      const res = await fetchTodos();
      setTodos(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    loadTodos();
  }, []);

  const handleAdd = async (title: string) => {
    try {
      const res = await addTodo(title);
      setTodos([...todos, res.data]);
    } catch (err) {
      console.log(err);
    }
  };

  const handleToggle = async (id: string, completed: boolean) => {
    try {
      const res = await toggleTodo(id, completed);
      setTodos(todos.map((todo) => (todo._id === id ? res.data : todo)));
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteTodo(id);
      setTodos(todos.filter((todo) => todo._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="App">
      <h1>MERN To-Do List</h1>
      <TodoInput onAdd={handleAdd} />
      <TodoList todos={todos} onToggle={handleToggle} onDelete={handleDelete} loadTodos={loadTodos} />
      <button
        onClick={() => {
          localStorage.removeItem("token");
          onLogout();
        }}
      >
        Logout
      </button>
    </div>
  );
}
