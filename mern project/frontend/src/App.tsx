import { useState } from "react";
import Todos from "./pages/todo";
import Register from "./pages/register";
import Login from "./pages/Login";

function App() {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem("token"));
  const [showRegister, setShowRegister] = useState<boolean>(false);

  if (!loggedIn) {
    return showRegister ? (
      <Register
        onRegister={() => setLoggedIn(true)}
        switchToLogin={() => setShowRegister(false)}
      />
    ) : (
      <Login
        onLogin={() => setLoggedIn(true)}
        switchToRegister={() => setShowRegister(true)}
      />
    );
  }
  return <Todos onLogout={() => setLoggedIn(false)} />;
}

export default App;
