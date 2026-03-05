import TaskCard from "./TaskCard";

const TaskList = ({ tasks, changeStatus, removeTask }) => {
  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <TaskCard
          key={task._id}
          task={task}
          changeStatus={changeStatus}
          removeTask={removeTask}
        />
      ))}
    </div>
  );
};

export default TaskList;
