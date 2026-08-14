import React from 'react';

const FilterBar = ({
  searchQuery,
  setSearchQuery,
  filterPriority,
  setFilterPriority,
  filterTag,
  setFilterTag,
  availableTags = [],
  sortBy,
  setSortBy,
}) => {
  return (
    <div className="filter-bar">
      <div className="filter-group">
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />

        <select
          value={filterPriority}
          onChange={(e) => setFilterPriority(e.target.value)}
          className="filter-select"
        >
          <option value="ALL">All Priorities</option>
          <option value="HIGH">High</option>
          <option value="MEDIUM">Medium</option>
          <option value="LOW">Low</option>
        </select>

        <select
          value={filterTag}
          onChange={(e) => setFilterTag(e.target.value)}
          className="filter-select"
        >
          <option value="ALL">All Tags</option>
          {availableTags.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="filter-select"
        >
          <option value="DEFAULT">Default Order</option>
          <option value="DUE_DATE_ASC">Due Date (Earliest)</option>
          <option value="DUE_DATE_DESC">Due Date (Latest)</option>
          <option value="PRIORITY">Priority (High to Low)</option>
        </select>
      </div>
    </div>
  );
};

export default FilterBar;
