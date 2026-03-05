const TaskForm = ({ form, handleChange, handleAdd }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow mb-8 space-y-4">
      <input
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Task title"
        className="w-full border p-3 rounded"
      />

      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Description"
        className="w-full border p-3 rounded"
      />

      <div className="grid grid-cols-3 gap-4">
        <select
          name="priority"
          value={form.priority}
          onChange={handleChange}
          className="border p-2 rounded"
        >
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>

        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="border p-2 rounded"
        >
          <option value="todo">Todo</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>

        <input
          type="date"
          name="dueDate"
          value={form.dueDate}
          onChange={handleChange}
          className="border p-2 rounded"
        />
      </div>

      <button
        onClick={handleAdd}
        className="bg-green-600 text-white px-6 py-2 rounded-lg"
      >
        Add Task
      </button>
    </div>
  );
};

export default TaskForm;
