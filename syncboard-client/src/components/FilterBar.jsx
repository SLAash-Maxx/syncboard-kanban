import React from 'react';

function FilterBar({ 
  searchTerm, 
  setSearchTerm, 
  priorityFilter, 
  setPriorityFilter, 
  sortBy, 
  setSortBy 
}) {
  return (
    <div className="filter-bar">
      <div className="search-box">
        <input
          type="text"
          placeholder="Search by title, description or tag..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="filter-controls">
        <div className="control-group">
          <label>Priority:</label>
          <select value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)}>
            <option value="All">All</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>

        <div className="control-group">
          <label>Sort By:</label>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="default">Default</option>
            <option value="dueDate">Due Date</option>
            <option value="priority">Priority (High to Low)</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default FilterBar;
