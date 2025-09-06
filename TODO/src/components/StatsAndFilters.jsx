import React from "react";
import { Filter } from "lucide-react";

function StatsAndFilters({ pendingCount, activeCount, completedCount, filter, setFilter, isDarkMode, showFilters, setShowFilters }) {
  return (
    <div className={`rounded-xl shadow-lg p-4 sm:p-6 mb-4 sm:mb-6 ${
      isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white'
    }`}>
      {/* Stats and Filter Toggle */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className={`text-xs sm:text-sm w-full sm:w-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          <div className="flex flex-wrap gap-2 sm:gap-4">
            <span><span className="font-medium">{pendingCount}</span> pending</span>
            <span><span className="font-medium">{activeCount}</span> active</span>
            <span><span className="font-medium">{completedCount}</span> completed</span>
          </div>
        </div>
        
        {/* Mobile Filter Toggle */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`sm:hidden flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition-colors duration-200 ${
            isDarkMode 
              ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          <Filter size={16} />
          <span className="text-sm">Filter</span>
        </button>

        {/* Desktop Filters */}
        <div className="hidden sm:flex gap-2">
          {['all', 'pending', 'active', 'completed'].map(filterType => (
            <button
              key={filterType}
              onClick={() => setFilter(filterType)}
              className={`px-3 lg:px-4 py-2 rounded-lg font-medium capitalize transition-colors duration-200 text-sm ${
                filter === filterType
                  ? (isDarkMode 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-blue-500 text-white'
                    )
                  : (isDarkMode 
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    )
              }`}
            >
              {filterType}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile Filters */}
      {showFilters && (
        <div className="sm:hidden mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-2 gap-2">
            {['all', 'pending', 'active', 'completed'].map(filterType => (
              <button
                key={filterType}
                onClick={() => {
                  setFilter(filterType);
                  setShowFilters(false);
                }}
                className={`px-3 py-2 rounded-lg font-medium capitalize transition-colors duration-200 text-sm ${
                  filter === filterType
                    ? (isDarkMode 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-blue-500 text-white'
                      )
                    : (isDarkMode 
                        ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      )
                }`}
              >
                {filterType}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
export default StatsAndFilters;