import express from 'express';
import { connectToMongodb } from './src/config/db.js';
import todosRouter from './src/routes/todoRoutes.js'

const app = express();
const port = 5051;

// Middleware
app.use(express.static('./public')); //this serves public folder and loads 'index.html' named file by default
app.use(express.json()); //It reads that JSON from the request and puts it into req.body.\If you skip it, req.body will be undefined.

// Routes
app.use('/todos', todosRouter);

//connect to DB & start server
connectToMongodb().then( ()=>{
    app.listen(port, () => {
        console.log(`🚀 Server running at: http://localhost:${port}`);
    });
});