import React from 'react';

function TaskCard({ task, onDeleteTask, onStatusChange, onEditTask }) {
  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'High':
        return 'priority-high';
      case 'Medium':
        return 'priority-medium';
      default:
        return 'priority-low';
    }
  };

  const isOverdue = (dueDateTime, status) => {
    if (!dueDateTime || status === 'done') return false;
    return new Date(dueDateTime) < new Date();
  };

  const formatDateTime = (dueDateTime) => {
    if (!dueDateTime) return null;
    const date = new Date(dueDateTime);
    return date.toLocaleString([], {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const overdue = isOverdue(task.dueDateTime, task.status);

  return (
    <div className="task-card">
      <div className="task-card-header">
        <span className={`priority-badge ${getPriorityClass(task.priority)}`}>
          {task.priority}
        </span>
        <div className="card-actions">
          <button className="edit-btn" onClick={() => onEditTask(task)} title="Edit Task">
            Edit
          </button>
          <button className="delete-btn" onClick={() => onDeleteTask(task.id)} title="Delete Task">
            x
          </button>
        </div>
      </div>

      <h3 className="task-title">{task.title}</h3>
      {task.description && <p className="task-desc">{task.description}</p>}

      {task.tags && task.tags.length > 0 && (
        <div className="task-tags">
          {task.tags.map((tag, index) => (
            <span key={index} className="tag-badge">
              #{tag}
            </span>
          ))}
        </div>
      )}

      {task.dueDateTime && (
        <div className={`due-date-container ${overdue ? 'overdue' : ''}`}>
          <span className="due-date-label">Due:</span>
          <span>{formatDateTime(task.dueDateTime)}</span>
          {overdue && <span className="overdue-warning">[Overdue]</span>}
        </div>
      )}

      <div className="task-footer">
        <select
          value={task.status}
          onChange={(e) => onStatusChange(task.id, e.target.value)}
          className="status-dropdown"
        >
          <option value="todo">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>
      </div>
    </div>
  );
}

export default TaskCard;