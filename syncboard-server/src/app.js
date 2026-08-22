const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const config = require('./config');
const authRoutes = require('./routes/auth.routes');
const taskRoutes = require('./routes/task.routes');
const { notFoundHandler, errorHandler } = require('./middleware/errorHandler.middleware');

const app = express();

app.use(cors({ origin: config.clientOrigin }));
app.use(express.json());
app.use(morgan('dev'));

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', milestone: 'M2 - Working REST API' });
});

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
