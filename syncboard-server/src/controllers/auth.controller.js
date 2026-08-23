const bcrypt = require('bcryptjs');
const User = require('../models/User.model');
const { signToken } = require('../utils/jwt');
const asyncHandler = require('../utils/asyncHandler');

const SALT_ROUNDS = 10;

const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: 'name, email and password are all required' });
  }
  if (password.length < 6) {
    return res.status(400).json({ error: 'password must be at least 6 characters' });
  }
  if (User.findByEmail(email)) {
    return res.status(409).json({ error: 'An account with this email already exists' });
  }

  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
  const user = User.create({ name, email, passwordHash });
  const token = signToken(user);

  res.status(201).json({ user: User.toPublicJSON(user), token });
});
