import { useState } from "react";

interface Props {
  onAdd: (title: string) => void;
}

export default function TodoInput({ onAdd }: Props) {
  const [title, setTitle] = useState("");

  const handleAdd = () => {
    if (!title) return;
    onAdd(title);
    setTitle("");
  };

  return (
    <div>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add new todo"
      />
      <button onClick={handleAdd}>Add</button>
    </div>
  );
}
