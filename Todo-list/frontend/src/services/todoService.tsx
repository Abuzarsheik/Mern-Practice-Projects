import axios from "axios";

const pathname: string = "http://localhost:5000/api/todos";
const getToken = () => localStorage.getItem("token") || "";

export const fetchTodos = () =>
  axios.get(pathname, {
    headers: {
      authorization: `Bearer ${getToken() || ""}`,
    },
  });
export const addTodo = (title: string) => {
  return axios.post(
    pathname,
    { title },
    {
      headers: {
        authorization: `Bearer ${getToken() || ""}`,
      },
    }
  );
};

export const toggleTodo = (id: string, completed: boolean) => {
  return axios.put(
    `${pathname}/${id}`,
    {
      completed: !completed,
    },
    {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token") || ""}`,
      },
    }
  );
};

export const deleteTodo = (id: string) => {
  return axios.delete(`${pathname}/${id}`, {
    headers: {
      authorization: `Bearer ${localStorage.getItem("token") || ""}`,
    },
  });
};

export const updateTodo = (id: string, data: any) => {
  return axios.put(`${pathname}/${id} `, data, {
    headers: {
      authorization: `Bearer ${localStorage.getItem("token") || ""}`,
    },
  });
};
