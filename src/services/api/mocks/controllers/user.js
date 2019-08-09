/* eslint-disable class-methods-use-this */

const config = require('config');
const jwt = require('jwt-simple');
const { pickBy } = require('ramda');

const { getCurrentMaxId, requireParams } = require('../utils');

const SECRET = config.get('apiMockSecret');

class UserController {
  constructor() {
    this.mockDb = {
      users: [{
        id: 0,
        firstName: 'Nick',
        lastName: 'Ford',
        email: 'nickforddesign@gmail.com',
        pwHash: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MCwicHciOiJodW50ZXIyIn0.--bXiLD-gz3UYSJxqzgOEoyWpdM-9Xd87AdKGYwdjNA' // eslint-disable-line
      }]
    };
  }

  getUserByEmail(email) {
    return this.mockDb.users.find((entry) => entry.email === email);
  }

  getUserById(id) {
    return this.mockDb.users.find((entry) => entry.id === id);
  }

  hashPassword(id, password) {
    return jwt.encode({ id, pw: password }, SECRET);
  }

  sanitizeUserData(user) {
    return pickBy((val, key) => !['pwHash', 'password'].includes(key), user);
  }

  register(req) {
    const { user } = req.body;
    const {
      firstName,
      lastName,
      email,
      password
    } = user;
    requireParams({
      firstName,
      lastName,
      email,
      password
    });
    if (this.getUserByEmail(user.email)) {
      throw Error(`User with email ${user.email} already exists.`);
    } else {
      const currentId = getCurrentMaxId(this.mockDb.users);
      const id = currentId + 1;
      const pwHash = this.hashPassword(id, user.password);
      this.mockDb.users.push({
        ...user,
        id,
        pwHash
      });
      return {
        message: `User ${user.email} was succesfully created.`,
        user: this.sanitizeUserData({
          ...user,
          id
        })
      };
    }
  }

  login(req) {
    const { user } = req.body;
    const userRecord = this.getUserByEmail(user.email);

    if (!userRecord) {
      throw Error('Invalid credentials');
    } else {
      const { id } = userRecord;
      const pwHash = this.hashPassword(id, user.password);
      if (userRecord.pwHash !== pwHash) {
        throw Error('Invalid credentials');
      } else {
        const token = this.generateRefreshToken(userRecord.id);
        return {
          message: 'Logged in successfully',
          user: {
            ...this.sanitizeUserData(userRecord),
            token
          }
        };
      }
    }
  }

  refresh(req) {
    const token = req.header('token');
    try {
      const { id } = jwt.decode(token, SECRET, true);
      const user = this.getUserById(id);
      const newToken = this.generateRefreshToken(user.id);
      return {
        message: 'Refreshed session',
        user: this.sanitizeUserData({
          ...user,
          token: newToken
        })
      };
    } catch (error) {
      throw Error('Unauthorized');
    }
  }

  generateRefreshToken(id) {
    return jwt.encode({
      id,
      created: new Date()
    }, SECRET);
  }

  // this is technically middleware
  refreshSession(req, res, next) {
    const token = req.header('token');
    try {
      jwt.decode(token, SECRET, true);
      next();
    } catch (error) {
      res.status(401).send({ error: 'Unauthorized' });
    }
  }
}

module.exports = UserController;
