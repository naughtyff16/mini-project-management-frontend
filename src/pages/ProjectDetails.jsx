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

const ProjectDetails = () => {
  const { id } = useParams();
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await getTasksApi(id);
      setTasks(res.data.data);
    } catch {
      toast.error("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAdd = async () => {
    if (!title) return toast.error("Enter task title");

    await addTaskApi({ title, projectId: id });
    setTitle("");
    fetchTasks();
  };

  const changeStatus = async (taskId, status) => {
    await updateTaskApi(taskId, { status });
    fetchTasks();
  };

  const removeTask = async (taskId) => {
    await deleteTaskApi(taskId);
    toast.success("Task deleted");
    fetchTasks();
  };

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6">Project Tasks</h1>

      <div className="flex gap-3 mb-8">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="New task"
          className="flex-1 border p-3 rounded-lg"
        />
        <button
          onClick={handleAdd}
          className="bg-green-600 text-white px-6 rounded-lg"
        >
          Add
        </button>
      </div>

      {loading ? (
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-blue-500 border-t-transparent mx-auto"></div>
      ) : tasks.length === 0 ? (
        <div className="text-gray-500">No tasks yet. Add one above.</div>
      ) : (
        <div className="space-y-4">
          {tasks.map((task) => (
            <div
              key={task._id}
              className="bg-white p-4 rounded-lg shadow flex justify-between items-center"
            >
              <div>
                <h3 className="font-semibold">{task.title}</h3>
                <p className="text-sm text-gray-500">Status: {task.status}</p>
              </div>

              <div className="flex gap-2">
                <select
                  value={task.status}
                  onChange={(e) => changeStatus(task._id, e.target.value)}
                  className="border rounded p-1"
                >
                  <option value="todo">Todo</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>

                <button
                  onClick={() => removeTask(task._id)}
                  className="text-red-500"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
};

export default ProjectDetails;
