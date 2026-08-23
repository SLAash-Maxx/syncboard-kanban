import React, { useState, useEffect } from 'react';

const PRESET_TAGS = ['Frontend', 'Backend', 'Bug', 'Design', 'Testing', 'DevOps'];

function TaskModal({ isOpen, onClose, onSave, taskToEdit }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [status, setStatus] = useState('todo');
  const [dueDateTime, setDueDateTime] = useState('');
  const [tags, setTags] = useState([]);
  const [customTagInput, setCustomTagInput] = useState('');

  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title || '');
      setDescription(taskToEdit.description || '');
      setPriority(taskToEdit.priority || 'Medium');
      setStatus(taskToEdit.status || 'todo');
      setDueDateTime(taskToEdit.dueDateTime || '');
      setTags(taskToEdit.tags || []);
    } else {
      setTitle('');
      setDescription('');
      setPriority('Medium');
      setStatus('todo');
      setDueDateTime('');
      setTags([]);
    }
  }, [taskToEdit, isOpen]);

  if (!isOpen) return null;

  const handleToggleTag = (tag) => {
    if (tags.includes(tag)) {
      setTags(tags.filter((t) => t !== tag));
    } else {
      setTags([...tags, tag]);
    }
  };

  const handleAddCustomTag = (e) => {
    e.preventDefault();
    const cleanTag = customTagInput.trim().replace(/^#/, '');
    if (cleanTag && !tags.includes(cleanTag)) {
      setTags([...tags, cleanTag]);
      setCustomTagInput('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    onSave({
      id: taskToEdit ? taskToEdit.id : Date.now(),
      title,
      description,
      priority,
      status,
      dueDateTime,
      tags,
    });
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{taskToEdit ? 'Edit Task' : 'Add New Task'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title *</label>
            <input
              type="text"
              required
              placeholder="Task title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              rows="3"
              placeholder="Task description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Priority</label>
              <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>

            <div className="form-group">
              <label>Status</label>
              <select value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="todo">To Do</option>
                <option value="in-progress">In Progress</option>
                <option value="done">Done</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Due Date & Time</label>
            <input
              type="datetime-local"
              value={dueDateTime}
              onChange={(e) => setDueDateTime(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Tags & Categories</label>
            <div className="preset-tags">
              {PRESET_TAGS.map((tag) => (
                <button
                  type="button"
                  key={tag}
                  className={`tag-toggle-btn ${tags.includes(tag) ? 'active' : ''}`}
                  onClick={() => handleToggleTag(tag)}
                >
                  {tag}
                </button>
              ))}
            </div>
            <div className="custom-tag-input-row">
              <input
                type="text"
                placeholder="Add custom tag..."
                value={customTagInput}
                onChange={(e) => setCustomTagInput(e.target.value)}
              />
              <button type="button" onClick={handleAddCustomTag} className="add-tag-btn">
                Add Tag
              </button>
            </div>
            <div className="selected-tags">
              {tags.map((tag) => (
                <span key={tag} className="tag-chip">
                  #{tag}
                  <button type="button" onClick={() => handleToggleTag(tag)}>
                    x
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="modal-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="save-btn">
              {taskToEdit ? 'Update Task' : 'Save Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TaskModal;
