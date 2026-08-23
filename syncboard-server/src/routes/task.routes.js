const express = require('express');
const {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
} = require('../controllers/task.controller');
const { requireAuth } = require('../middleware/auth.middleware');

const router = express.Router();
