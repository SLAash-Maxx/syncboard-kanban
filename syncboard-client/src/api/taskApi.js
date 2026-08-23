import request from './client';

export function getTasks(token) {
  return request('/tasks', { token }).then((data) => data.tasks);
}

export function createTask(task, token) {
  return request('/tasks', { method: 'POST', body: task, token }).then((data) => data.task);
}
