import { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import TaskList from './components/TaskList';

type Task = {
  id: number;
  text: string;
  completed: boolean;
};

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState('');
  const [filter, setFilter] = useState<'all' | 'completed' | 'pending'>('all');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    console.log('useEffect inicial rodando - carregando localStorage');
    try {
      const storedTasks = localStorage.getItem('tasks');
      console.log('Stored tasks from localStorage:', storedTasks);
      if (storedTasks) {
        const parsedTasks = JSON.parse(storedTasks);
        if (Array.isArray(parsedTasks)) {
          const validTasks = parsedTasks.filter((t: any) => 
            typeof t === 'object' && 
            typeof t.id === 'number' && 
            typeof t.text === 'string' && 
            typeof t.completed === 'boolean'
          ) as Task[];
          setTasks(validTasks);
          console.log('Loaded valid tasks:', validTasks);
        } else {
          console.error('Stored tasks is not an array:', parsedTasks);
        }
      }
      const storedTheme = localStorage.getItem('theme');
      console.log('Stored theme from localStorage:', storedTheme);
      if (storedTheme && (storedTheme === 'light' || storedTheme === 'dark')) {
        setTheme(storedTheme);
      }
    } catch (error) {
      console.error('Error parsing localStorage tasks:', error);
      localStorage.removeItem('tasks');
      localStorage.removeItem('theme');
    }
  }, []);

  useEffect(() => {
    try {
      console.log('Saving tasks to localStorage:', tasks);
      localStorage.setItem('tasks', JSON.stringify(tasks));
    } catch (error) {
      console.error('Error saving tasks to localStorage:', error);
    }
  }, [tasks]);

  useEffect(() => {
    console.log('Applying theme:', theme);
    console.log('HTML classList before:', document.documentElement.classList.toString());
    console.log('Body classList before:', document.body.classList.toString());
    localStorage.setItem('theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
      console.log('Added dark class. HTML classList:', document.documentElement.classList.toString());
      console.log('Added dark class. Body classList:', document.body.classList.toString());
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
      console.log('Removed dark class. HTML classList:', document.documentElement.classList.toString());
      console.log('Removed dark class. Body classList:', document.body.classList.toString());
    }
  }, [theme]);

  const addTask = useCallback(() => {
    if (newTask.trim() === '') return;
    const newTaskObj: Task = { id: Date.now(), text: newTask.trim(), completed: false };
    setTasks(prevTasks => [...prevTasks, newTaskObj]);
    setNewTask('');
  }, [newTask]);

  const toggleComplete = useCallback((id: number) => {
    setTasks(prevTasks => prevTasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  }, []);

  const deleteTask = useCallback((id: number) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  }, []);

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'pending') return !task.completed;
    return true;
  });

  const toggleTheme = useCallback(() => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 bg-white dark:bg-[#1f1f1f] transition-colors duration-300 min-h-screen">
      <div className="text-center mb-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white inline-block">To-Do List ({tasks.length})</h1>
      </div>
      <div className="sm:flex justify-end mb-4 hidden sm:block">
        <button
          onClick={toggleTheme}
          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800 dark:text-white"
        >
          Toggle Theme
        </button>
      </div>
      <div className="fixed bottom-4 right-4 sm:hidden">
        <button
          onClick={toggleTheme}
          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800 dark:text-white"
        >
          Toggle Theme
        </button>
      </div>
      <div className="flex flex-col sm:flex-row mb-4 max-w-sm mx-auto justify-center">
        <input
          type="text"
          value={newTask}
          onChange={e => setNewTask(e.target.value)}
          onKeyPress={e => e.key === 'Enter' && addTask()}
          className="w-full sm:w-64 p-2 border border-gray-300 dark:border-gray-500 rounded-l bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none mb-2 sm:mb-0"
          placeholder="Add a new task..."
        />
        <button
          onClick={addTask}
          className="w-full sm:w-auto p-2 bg-green-500 text-white rounded-r hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700"
        >
          Add
        </button>
      </div>
      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 justify-center mb-4">
        <button
          onClick={() => setFilter('all')}
          className={`px-3 py-1 rounded ${filter === 'all' ? 'font-bold bg-blue-500 text-white dark:bg-blue-600 dark:text-white' : 'text-gray-500 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'}`}
        >
          All
        </button>
        <button
          onClick={() => setFilter('completed')}
          className={`px-3 py-1 rounded ${filter === 'completed' ? 'font-bold bg-blue-500 text-white dark:bg-blue-600 dark:text-white' : 'text-gray-500 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'}`}
        >
          Completed
        </button>
        <button
          onClick={() => setFilter('pending')}
          className={`px-3 py-1 rounded ${filter === 'pending' ? 'font-bold bg-blue-500 text-white dark:bg-blue-600 dark:text-white' : 'text-gray-500 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'}`}
        >
          Pending
        </button>
      </div>
      <TaskList
        tasks={filteredTasks}
        toggleComplete={toggleComplete}
        deleteTask={deleteTask}
      />
    </div>
  );
}

export default App;