<<<<<<< Updated upstream
=======
/**
 * Task "model" - Milestone 2 (Working REST API)
 *
 * Same idea as User.model.js: an in-memory array standing in for MongoDB
 * until Milestone 3, when this becomes a Mongoose model. Keeping the
 * field names identical to the front end's mock data (see
 * syncboard-client/src/App.jsx INITIAL_TASKS) so wiring the client up to
 * real endpoints is a drop-in swap rather than a rewrite.
 */

>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
=======

>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
=======

/**
 * Updates a task IF the caller's known `expectedUpdatedAt` still matches
 * what's stored. Returns { conflict: true, current } instead of applying
 * the change when it doesn't - this is the hook the group's concurrent-edit
 * detection (a mandatory technical requirement) plugs into. Session M5
 * pairs this with Socket.io so both clients find out immediately.
 */
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
=======

>>>>>>> Stashed changes
module.exports = {
  findAll,
  findById,
  create,
  update,
  remove,
};
