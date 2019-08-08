const { getCurrentMaxId } = require('../utils');

class TodoController {
  constructor() {
    this.mockDb = {
      todos: []
    };
  }

  getAll(req, res) {
    const { user } = req.query;
    const todos = this.mockDb.todos.filter((entry) => {
      return entry.user === +user;
    });
    res.status(200).send(todos);
  }

  add(req, res) {
    const { user, title, date } = req.body;
    const currentId = getCurrentMaxId(this.mockDb.todos);
    const todo = {
      id: currentId + 1,
      title,
      date,
      user,
      done: false
    };
    this.mockDb.todos.push(todo);
    res.status(200).send({
      message: 'Todo successfully added',
      todo
    });
  }

  edit(req, res) {
    const data = req.body;
    const { id } = req.params;
    const todos = this.mockDb.todos.filter((entry) => {
      return entry.user === data.user;
    });
    const todoRecord = todos.find((entry) => entry.id === +id);
    const index = todos.indexOf(todoRecord);
    const todo = {
      ...data
    };
    this.mockDb.todos.splice(index, 1, todo);
    res.status(200).send({
      message: 'Todo updated successfully',
      todo
    });
  }

  remove(req, res) {
    const { id } = req.params;
    const todoRecord = this.mockDb.todos.find((entry) => {
      return entry.id === +id;
    });
    const index = this.mockDb.todos.indexOf(todoRecord);
    this.mockDb.todos.splice(index, 1);
    res.status(200).send({
      message: 'Todo removed successfully'
    });
  }
}

module.exports = TodoController;
