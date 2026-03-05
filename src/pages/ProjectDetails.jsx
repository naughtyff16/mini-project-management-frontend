import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import {
  getTasksApi,
  addTaskApi,
  updateTaskApi,
  deleteTaskApi,
} from "../api/taskApi";
import toast from "react-hot-toast";

import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import TaskFilter from "../components/TaskFilter";
import Pagination from "../components/Pagination";

const ProjectDetails = () => {
  const { id } = useParams();

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [statusFilter, setStatusFilter] = useState("");

  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "medium",
    status: "todo",
    dueDate: "",
  });

  // Fetch Tasks
  const fetchTasks = async () => {
    try {
      setLoading(true);

      const res = await getTasksApi(id, page, statusFilter);

      setTasks(res.data.data);
      setTotalPages(res.data.meta.totalPages);
    } catch (err) {
      console.log(err);
      toast.error("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  // Handle input change
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Add Task
  const handleAdd = async () => {
    if (!form.title) {
      return toast.error("Title is required");
    }

    try {
      await addTaskApi({
        ...form,
        projectId: id,
      });

      toast.success("Task created");

      setPage(1);

      setForm({
        title: "",
        description: "",
        priority: "medium",
        status: "todo",
        dueDate: "",
      });

      fetchTasks();
    } catch (err) {
      toast.error("Failed to create task");
    }
  };

  // Change Status
  const changeStatus = async (taskId, status) => {
    try {
      await updateTaskApi(taskId, { status });
      fetchTasks();
    } catch {
      toast.error("Failed to update task");
    }
  };

  // Delete Task
  const removeTask = async (taskId) => {
    try {
      await deleteTaskApi(taskId);
      toast.success("Task deleted");
      fetchTasks();
    } catch {
      toast.error("Delete failed");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [page, statusFilter]);

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6">Project Tasks</h1>

      {/* CREATE TASK FORM */}
      <TaskForm form={form} handleChange={handleChange} handleAdd={handleAdd} />

      {/* STATUS FILTER */}
      <TaskFilter
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        setPage={setPage}
      />

      {/* TASK LIST */}
      {loading ? (
        <div className="flex justify-center py-10">
          <div className="animate-spin rounded-full h-10 w-10 border-4 border-blue-500 border-t-transparent"></div>
        </div>
      ) : tasks.length === 0 ? (
        <p className="text-gray-500">No tasks found</p>
      ) : (
        <TaskList
          tasks={tasks}
          changeStatus={changeStatus}
          removeTask={removeTask}
        />
      )}

      {/* PAGINATION */}
      <Pagination page={page} totalPages={totalPages} setPage={setPage} />
    </Layout>
  );
};

export default ProjectDetails;
