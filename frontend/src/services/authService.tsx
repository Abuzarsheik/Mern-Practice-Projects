import axios from "axios";

const pathname = "http://localhost:5000/api/user";

export const register = (fullname: string, email: string, password: string) => {
  return axios.post(`${pathname}/register`, { fullname, email, password });
};

export const login = (email: string, password: string) => {
  return axios.post(`${pathname}/login`, { email, password });
};
