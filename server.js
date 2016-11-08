const 
    http = require('http');
    mongodb = require('mongodb');
    express = require('express');
    mongoose = require('mongoose');
    mongoose.connect('mongodb://localhost:27017/todoforever');
    MongoClient = mongodb.MongoClient;
    bodyParser = require('body-parser');
    app = express();
    
//let list = [ ];

// intergrate MongoDb
let TodoSchema = new mongoose.Schema({
id: Number,
name: String
});

var Todo = mongoose.model('Todo',TodoSchema);


// Serve Files
app.use(express.static('public'));
app.use(bodyParser.json());

//GET
app.get('/list',(req,res, next) => {
    Todo.find((err,todos)=>{
        if (err) return next(err);
        res.json(todos);
    });
 //   res.json(list);
});
//POST
app.post('/list',(req,res,next) => {
    Todo.create(req.body, (err, post) => {
    if (err) return next(err);
    res.json(post);
  });
    /*
    //old code
    var taskName = req.body.name;
    currentId++;

    list.push({
        id: currentId,
        name: taskName
    });

    res.send('Successfully created task!');
    */
});


//Delete
app.delete('/list/:id', (req, res, next) => {
    Todo.findOneAndRemove({id:req.params.id}, (err, post) => {
    if (err) return next(err);
    res.json(post);
  });
    /*
    //Old code
    var id = req.params.id;

    var found = false;

    list.forEach(function(taskItem, index) {
        if (!found && taskItem.id === Number(id)) {
            list.splice(index, 1);
        }
    });

    res.send('Successfully deleted task!'); */
});

//PUT
app.put('/list/:id', (req, res, next) => {
    Todo.findOneAndUpdate({id:req.params.id},req.body, (err, post) => {
    if (err) return next(err);
    res.json(post);
  });
   
});
app.listen(3000, () => {
    console.log("App is running at port 3000");
});
