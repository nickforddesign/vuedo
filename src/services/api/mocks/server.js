const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('config');

const UserController = require('./controllers/user');
const TodoController = require('./controllers/todo');

const PORT = config.get('apiMockPort');

const app = express();
const userController = new UserController();
const todoController = new TodoController();

app.use(cors());
app.use(bodyParser.json());

app.post('/register', (req, res) => {
  try {
    res.send(userController.register(req));
  } catch (error) {
    res.status(400).send({
      message: error.message
    });
  }
});

app.put('/login', (req, res) => {
  try {
    res.send(userController.login(req));
  } catch (error) {
    res.status(400).send({
      message: error.message
    });
  }
});

app.put('/refresh', (req, res) => {
  try {
    res.send(userController.refresh(req));
  } catch (error) {
    res.status(400).send({
      message: error.message
    });
  }
});

app.get('/todos', userController.refreshSession, (req, res) => {
  try {
    res.send(todoController.getAll(req));
  } catch (error) {
    res.status(400).send({
      message: error.message
    });
  }
});

app.post('/todos', userController.refreshSession, (req, res) => {
  try {
    res.send(todoController.add(req));
  } catch (error) {
    res.status(400).send({
      message: error.message
    });
  }
});

app.put('/todos/:id', userController.refreshSession, (req, res) => {
  try {
    res.send(todoController.edit(req));
  } catch (error) {
    res.status(400).send({
      message: error.message
    });
  }
});

app.delete('/todos/:id', userController.refreshSession, (req, res) => {
  try {
    res.send(todoController.remove(req));
  } catch (error) {
    res.status(400).send({
      message: error.message
    });
  }
});


app.listen(PORT, () => console.log(`TODO MOCK API - Listening on port: ${PORT}`));
