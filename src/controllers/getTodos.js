import { Todo } from "../models/todoModel.js";

export default async function getTodos( req, res ){
  try {
    const allTodos = await Todo.find().sort({ createdAt: -1}); //newest first sorted via -1
    res.json(allTodos);
  } catch (err) {
    res.status(500).json({error: 'Failed to fetch todos'});
  }
};
