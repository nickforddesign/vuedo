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
  userController.register(req, res);
});

app.put('/login', (req, res) => {
  userController.login(req, res);
});

app.get('/todos', userController.refreshSession, (req, res) => {
  todoController.getAll(req, res);
});

app.post('/todos', userController.refreshSession, (req, res) => {
  todoController.add(req, res);
});

app.put('/todos/:id', userController.refreshSession, (req, res) => {
  todoController.edit(req, res);
});

app.listen(PORT, () => console.log(`TODO MOCK API - Listening on port: ${PORT}`));
