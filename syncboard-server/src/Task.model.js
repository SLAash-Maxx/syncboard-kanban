
let tasks = [
  {
    id: 1,
    title: 'Setup React + Vite Project',
    description: 'Initialize base repository and setup dark mode styles.',
    priority: 'High',
    status: 'done',
    dueDateTime: '2026-08-15T18:00',
    tags: ['Frontend', 'DevOps'],
    ownerId: null,
    updatedAt: new Date().toISOString(),
  },
  {
    id: 2,
    title: 'Design Kanban Columns',
    description: 'Create responsive column layouts for To Do, In Progress, Done.',
    priority: 'Medium',
    status: 'in-progress',
    dueDateTime: '2026-08-20T12:00',
    tags: ['Design', 'Frontend'],
    ownerId: null,
    updatedAt: new Date().toISOString(),
  },
  {
    id: 3,
    title: 'Integrate LocalStorage & Filters',
    description: 'Implement persistent storage along with dynamic searching and sorting.',
    priority: 'High',
    status: 'todo',
    dueDateTime: '2026-08-10T10:00',
    tags: ['Frontend'],
    ownerId: null,
    updatedAt: new Date().toISOString(),
  },
];
let nextId = tasks.length + 1;

function findAll() {
  return tasks;
}

function findById(id) {
  return tasks.find((t) => t.id === Number(id));
}
function create({ title, description, priority, status, dueDateTime, tags, ownerId }) {
  const task = {
    id: nextId++,
    title,
    description: description || '',
    priority: priority || 'Medium',
    status: status || 'todo',
    dueDateTime: dueDateTime || null,
    tags: tags || [],
    ownerId: ownerId || null,
    updatedAt: new Date().toISOString(),
  };
  tasks.push(task);
  return task;
}
function update(id, changes, expectedUpdatedAt) {
  const task = findById(id);
  if (!task) return { notFound: true };

  if (expectedUpdatedAt && task.updatedAt !== expectedUpdatedAt) {
    return { conflict: true, current: task };
  }

  Object.assign(task, changes, { updatedAt: new Date().toISOString() });
  return { task };
}

function remove(id) {
  const index = tasks.findIndex((t) => t.id === Number(id));
  if (index === -1) return false;
  tasks.splice(index, 1);
  return true;
}
