type Task = {
  id: number;
  text: string;
  completed: boolean;
};

type TaskItemProps = {
  task: Task;
  toggleComplete: (id: number) => void;
  deleteTask: (id: number) => void;
};

function TaskItem({ task, toggleComplete, deleteTask }: TaskItemProps) {
  return (
    <li className="flex items-center p-3 border-b border-gray-200 dark:border-gray-500 last:border-b-0">
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => toggleComplete(task.id)}
        className="mr-3 h-4 w-4"
      />
      <span className={`flex-1 ${task.completed ? 'line-through text-gray-500 dark:text-gray-400' : 'text-gray-900 dark:text-white'}`}>
        {task.text}
      </span>
      <button
        onClick={() => deleteTask(task.id)}
        className="text-red-500 hover:text-red-700 dark:text-red-300 dark:hover:text-red-200"
      >
        Delete
      </button>
    </li>
  );
}

export default TaskItem;