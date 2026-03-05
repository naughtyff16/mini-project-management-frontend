const priorityColor = {
  low: "text-green-500",
  medium: "text-yellow-500",
  high: "text-red-500",
};

const TaskCard = ({ task, changeStatus, removeTask }) => {
  return (
    <div className="bg-white p-5 rounded-lg shadow flex justify-between items-center">
      <div>
        <h3 className="font-semibold text-lg">{task.title}</h3>

        <p className="text-sm text-gray-500">{task.description}</p>

        <div className="text-xs text-gray-400 mt-2 space-x-4">
          <span>Status: {task.status}</span>

          <span className={priorityColor[task.priority]}>
            Priority: {task.priority}
          </span>

          {task.dueDate && (
            <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
          )}
        </div>
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

        <button onClick={() => removeTask(task._id)} className="text-red-500">
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
