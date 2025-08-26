import { useState } from "react";
import Modal from "react-modal";
import { updateTodo } from "../services/todoService";

interface Todo {
  _id: string;
  title: string;
  completed: boolean;
}

interface Props {
  todos: Todo[];
  onToggle: (id: string, completed: boolean) => void;
  onDelete: (id: string) => void;
  loadTodos: () => void;
}

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

export default function TodoList({
  todos,
  onToggle,
  onDelete,
  loadTodos,
}: Props) {
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const [singleTodo, setSingleTodo] = useState<any>({});
  const [title, setTitle] = useState<string>(singleTodo.title);

  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }

  function handleUpdate(todo: any) {
    setIsOpen(true);
    setSingleTodo(todo);
    setTitle(todo.title);
  }

  async function handleSubmit() {
    try {
      const res = await updateTodo(singleTodo._id, { title });
      console.log(res);
      setIsOpen(false);
      loadTodos();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <ul>
        {todos.map((todo) => (
          <li key={todo._id}>
            <span
              onClick={() => onToggle(todo._id, todo.completed)}
              style={{ textDecoration: todo.completed ? "line-through" : "" }}
            >
              {todo.title}
            </span>
            <button onClick={() => onDelete(todo._id)}>❌</button>
            <button onClick={() => handleUpdate(todo)}>Edit</button>
          </li>
        ))}
      </ul>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={openModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Todo Modal"
      >
        <button onClick={closeModal}>close</button>
        <div>
          <div>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <button onClick={handleSubmit}>Submit</button>
          </div>
        </div>
      </Modal>
    </>
  );
}
