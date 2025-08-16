import express from 'express';
import getTodos from '../controllers/getTodos.js';
import createTodo from '../controllers/createTodo.js';
import toggleTodoStatus from '../controllers/toggleTodoStatus.js';
import editTodo from '../controllers/editTodo.js';
import deleteTodo from '../controllers/deleteTodo.js';

const router = express.Router();

//Define routes
router.get('/', getTodos);
router.post('/', createTodo);
router.put('/', toggleTodoStatus);
router.put('/edit', editTodo);
router.delete('/', deleteTodo);

export default router;