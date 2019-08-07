/* eslint-disable class-methods-use-this */

const config = require('config');
const jwt = require('jwt-simple');
const { getCurrentMaxId } = require('../utils');

const SECRET = config.get('apiMockSecret');

class UserController {
  constructor() {
    this.mockDb = {
      users: [{
        id: 1,
        firstName: 'Nick',
        lastName: 'Ford',
        email: 'nickforddesign@gmail.com',
        pwHash: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwicHciOiJodW50ZXIyIn0.2V0WMDmFipUVCjQzQ7U6dPLbAEYF8Ur4h293qTkJWMM' // eslint-disable-line
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

  register(req, res) {
    const { user } = req.body;
    if (this.getUserByEmail(user.email)) {
      res.status(400).send({
        message: `User with email ${user.email} already exists.`
      });
    } else {
      const currentId = getCurrentMaxId(this.mockDb.users);
      const id = currentId + 1;
      const pwHash = this.hashPassword(id, user.password);
      this.mockDb.users.push({
        ...user,
        id,
        pwHash
      });
      res.status(200).send({
        message: `User ${user.email} was succesfully created.`,
        user
      });
    }
  }

  login(req, res) {
    const { user } = req.body;
    const userRecord = this.getUserByEmail(user.email);

    if (!userRecord) {
      res.status(400).send({
        message: 'Invalid credentials'
      });
    } else {
      const { id } = userRecord;
      const pwHash = this.hashPassword(id, user.password);
      if (userRecord.pwHash !== pwHash) {
        res.status(400).send({
          message: 'Invalid credentials'
        });
      } else {
        const token = jwt.encode({
          id,
          created: new Date()
        }, SECRET);
        res.status(200).send({
          message: 'Logged in successfully',
          user: {
            ...userRecord,
            pwHash: null,
            token
          }
        });
      }
    }
  }

  refreshSession(req, res, next) {
    const token = req.header('token');
    try {
      jwt.decode(token, SECRET, true);
      next();
    } catch (error) {
      console.log(error);
      res.status(401).send({ error: 'Unauthorized' });
    }
  }
}

module.exports = UserController;
