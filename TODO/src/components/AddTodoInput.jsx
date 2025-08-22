import React from 'react';
import { Plus } from 'lucide-react';

function AddTodoInput({ inputValue, setInputValue, addTodo, error, setError, isDarkMode }) {
  return (
    <div className={`rounded-xl shadow-lg p-4 sm:p-6 mb-4 sm:mb-6 ${
      isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white'
    }`}>
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            if (error) setError('');
          }}
          onKeyDown={(e) => e.key === 'Enter' && addTodo()}
          placeholder="What needs to be done?"
          className={`flex-1 px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:ring-2 focus:border-transparent outline-none text-sm sm:text-base ${
            error 
              ? 'border-red-500 focus:ring-red-500' 
              : (isDarkMode 
                  ? 'border-gray-600 focus:ring-blue-500 bg-gray-700 text-white placeholder-gray-400' 
                  : 'border-gray-300 focus:ring-blue-500 bg-white text-gray-700 placeholder-gray-500'
                )
          }`}
        />
        <button
          onClick={addTodo}
          className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium transition-all flex items-center justify-center gap-2 transform hover:scale-105 hover:-translate-y-1 hover:shadow-lg active:scale-95 group text-sm sm:text-base ${
            isDarkMode 
              ? 'bg-blue-600 hover:bg-blue-700 text-white hover:shadow-blue-500/25' 
              : 'bg-blue-500 hover:bg-blue-600 text-white hover:shadow-blue-400/25'
          }`}
        >
          <Plus 
            size={18} 
            className="transition-all group-hover:rotate-90 group-hover:scale-110" 
          />
          <span className="group-hover:tracking-wide">Add</span>
        </button>
      </div>
      {error && (
        <div className={`mt-3 text-red-600 text-sm font-medium px-3 sm:px-4 py-2 rounded-lg ${
          isDarkMode ? 'bg-red-900/20 border border-red-800' : 'bg-red-50'
        }`}>
          {error}
        </div>
      )}
    </div>
  );
}

export default AddTodoInput;
