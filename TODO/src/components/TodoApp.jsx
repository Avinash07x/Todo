import React, { useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import Header from './Header';
import AddTodoInput from './AddTodoInput';
import StatsAndFilters from './StatsAndFilters';
import TodoList from './TodoList';
import Footer from './Footer';

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState('');
  const [filter, setFilter] = useState('all');
  const [error, setError] = useState('');
  const [editError, setEditError] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  // CSS keyframes for vibrate animation
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
    
    .vibrate-btn {
      animation: vibrate 0.5s linear infinite both;
      animation-delay: 2s;
    }
    
    .vibrate-btn:hover {
      animation: none;
      transform: scale(1.05) translateY(-4px);
    }

    @media (max-width: 640px) {
      .vibrate-btn:hover {
        transform: scale(1.02) translateY(-2px);
      }
    }
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

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const toggleStatus = (id) => {
    setTodos(todos.map(todo => {
      if (todo.id === id) {
        let nextStatus;
        switch (todo.status) {
          case 'pending':
            nextStatus = 'active';
            break;
          case 'active':
            nextStatus = 'completed';
            break;
          case 'completed':
            nextStatus = 'pending';
            break;
          default:
            nextStatus = 'pending';
        }
        return { ...todo, status: nextStatus };
      }
      return todo;
    }));
  };

  const startEdit = (id, text) => {
    setEditingId(id);
    setEditValue(text);
  };

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
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, text: trimmedEdit } : todo
    ));
    setEditingId(null);
    setEditValue('');
    setEditError('');
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditValue('');
    setEditError('');
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'pending') return todo.status === 'pending';
    if (filter === 'active') return todo.status === 'active';
    if (filter === 'completed') return todo.status === 'completed';
    return true;
  });

  const pendingCount = todos.filter(todo => todo.status === 'pending').length;
  const activeCount = todos.filter(todo => todo.status === 'active').length;
  const completedCount = todos.filter(todo => todo.status === 'completed').length;

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <>
      <style>{vibrateKeyframes}</style>
      <div
        className={`min-h-screen py-4 sm:py-8 px-3 sm:px-4 transition-all duration-500 ${
          isDarkMode 
            ? 'bg-gray-900' 
            : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'
        }`}
      >
        <div className={`max-w-xs sm:max-w-lg lg:max-w-2xl xl:max-w-3xl mx-auto rounded-2xl sm:rounded-3xl p-3 sm:p-6 shadow-2xl border transition-all duration-500 ${
          isDarkMode
            ? 'bg-gray-800/90 border-gray-700/50 backdrop-blur-sm'
            : 'backdrop-blur-sm bg-white/80 border-white/30'
        }`}>

          {/* Dark/Light Mode Toggle */}
          <div className="flex justify-end mb-3 sm:mb-4">
            <button
              onClick={toggleDarkMode}
              className={`p-2 sm:p-3 rounded-full transition-all duration-300 transform hover:scale-110 active:scale-95 ${
                isDarkMode
                  ? 'bg-yellow-400 text-gray-900 hover:bg-yellow-300 shadow-lg hover:shadow-yellow-400/50'
                  : 'bg-gray-800 text-white hover:bg-gray-700 shadow-lg hover:shadow-gray-800/50'
              }`}
              title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5 sm:w-6 sm:h-6" />
              ) : (
                <Moon className="w-5 h-5 sm:w-6 sm:h-6" />
              )}
            </button>
          </div>

          <Header isDarkMode={isDarkMode} />

          <AddTodoInput
            inputValue={inputValue}
            setInputValue={setInputValue}
            addTodo={addTodo}
            error={error}
            setError={setError}
            isDarkMode={isDarkMode}
          />

          <StatsAndFilters
            pendingCount={pendingCount}
            activeCount={activeCount}
            completedCount={completedCount}
            filter={filter}
            setFilter={setFilter}
            isDarkMode={isDarkMode}
            showFilters={showFilters}
            setShowFilters={setShowFilters}
          />

          <TodoList
            filteredTodos={filteredTodos}
            editingId={editingId}
            editValue={editValue}
            setEditValue={setEditValue}
            editError={editError}
            saveEdit={saveEdit}
            cancelEdit={cancelEdit}
            toggleStatus={toggleStatus}
            startEdit={startEdit}
            deleteTodo={deleteTodo}
            isDarkMode={isDarkMode}
          />

          {completedCount > 0 && (
            <div className="mt-4 sm:mt-6 text-center">
              <button
                onClick={() => setTodos(todos.filter(todo => todo.status !== 'completed'))}
                className={`font-medium py-2 px-4 rounded-lg transition-colors duration-200 text-sm sm:text-base ${
                  isDarkMode 
                    ? 'text-red-400 hover:text-red-300 hover:bg-red-900/20' 
                    : 'text-red-600 hover:text-red-700 hover:bg-red-50'
                }`}
              >
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