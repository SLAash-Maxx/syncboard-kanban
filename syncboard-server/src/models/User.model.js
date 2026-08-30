const mongoose = require('mongoose');

/**
 * User model - Milestone 3 (Persistence & Offline Support).
 *
 * Replaces the in-memory array from M2 with a real Mongoose schema.
 * Method names (findByEmail, findById, create, toPublicJSON) are kept
 * identical on purpose, so auth.controller.js and auth.middleware.js
 * didn't need to change at all.
 */
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
  },
  { timestamps: true } // adds createdAt / updatedAt automatically
);

const UserDoc = mongoose.model('User', userSchema);

async function findByEmail(email) {
  const user = await UserDoc.findOne({ email: email.toLowerCase() }).lean();
  return user ? { ...user, id: String(user._id) } : null;
}

function findById(id) {
  return UserDoc.findById(id).lean().catch(() => null); // catches malformed ObjectIds
}

async function create({ name, email, passwordHash }) {
  const doc = await UserDoc.create({ name, email, passwordHash });
  const obj = doc.toObject();
  return { ...obj, id: String(obj._id) }; // keep `.id` working for jwt.js / controllers
}

/** Strip fields that should never leave the server (e.g. passwordHash). */
function toPublicJSON(user) {
  if (!user) return null;
  const { passwordHash, __v, ...safe } = user;
  return { ...safe, id: String(safe._id ?? safe.id) };
}

module.exports = {
  findByEmail,
  findById,
  create,
  toPublicJSON,
};
