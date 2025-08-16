import mongoose from "mongoose";

// Todo Schema and Model
const todoSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    task: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true // Adds createdAt and updatedAt fields
});

const Todo = mongoose.model('todos', todoSchema);  //Each model corresponds to a MongoDB collection.

export { Todo };