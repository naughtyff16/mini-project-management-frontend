import instance from "./axios";

export const getProjectsApi = () => instance.get("/projects");

export const createProjectApi = (data) => instance.post("/projects", data);

export const updateProjectApi = (id, data) =>
  instance.put(`/projects/${id}`, data);

export const deleteProjectApi = (id) => instance.delete(`/projects/${id}`);
