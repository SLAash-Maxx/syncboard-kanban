const mongoose = require('mongoose');

/**
 * Task model - Milestone 3 (Persistence & Offline Support).
 *
 * Replaces the in-memory array from M2. Method names (findAll, findById,
 * create, update, remove) are kept identical so task.controller.js and
 * task.routes.js didn't need to change.
 *
 * NOTE on the id fields: `.lean()` docs come back with `_id`, but the
 * front end and API_CONTRACT.md were built around a plain `id`, so every
 * read here maps `_id` -> `id` before returning.
 */
const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    priority: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Medium' },
    status: { type: String, enum: ['todo', 'in-progress', 'done'], default: 'todo' },
    dueDateTime: { type: String, default: null },
    tags: { type: [String], default: [] },
    ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } }
);

const TaskDoc = mongoose.model('Task', taskSchema);

function toPlain(doc) {
  if (!doc) return doc;
  const { _id, __v, ...rest } = doc;
  return {
    id: String(_id),
    ...rest,
    ownerId: rest.ownerId ? String(rest.ownerId) : null,
    updatedAt: doc.updatedAt instanceof Date ? doc.updatedAt.toISOString() : doc.updatedAt,
  };
}

async function findAll() {
  const docs = await TaskDoc.find().sort({ createdAt: 1 }).lean();
  return docs.map(toPlain);
}

async function findById(id) {
  try {
    const doc = await TaskDoc.findById(id).lean();
    return toPlain(doc);
  } catch (err) {
    return null; // malformed ObjectId
  }
}

async function create({ title, description, priority, status, dueDateTime, tags, ownerId }) {
  const doc = await TaskDoc.create({
    title,
    description,
    priority,
    status,
    dueDateTime,
    tags,
    ownerId: ownerId || null,
  });
  return toPlain(doc.toObject());
}

/**
 * Same conflict-detection contract as the M2 in-memory version: if
 * `expectedUpdatedAt` is provided and no longer matches what's stored,
 * returns { conflict: true, current } instead of applying the change.
 */
async function update(id, changes, expectedUpdatedAt) {
  let existing;
  try {
    existing = await TaskDoc.findById(id);
  } catch (err) {
    return { notFound: true };
  }
  if (!existing) return { notFound: true };

  const currentUpdatedAtISO = existing.updatedAt.toISOString();
  if (expectedUpdatedAt && currentUpdatedAtISO !== expectedUpdatedAt) {
    return { conflict: true, current: toPlain(existing.toObject()) };
  }

  Object.assign(existing, changes);
  await existing.save(); // bumps updatedAt via the timestamps option
  return { task: toPlain(existing.toObject()) };
}

async function remove(id) {
  try {
    const result = await TaskDoc.findByIdAndDelete(id);
    return Boolean(result);
  } catch (err) {
    return false; // malformed ObjectId
  }
}

module.exports = {
  findAll,
  findById,
  create,
  update,
  remove,
};
