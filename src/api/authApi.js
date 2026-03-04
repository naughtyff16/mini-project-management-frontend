import instance from "./axios";

export const registerUser = (data) => instance.post("/auth/register", data);

export const loginUser = (data) => instance.post("/auth/login", data);
