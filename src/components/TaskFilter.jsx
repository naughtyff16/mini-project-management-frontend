const TaskFilter = ({ statusFilter, setStatusFilter, setPage }) => {
  return (
    <div className="mb-6">
      <select
        value={statusFilter}
        onChange={(e) => {
          setPage(1);
          setStatusFilter(e.target.value);
        }}
        className="border p-2 rounded"
      >
        <option value="">All Tasks</option>
        <option value="todo">Todo</option>
        <option value="in-progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>
    </div>
  );
};

export default TaskFilter;
