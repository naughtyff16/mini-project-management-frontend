import { useEffect, useState } from "react";
import { getProjectsApi, createProjectApi } from "../api/projectApi";
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [projectName, setProjectName] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const res = await getProjectsApi();
      setProjects(res.data.data);
    } catch {
      toast.error("Failed to load projects");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleCreate = async () => {
    if (!projectName) return toast.error("Enter project name");

    try {
      await createProjectApi({ projectName });
      toast.success("Project created");
      setProjectName("");
      fetchProjects();
    } catch {
      toast.error("Failed to create project");
    }
  };

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6">Your Projects</h1>

      <div className="flex gap-3 mb-8">
        <input
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          placeholder="Enter project name"
          className="flex-1 border p-3 rounded-lg"
        />
        <button
          onClick={handleCreate}
          className="bg-blue-600 text-white px-6 rounded-lg hover:bg-blue-700"
        >
          Create
        </button>
      </div>

      {loading ? (
        <div className="text-center mt-10">
          <div className="animate-spin rounded-full h-10 w-10 border-4 border-blue-500 border-t-transparent mx-auto"></div>
        </div>
      ) : projects.length === 0 ? (
        <div className="text-gray-500 text-center mt-10">
          No projects yet. Create your first project above.
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project._id}
              onClick={() => navigate(`/project/${project._id}`)}
              className="bg-white p-6 rounded-xl shadow hover:shadow-xl cursor-pointer transition"
            >
              <h3 className="text-lg font-semibold">{project.projectName}</h3>
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
};

export default Dashboard;
