import TaskItem from './TaskItem';
   type TaskListProps = {
     tasks: Task[];
     toggleComplete: (id: number) => void;
     deleteTask: (id: number) => void;
   };

   function TaskList({ tasks, toggleComplete, deleteTask }: TaskListProps) {
     return (
       <ul className="list-none p-0">
         {tasks.map(task => (
           <TaskItem
             key={task.id}
             task={task}
             toggleComplete={toggleComplete}
             deleteTask={deleteTask}
           />
         ))}
       </ul>
     );
   }

   export default TaskList;