import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import FilterBar from './components/FilterBar';
import Column from './components/Column';
import TaskModal from './components/TaskModal';
import { useAuth } from './context/AuthContext';
import * as taskApi from './api/taskApi';
import './App.css';

const CACHE_KEY = 'syncboard_tasks_cache';

function App() {
  const { token } = useAuth();
  const [tasks, setTasks] = useState(() => {
    const cached = localStorage.getItem(CACHE_KEY);
    return cached ? JSON.parse(cached) : [];
  });

  const [isOffline, setIsOffline] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [sortBy, setSortBy] = useState('default');

  useEffect(() => {
    localStorage.setItem(CACHE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const loadTasks = useCallback(async () => {
    if (!token) return;
    try {
      const fresh = await taskApi.getTasks(token);
      setTasks(fresh);
      setIsOffline(false);
      setErrorMessage('');
    } catch (err) {
      setIsOffline(true);
    }
  }, [token]);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  const handleOpenCreateModal = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleSaveTask = async (taskData) => {
    setErrorMessage('');
    try {
      if (editingTask) {
        const updated = await taskApi.updateTask(
          editingTask.id,
          taskData,
          editingTask.updatedAt,
          token
        );
        setTasks((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
      } else {
        const created = await taskApi.createTask(taskData, token);
        setTasks((prev) => [...prev, created]);
      }
    } catch (err) {
      if (err.status === 409) {
        setErrorMessage('That task was updated by someone else. Showing the latest version - please re-apply your change.');
        setTasks((prev) => prev.map((t) => (t.id === err.payload.current.id ? err.payload.current : t)));
      } else {
        setErrorMessage(err.message);
      }
    }
  };

  const handleDeleteTask = async (id) => {
    setErrorMessage('');
    try {
      await taskApi.deleteTask(id, token);
      setTasks((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    setErrorMessage('');
    const task = tasks.find((t) => t.id === id);
    if (!task) return;
    try {
      const updated = await taskApi.updateTask(id, { status: newStatus }, task.updatedAt, token);
      setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
    } catch (err) {
      if (err.status === 409) {
        setErrorMessage('That task changed on the server - refreshed it below before applying your move.');
        setTasks((prev) => prev.map((t) => (t.id === err.payload.current.id ? err.payload.current : t)));
      } else {
        setErrorMessage(err.message);
      }
    }
  };

  const filteredTasks = tasks
    .filter((task) => {
      const matchesSearch =
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (task.tags && task.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())));

      const matchesPriority = priorityFilter === 'All' || task.priority === priorityFilter;

      return matchesSearch && matchesPriority;
    })
    .sort((a, b) => {
      if (sortBy === 'dueDate') {
        if (!a.dueDateTime) return 1;
        if (!b.dueDateTime) return -1;
        return new Date(a.dueDateTime) - new Date(b.dueDateTime);
      }
      if (sortBy === 'priority') {
        const priorityWeights = { High: 3, Medium: 2, Low: 1 };
        return (priorityWeights[b.priority] || 0) - (priorityWeights[a.priority] || 0);
      }
      return 0;
    });

  return (
    <div className="app-container">
      <Header onOpenCreateModal={handleOpenCreateModal} />

      {isOffline && (
        <div className="board-status-banner error">
          Can't reach the server right now - showing your last saved board.
          Changes won't save until the connection is back.
        </div>
      )}
      {!isOffline && errorMessage && (
        <div className="board-status-banner error">{errorMessage}</div>
      )}

      <FilterBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        priorityFilter={priorityFilter}
        setPriorityFilter={setPriorityFilter}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />

      <main className="board-container">
        <Column
          title="To Do"
          status="todo"
          tasks={filteredTasks}
          onDeleteTask={handleDeleteTask}
          onStatusChange={handleStatusChange}
          onEditTask={handleOpenEditModal}
        />
        <Column
          title="In Progress"
          status="in-progress"
          tasks={filteredTasks}
          onDeleteTask={handleDeleteTask}
          onStatusChange={handleStatusChange}
          onEditTask={handleOpenEditModal}
        />
        <Column
          title="Done"
          status="done"
          tasks={filteredTasks}
          onDeleteTask={handleDeleteTask}
          onStatusChange={handleStatusChange}
          onEditTask={handleOpenEditModal}
        />
      </main>

      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveTask}
        taskToEdit={editingTask}
      />
    </div>
  );
}

export default App;
