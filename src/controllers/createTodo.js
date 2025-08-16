import { Todo } from "../models/todoModel.js";
import { v4 as uuid } from 'uuid';

export default async function createTodo(req, res){
  try {
    const { task } = req.body;
    if( !task || task.trim() === '' ) {
      return res.status(400).json({ error: "Task name is required" })
    }

    const newTodo = new Todo({
      id: uuid(),
      task: task.trim(),
      completed: false,
    });

    await newTodo.save();
    res.status(200).json( { message: 'Task added successfully', task: newTodo } );
  } catch (error) {
    res.status(500).json({ error: 'Failed to create todo' });
  }
};