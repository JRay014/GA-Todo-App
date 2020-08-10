const tdRoute = require('../models/todo-model');

const todoController = {};

todoController.index = (req, res, next) => {
    tdRoute.getAll()
        .then((todos) => { 
            res.render('todo-pages/index', {
                data: {todos}
            });
        })
    .catch(next);
};

todoController.show = (req, res, next) => {
    tdRoute.getById(req.params.id)
        .then((todo) => {
            res.locals.todo = todo;
            next();
        })
    .catch(next);
};

todoController.create = (req, res) => {
    new Todo({
        title: req.body.title,
        description: req.body.description,
    })
    .save()
    .then(() => {
        res.redirect('/todo-model')
    })
    .catch(next)
};

todoController.update = (req, res) => {
    tdRoute.getById(req.params.id)
        .then((todo) => {
            return todo.update(req.body);
        })
        .then((updatedTodo) => {
            res.redirect(`/todo-model/${updatedTodo.id}`);
        })
        .catch(next)
};

todoController.delete = (req, res) => {
    tdRoute.getById(req.params.id)
        .then((todo) => {
            return todo.delete();
        })
        .then(() => {
            res.redirect('/todo-model');
        })
        .catch(next)
};

module.exports = todoController