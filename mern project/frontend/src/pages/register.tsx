import { useState } from "react";
import { register } from "../services/authService";

interface Props {
  onRegister: () => void;
  switchToLogin: () => void;
}

export default function Register({ onRegister, switchToLogin }: Props) {
  const [fullname, setFullname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const res = await register(fullname, email, password);
      localStorage.setItem("token", res.data.token);
      onRegister();
    } catch (error: any) {
      setError(error.response?.data?.error || "Register Failed");
    }
  }

  return (
    <div>
      <h2>Register</h2>
      {error ? <p style={{ backgroundColor: "red" }}>{error}</p> : null}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={fullname}
          placeholder="name"
          onChange={(e) => setFullname(e.target.value)}
        />
        <input
          type="email"
          value={email}
          placeholder="xyz.com"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          value={password}
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      <button type="button" onClick={switchToLogin}>
        Already have an account? Log in
      </button>
    </div>
  );
}
