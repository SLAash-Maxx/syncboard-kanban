import React from 'react';
import TaskCard from './TaskCard';

function Column({ title, status, tasks, onDeleteTask, onStatusChange, onEditTask }) {
  const columnTasks = tasks.filter((task) => task.status === status);

  return (
    <div className="column">
      <div className="column-header">
        <h2>{title}</h2>
        <span className="task-count">{columnTasks.length}</span>
      </div>

      <div className="task-list">
        {columnTasks.length === 0 ? (
          <p className="empty-column-text">No tasks available</p>
        ) : (
          columnTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onDeleteTask={onDeleteTask}
              onStatusChange={onStatusChange}
              onEditTask={onEditTask}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default Column;