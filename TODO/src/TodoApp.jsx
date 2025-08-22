import React, { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import Header from './components/Header';
import AddTodoInput from './components/AddTodoInput';
import StatsAndFilters from './components/StatsAndFilters';
import TodoList from './components/TodoList';
import Footer from './components/Footer';

function TodoApp() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  const [inputValue, setInputValue] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState('');
  const [filter, setFilter] = useState('all');
  const [error, setError] = useState('');
  const [editError, setEditError] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const vibrateKeyframes = `
    @keyframes vibrate {
      0% { transform: translateX(0); }
      10% { transform: translateX(-2px); }
      20% { transform: translateX(2px); }
      30% { transform: translateX(-2px); }
      40% { transform: translateX(2px); }
      50% { transform: translateX(-1px); }
      60% { transform: translateX(1px); }
      70% { transform: translateX(-1px); }
      80% { transform: translateX(1px); }
      90% { transform: translateX(-1px); }
      100% { transform: translateX(0); }
    }
    .vibrate-btn { animation: vibrate 0.5s linear infinite both; animation-delay: 2s; }
    .vibrate-btn:hover { animation: none; transform: scale(1.05) translateY(-4px); }
    @media (max-width: 640px) { .vibrate-btn:hover { transform: scale(1.02) translateY(-2px); } }
  `;

  const addTodo = () => {
    const trimmedInput = inputValue.trim();
    if (!trimmedInput) {
      setError('Please enter a task');
      setTimeout(() => setError(''), 3000);
      return;
    }
    if (todos.some(todo => todo.text.toLowerCase() === trimmedInput.toLowerCase())) {
      setError('This task already exists!');
      setTimeout(() => setError(''), 3000);
      return;
    }
    const newTodo = {
      id: Date.now(),
      text: trimmedInput,
      status: 'pending',
      createdAt: new Date().toLocaleString()
    };
    setTodos([newTodo, ...todos]);
    setInputValue('');
    setError('');
  };

  const deleteTodo = (id) => setTodos(todos.filter(todo => todo.id !== id));

  const toggleStatus = (id) => {
    setTodos(todos.map(todo => {
      if (todo.id === id) {
        let nextStatus =
          todo.status === 'pending' ? 'active' :
          todo.status === 'active' ? 'completed' : 'pending';
        return { ...todo, status: nextStatus };
      }
      return todo;
    }));
  };

  const startEdit = (id, text) => { setEditingId(id); setEditValue(text); };
  const cancelEdit = () => { setEditingId(null); setEditValue(''); setEditError(''); };

  const saveEdit = (id) => {
    const trimmedEdit = editValue.trim();
    if (!trimmedEdit) {
      setEditError('Please enter a task');
      setTimeout(() => setEditError(''), 3000);
      return;
    }
    if (todos.some(todo => todo.id !== id && todo.text.toLowerCase() === trimmedEdit.toLowerCase())) {
      setEditError('This task already exists!');
      setTimeout(() => setEditError(''), 3000);
      return;
    }
    setTodos(todos.map(todo => todo.id === id ? { ...todo, text: trimmedEdit } : todo));
    cancelEdit();
  };

  const filteredTodos = todos.filter(todo =>
    filter === 'pending' ? todo.status === 'pending' :
    filter === 'active' ? todo.status === 'active' :
    filter === 'completed' ? todo.status === 'completed' : true
  );

  const pendingCount = todos.filter(t => t.status === 'pending').length;
  const activeCount = todos.filter(t => t.status === 'active').length;
  const completedCount = todos.filter(t => t.status === 'completed').length;

  return (
    <>
      <style>{vibrateKeyframes}</style>
      <div className={`min-h-screen py-4 px-3 transition-all duration-500 ${
        isDarkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'
      }`}>
        <div className={`max-w-3xl mx-auto rounded-2xl p-4 shadow-2xl border transition-all duration-500 ${
          isDarkMode ? 'bg-gray-800/90 border-gray-700/50' : 'bg-white/80 border-white/30'
        }`}>
          <div className="flex justify-end mb-3">
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-2 rounded-full transition-all duration-300 transform hover:scale-110 ${
                isDarkMode ? 'bg-yellow-400 text-gray-900' : 'bg-gray-800 text-white'
              }`}
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>

          <Header isDarkMode={isDarkMode} />
          <AddTodoInput {...{ inputValue, setInputValue, addTodo, error, setError, isDarkMode }} />
          <StatsAndFilters {...{ pendingCount, activeCount, completedCount, filter, setFilter, isDarkMode, showFilters, setShowFilters }} />
          <TodoList {...{ filteredTodos, editingId, editValue, setEditValue, editError, saveEdit, cancelEdit, toggleStatus, startEdit, deleteTodo, isDarkMode }} />

          {completedCount > 0 && (
            <div className="mt-4 text-center">
              <button onClick={() => setTodos(todos.filter(t => t.status !== 'completed'))}
                className={`py-2 px-4 rounded-lg text-sm ${
                  isDarkMode ? 'text-red-400 hover:bg-red-900/20' : 'text-red-600 hover:bg-red-50'
                }`}>
                Clear {completedCount} completed task{completedCount !== 1 ? 's' : ''}
              </button>
            </div>
          )}

          <Footer isDarkMode={isDarkMode} />
        </div>
      </div>
    </>
  );
}
export default TodoApp;
