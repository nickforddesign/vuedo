const { getCurrentMaxId } = require('../utils');

class TodoController {
  constructor() {
    this.mockDb = {
      todos: []
    };
  }

  getAll(req, res) {
    const { user } = req.body;
    const todos = this.mockDb.todos.filter((entry) => {
      return entry.user === user;
    });
    res.status(200).send(todos);
  }

  add(req, res) {
    const { user, title } = req.body;
    const currentId = getCurrentMaxId(this.mockDb.todos);
    const todo = {
      id: currentId + 1,
      title,
      user
    };
    this.mockDb.todos.push(todo);
    res.status(200).send({
      message: 'Todo successfully added',
      todo
    });
  }

  edit(req, res) {
    const { title, user } = req.body;
    const { id } = req.params;
    const todos = this.mockDb.todos.filter((entry) => {
      return entry.user === user;
    });
    const todoRecord = todos.find((entry) => entry.id === id);
    const index = todos.indexOf(todoRecord);
    const todo = {
      title,
      user,
      id
    };
    this.mockDb.todos.splice(index, 1, todo);
    res.status(200).send({
      message: 'Todo updated successfully',
      todo
    });
  }
}

module.exports = TodoController;
