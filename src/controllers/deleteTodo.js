import { Todo } from "../models/todoModel.js";

export default async function deleteTodo( req, res){
  try {
    const { id } = req.body;
    if(!id) return res.status(400).json({ error: 'Todo ID is required'});

    const deletedTodo = await Todo.findOneAndDelete({ id });
    if(!deleteTodo) return res.status(400).json({ error: 'Todo not found' });

    res.status(200).json({ message: 'Task deleted', deletedTask: deletedTodo.task });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete todo' });
  }
};