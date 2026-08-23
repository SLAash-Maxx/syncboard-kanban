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

/** Strip fields that should never leave the server (e.g. passwordHash). */
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
