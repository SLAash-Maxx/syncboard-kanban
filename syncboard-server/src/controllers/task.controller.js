const Task = require('../models/Task.model');
const asyncHandler = require('../utils/asyncHandler');

const getTasks = asyncHandler(async (req, res) => {
  res.json({ tasks: Task.findAll() });
});

const getTask = asyncHandler(async (req, res) => {
  const task = Task.findById(req.params.id);
  if (!task) return res.status(404).json({ error: 'Task not found' });
  res.json({ task });
});

const createTask = asyncHandler(async (req, res) => {
  const { title, description, priority, status, dueDateTime, tags } = req.body;

  if (!title || !title.trim()) {
    return res.status(400).json({ error: 'title is required' });
  }

  const task = Task.create({
    title,
    description,
    priority,
    status,
    dueDateTime,
    tags,
    ownerId: req.user.id,
  });
  res.status(201).json({ task });
});

/**
 * PATCH /api/tasks/:id
 * Body may include `expectedUpdatedAt` (the `updatedAt` the client last
 * saw). If another user changed the task since then, this returns 409 with
 * the current server copy instead of silently overwriting their edit -
 * this is the "documented approach to concurrent edits" required by the
 * brief. The client is expected to show the conflict to the user rather
 * than retry blindly.
 */
const updateTask = asyncHandler(async (req, res) => {
  const { expectedUpdatedAt, ...changes } = req.body;
  delete changes.id;
  delete changes.ownerId;

  const result = Task.update(req.params.id, changes, expectedUpdatedAt);

  if (result.notFound) {
    return res.status(404).json({ error: 'Task not found' });
  }
  if (result.conflict) {
    return res.status(409).json({
      error: 'This task was changed by someone else since you loaded it',
      current: result.current,
    });
  }
  res.json({ task: result.task });
});

const deleteTask = asyncHandler(async (req, res) => {
  const deleted = Task.remove(req.params.id);
  if (!deleted) return res.status(404).json({ error: 'Task not found' });
  res.status(204).send();
});

module.exports = { getTasks, getTask, createTask, updateTask, deleteTask };
