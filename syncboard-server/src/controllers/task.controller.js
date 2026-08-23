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
