const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../services/configService');
const { BadTokenError } = require('../errors');

const saltRounds = 10;

function hashPassword(password) {
  return bcrypt.hash(password, saltRounds);
}

function checkPassword(password, hash) {
  return bcrypt.compare(password, hash);
}

function createToken(payload, expiresIn = '2m') {
  return jwt.sign(payload, JWT_SECRET, { expiresIn });
}

function checkToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (e) {
    if (e.name === 'TokenExpiredError') throw new BadTokenError('Token expired');
    throw new BadTokenError(e.message);
  }
}

function readToken(token) {
  try {
    return jwt.decode(token, JWT_SECRET);
  } catch (e) {
    if (e.name === 'TokenExpiredError') throw new BadTokenError('Token expired');
    throw new BadTokenError(e.message);
  }
}

module.exports = {
  hashPassword,
  checkPassword,
  createToken,
  checkToken,
  readToken,
};
