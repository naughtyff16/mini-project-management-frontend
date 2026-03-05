import instance from "./axios";

export const getTasksApi = (projectId, page = 1, status = "") =>
  instance.get(`/tasks/${projectId}?page=${page}&limit=5&status=${status}`);

export const addTaskApi = (data) => instance.post("/tasks", data);

export const updateTaskApi = (id, data) => instance.put(`/tasks/${id}`, data);

export const deleteTaskApi = (id) => instance.delete(`/tasks/${id}`);
