import request from './client';

export function getTasks(token) {
  return request('/tasks', { token }).then((data) => data.tasks);
}

export function createTask(task, token) {
  return request('/tasks', { method: 'POST', body: task, token }).then((data) => data.task);
}

/**
 * `expectedUpdatedAt` lets the server detect a conflicting concurrent edit
 * (see API_CONTRACT.md). On a 409 the thrown error's `payload.current`
 * holds the server's current copy of the task.
 */
export function updateTask(id, changes, expectedUpdatedAt, token) {
  return request(`/tasks/${id}`, {
    method: 'PATCH',
    body: { ...changes, expectedUpdatedAt },
    token,
  }).then((data) => data.task);
}

export function deleteTask(id, token) {
  return request(`/tasks/${id}`, { method: 'DELETE', token });
}
