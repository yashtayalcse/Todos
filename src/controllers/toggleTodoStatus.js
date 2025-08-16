import { Todo } from "../models/todoModel.js";

export default async function toggleTodoStatus( req, res ){
  try {
    const {id} = req.body;
    if(!id) return res.status(400).json({ error: 'Todo ID is required' });

    const todo = await Todo.findOne({ id });
    if(!todo) return res.status(400).json({ error: 'Todo not found' });

    todo.completed = !todo.completed;
    await todo.save();
    res.status(200).json({ message: 'Task status updated', todo });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update todo status'} );
  }
};