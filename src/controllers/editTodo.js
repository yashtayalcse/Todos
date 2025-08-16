import { Todo } from "../models/todoModel.js";

export default async function editTodo( req, res ){
  try {
    const { id, newName } = req.body;
    if(!id || !newName) {
      return res.status(400).json({ error: 'todo ID and new name are required'});
    }

    const todo = await Todo.findOneAndUpdate(
      { id },
      { task: newName },
      { new: true } //this option will make this function return the updated document
    );

    if(!todo) return res.status(400).json({ error: 'Todo not found '});

    res.status(200).json({ message: 'Task name updated', todo });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update todo name' });
  }
};