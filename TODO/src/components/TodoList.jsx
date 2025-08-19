import { Edit2, Trash2, Check, X } from 'lucide-react';


function TodoList({
  filteredTodos,
  editingId,
  editValue,
  setEditValue,
  editError,
  saveEdit,
  cancelEdit,
  toggleStatus,
  startEdit,
  deleteTodo,
  isDarkMode
}) {
  if (filteredTodos.length === 0) {
    return (
      <div className={`rounded-xl shadow-lg p-8 sm:p-12 text-center ${
        isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white'
      }`}>
        <div className={`mb-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-400'}`}>
          <Check size={40} className="mx-auto sm:w-12 sm:h-12" />
        </div>
        <h3 className={`text-base sm:text-lg font-medium mb-2 ${
          isDarkMode ? 'text-gray-300' : 'text-gray-500'
        }`}>
          No todos found
        </h3>
        <p className={`text-sm sm:text-base ${isDarkMode ? 'text-gray-400' : 'text-gray-400'}`}>
          Add a new todo to get started!
        </p>
      </div>
    );
  }

  return (
    <div className={`rounded-xl shadow-lg overflow-hidden ${
      isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white'
    }`}>
      <div className={`${isDarkMode ? 'divide-gray-700' : 'divide-gray-100'} divide-y`}>
        {filteredTodos.map(todo => (
          <div
            key={todo.id}
            className={`p-3 sm:p-4 transition-colors duration-200 ${
              todo.status === 'completed'
                ? (isDarkMode ? 'bg-gray-700' : 'bg-gray-50')
                : todo.status === 'active'
                ? (isDarkMode ? 'bg-blue-900/20' : 'bg-blue-50')
                : (isDarkMode 
                    ? 'bg-gray-800 hover:bg-gray-700' 
                    : 'bg-white hover:bg-gray-50'
                  )
            }`}
          >
            <div className="flex items-start sm:items-center gap-3">
              {/* Status Toggle */}
              <button
                onClick={() => toggleStatus(todo.id)}
                className={`flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 flex items-center justify-center transition-all duration-200 text-xs font-bold mt-0.5 sm:mt-0 ${
                  todo.status === 'completed'
                    ? 'bg-green-500 border-green-500 text-white'
                    : todo.status === 'active'
                    ? 'bg-blue-500 border-blue-500 text-white'
                    : (isDarkMode 
                        ? 'border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-gray-900' 
                        : 'border-yellow-500 text-yellow-600 hover:bg-yellow-500 hover:text-white'
                      )
                }`}
                title={`Status: ${todo.status.charAt(0).toUpperCase() + todo.status.slice(1)}`}
              >
                {todo.status === 'completed' ? (
                  <Check size={14} />
                ) : todo.status === 'active' ? (
                  'A'
                ) : (
                  'P'
                )}
              </button>

              {/* Todo Content */}
              <div className="flex-1 min-w-0">
                {editingId === todo.id ? (
                  <div className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="text"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && saveEdit(todo.id)}
                      className={`flex-1 px-2 sm:px-3 py-1 sm:py-2 border rounded-md focus:ring-2 focus:border-transparent outline-none text-sm ${
                        editError 
                          ? 'border-red-500 focus:ring-red-500' 
                          : (isDarkMode 
                              ? 'border-gray-600 focus:ring-blue-500 bg-gray-700 text-white' 
                              : 'border-gray-300 focus:ring-blue-500 bg-white text-gray-900'
                            )
                      }`}
                      autoFocus
                    />
                    <div className="flex gap-1 sm:gap-2 self-start">
                      <button
                        onClick={() => saveEdit(todo.id)}
                        className="text-green-600 hover:text-green-700 p-1 sm:p-2"
                        title="Save"
                      >
                        <Check size={14} />
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="text-red-600 hover:text-red-700 p-1 sm:p-2"
                        title="Cancel"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                      <p className={`text-sm sm:text-base break-words ${
                        todo.status === 'completed'
                          ? (isDarkMode ? 'line-through text-gray-400' : 'line-through text-gray-500')
                          : (isDarkMode ? 'text-white' : 'text-gray-800')
                      }`}>
                        {todo.text}
                      </p>
                      <span className={`text-xs px-2 py-1 rounded-full font-medium self-start sm:self-center ${
                        todo.status === 'completed'
                          ? 'bg-green-100 text-green-800'
                          : todo.status === 'active'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {todo.status.charAt(0).toUpperCase() + todo.status.slice(1)}
                      </span>
                    </div>
                    <p className={`text-xs mt-1 ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-400'
                    }`}>
                      Created: {todo.createdAt}
                    </p>
                  </div>
                )}
                {editError && editingId === todo.id && (
                  <div className={`mt-2 text-red-600 text-sm font-medium px-2 sm:px-3 py-1 rounded ${
                    isDarkMode ? 'bg-red-900/20 border border-red-800' : 'bg-red-50'
                  }`}>
                    {editError}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              {editingId !== todo.id && (
                <div className="flex gap-1 sm:gap-2 self-start">
                  <button
                    onClick={() => startEdit(todo.id, todo.text)}
                    className={`p-1 sm:p-2 rounded-md transition-colors duration-200 ${
                      isDarkMode 
                        ? 'text-blue-400 hover:text-blue-300 hover:bg-gray-700'
                        : 'text-blue-600 hover:text-blue-700 hover:bg-blue-50'
                    }`}
                    title="Edit"
                  >
                    <Edit2 size={14} />
                  </button>
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className={`p-1 sm:p-2 rounded-md transition-colors duration-200 ${
                      isDarkMode 
                        ? 'text-red-400 hover:text-red-300 hover:bg-gray-700'
                        : 'text-red-600 hover:text-red-700 hover:bg-red-50'
                    }`}
                    title="Delete"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default TodoList;

