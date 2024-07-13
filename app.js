var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Task = require('./Task.model')

var port = 8080;

mongoose.connect('mongodb+srv://shubham9167:shubham9167@myfirstdb.4gjb2sh.mongodb.net/app')
app.get('/tasks', async (req,res)=>{
    console.log("getting all tasks");
    let data = await Task.find({})
    console.log(data);
    res.json(data);
})

app.post('/addTask', async (req,res)=>{
    try{
        const newTask = new Task({
            // name: 'Harry Potter and the Order of the Phoenix',
            // image: 'https://lh3.googleusercontent.com/OGQkzkYdfhAXE6p-xufS_6mB3MtjDfPM6HZPdDrX5uJ09Dh1vzLZ6YflPIduh2Jk-h7H',
            // summary: 'Harry Potter and Dumbledores warning about the return of Lord Voldemort is not heeded by the wizard authorities who, in turn, look to undermine Dumbledore authority at Hogwarts and discredit Harry.'
            // name: 'The Lord of the Rings: The Fellowship of the Ring',
            // image: 'https://bit.ly/2tC1Lcg',
            // summary: 'A young hobbit, Frodo, who has found the One Ring that belongs to the Dark Lord Sauron, begins his journey with eight companions to Mount Doom, the only place where it can be destroyed.'
            name: 'Avengers: Endgame',
            image: 'https://bit.ly/2Pzczlb',
            summary: 'Adrift in space with no food or water, Tony Stark sends a message to Pepper Potts as his oxygen supply starts to dwindle. Meanwhile, the remaining Avengers -- Thor, Black Widow, Captain America, and Bruce Banner -- must figure out a way to bring back their vanquished allies for an epic showdown with Thanos -- the evil demigod who decimated the planet and the universe.'
        });
        const savedTask = await newTask.save();
        console.log(savedTask);
        res.status(201).json(savedTask);
    } catch (error) {
        console.log('Error adding task:', error)
        res.status(500).json({error: 'failed to add task'});
    }
})

app.put('/updateTask/:id', async (req,res) => {
    // if (req.body.name != null) {
    //     res.book.name = req.body.name;
    // }
    // if (req.body.image != null) {
    //     res.book.image = req.body.image;
    // }
    // if (req.body.summary != null) {
    //     res.book.summary = req.body.summary;
    // }

    // try {
    //     const updatedTask = await res.task.save();
    //     res.json(updatedTask);
    // } catch (err) {
    //     res.status(400).json({ message: err.message });
    // }
    try {
        const id = req.params.id;
        const updatedTask = await updateTask.findByIdAndUpdate(id, req.body);
        if(!updateTask){
            return res.status(404).send('The task with the given id was not found');
        }
        res.json(updatedTask);
    } catch (error){
        res.status(400).json({message: error.message})
    }
})

app.delete('/deleteTask/:taskId', async (req,res) =>{
    const taskId = req.params.taskId;
    try{
        const deletedTask = await Task.findByIdAndDelete(taskId);

        if(!deletedTask){
            return res.status(404).json({ error: 'Task not found'});
        }
        console.log('Task deleted:', deletedTask);
        res.status(200).json({message: 'Task deleted successfully'});
    } catch (error) {
        console.log('Error deleting task:', error);
        res.status(500).json({error: 'failed to delete task'});
    }
})

app.listen(port,function(){
    console.log('Server is running on port ' + port);
})