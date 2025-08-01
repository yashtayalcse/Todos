const express = require('express');
const { MongoClient } = require('mongodb');
const { v4: uuid } = require('uuid');

const app = express();
const port = 5051;

const url = 'mongodb+srv://yashtayal28763:FLCs99lh7v9KWzQr@clustertodos.4vzmqav.mongodb.net/?retryWrites=true&w=majority&appName=ClusterTodos'; //mongodb connection string
// const url = 'mongodb://localhost:27017/';
const client = new MongoClient(url); //acts like a gateway to your MongoDB server
const dbName = 'Tasksdb';

let todos; // collection reference

// Middleware
app.use(express.static('./public'));
app.use(express.json());

async function connectToMongo() {
    try {
        await client.connect();
        console.log('✅ MongoDB connected');

        app.listen(port, () => {
            console.log(`🚀 Server running at: http://localhost:${port}`);
        });
    } 
    catch (err) {
        console.error('❌ MongoDB connection error:', err);
    }
}

connectToMongo(); // connect and then start the server
const db = client.db(dbName);
todos = db.collection('todos');

// Routes
app.get('/todos', async (req, res) => {
    const allTodos = await todos.find().toArray();
    res.send(allTodos);
});

app.post('/todos', async (req, res) => {
    const taskName = req.body.task;
    const newTodo = {
        id: uuid(),
        task: taskName,
        completed: false,
    };
    await todos.insertOne(newTodo);
    res.send({
        message: 'Task added',
        task: newTodo,
    });
});

app.put('/todos', async (req, res) => {
    const id = req.body.id;
    let { completed } = await todos.findOne({ id });
    // console.log(completed);
    await todos.updateOne({ id }, { $set: { completed: !completed } });
    res.send({
        message: `Task status switched: ${id}`
    });
});

app.put('/todos/edit', async (req, res) =>{
    const {id, newName} = req.body;
    await todos.updateOne({ id }, { $set: { task: newName }});
    res.send({
        message: `Task name updated to: ${newName}`
    });
})

app.delete('/todos', async (req, res) => {
    const id = req.body.id;
    await todos.deleteOne({ id });
    res.send({
        message: `Task deleted: ${id}`,
    });
});
