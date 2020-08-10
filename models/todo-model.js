const db = require('../db/config');

class Todo {
    constructor(todo) {
        this.id = todo.id || null,
        this.title = todo.title,
        this.description = todo.description
    }

    static getAll() {
        return db
            .manyOrNone('SELECT * FROM todos ORDER BY id ASC')
            .then((todos) =>{
                return todos.map((todo) => {
                    return new this(todo);
                });
            });
    }

    static getById(id) {
        return db
            .oneOrNone('SELECT * FROM todos WHERE id = $1', id)
            .then((todo) => {
                if (todo) return new this(todo);
                throw new Error('Todo not found!')
            });
    }

    save() {
        return db
        .one(
            `INSERT INTO todos (title, description)
            VALUES ($/title/, $/description/)
            RETURNING *`,
            this
        )
        .then((todo) => {
            return Object.assign(this, todo);
        });
    }

    update(changes) {
        Object.assign(this, changes);
        return db 
        .oneOrNone(
            `UPDATE todos SET
                title = $/title/,
                description = $/description/
            WHERE id = $/id/
            RETURNING *`,
            this
        )
        .then((todo) => {
            return Object.assign(this, todo);
        });
    }

    delete() {
        return db
        .oneOrNone(`DELETE FROM todos WHERE id = $1`, this.id);
    }
}

module.exports = Todo;