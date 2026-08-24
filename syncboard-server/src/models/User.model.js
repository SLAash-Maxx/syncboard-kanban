<<<<<<< Updated upstream
=======
/**
 * User "model" - Milestone 2 (Working REST API)
 *
 * This is a plain in-memory data store, not a database. It exists so the
 * controllers can already be written against a model-shaped interface
 * (find / findById / create). In Milestone 3 (Persistence & Offline
 * Support) this file gets replaced by a Mongoose schema + model with the
 * same method names, so the controllers barely have to change.
 *
 * Data is lost every time the server restarts - that's expected for now.
 */

>>>>>>> Stashed changes
let users = [];
let nextId = 1;

function findByEmail(email) {
  return users.find((u) => u.email.toLowerCase() === email.toLowerCase());
}

function findById(id) {
  return users.find((u) => u.id === Number(id));
}

function create({ name, email, passwordHash }) {
  const user = {
    id: nextId++,
    name,
    email,
    passwordHash,
    createdAt: new Date().toISOString(),
  };
  users.push(user);
  return user;
}

<<<<<<< Updated upstream
=======
/** Strip fields that should never leave the server (e.g. passwordHash). */
>>>>>>> Stashed changes
function toPublicJSON(user) {
  if (!user) return null;
  const { passwordHash, ...safe } = user;
  return safe;
}

module.exports = {
  findByEmail,
  findById,
  create,
  toPublicJSON,
};
