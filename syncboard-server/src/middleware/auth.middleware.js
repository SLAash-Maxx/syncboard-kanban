const { verifyToken } = require('../utils/jwt');
const User = require('../models/User.model');

function requireAuth(req, res, next) {
  const header = req.headers.authorization || '';
  const [scheme, token] = header.split(' ');

  if (scheme !== 'Bearer' || !token) {
    return res.status(401).json({ error: 'Missing or malformed Authorization header' });
  }

  try {
    const payload = verifyToken(token);
    const user = User.findById(payload.sub);
    if (!user) {
      return res.status(401).json({ error: 'User for this token no longer exists' });
    }
    req.user = User.toPublicJSON(user);
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}

module.exports = { requireAuth };
