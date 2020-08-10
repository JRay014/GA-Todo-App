const express = require('express');
const tdRouter = express.Router();

const todoController = require('../controllers/todo-controller');

tdRouter.get('/', todoController.index);
tdRouter.post('/', todoController.create);

tdRouter.get('/add', (req, res) => {
  res.render('todo-pages/add');
});

tdRouter.get('/:id([0-9]+)', todoController.show, (req, res) => {
  res.render('todo-pages/show', {
    todo: res.locals.todo,
   
  });
});
tdRouter.get('/:id([0-9]+)/edit', todoController.show, (req, res) => {
  res.render('todo-pages/edit', {
    todo: res.locals.todo,
  });
});

tdRouter.put('/:id', todoController.update);

tdRouter.delete('/:id', todoController.delete);

module.exports = tdRouter;