import { useState } from "react";
import { login } from "../services/authService";

interface Props {
  onLogin: () => void;
  switchToRegister: () => void;
}

export default function Login({ onLogin, switchToRegister }: Props) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const res = await login(email, password);
      localStorage.setItem("token", res.data.token);
      onLogin();
    } catch (e: any) {
      setError(e.response?.data?.error || "Login Failed");
    }
  }

  return (
    <div>
      <h2>Login</h2>
      {error ? <p style={{ backgroundColor: "red" }}>{error} </p> : null}
      <form onSubmit={handleSubmit}>
        <input
          value={email}
          type="email"
          placeholder="xyz.com"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          value={password}
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      <button type="button" onClick={switchToRegister}>
        {" "}
        Dont have an account? Register
      </button>
    </div>
  );
}
