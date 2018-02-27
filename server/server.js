

var express = require('express');
var bodyParser = require('body-parser');

var {ObjectId}=require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();
 // for herku ur

 const port=process.env.PORT || 3000;


app.use(bodyParser.json());
// for post data
app.post('/todos', (req, res) => {
  var todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

// for Get data

app.get('/todos',(req,res)=>{
  Todo.find().then((todos)=>{
    res.send({todos})
  },(e)=>{
    res.status(400).send(e);
  });
});

//Get/todos/1234324 like id

app.get('/todos/:id',(req,res)=>{
  var id=req.params.id;
//valid id using isValid
if(!ObjectId.isValid(id)){
  return res.status(404).send();
}
//404- send back empty send
//findById
Todo.findById(id).then((todo)=>{
  if(!todo){
    return res.status(404).send();
  }
res.send({todo});// this object todo used in //GET/todos:id testing secttion
}).catch((e)=>{
  res.status(400).send();
})
});

//used in mongoose-remove.js file

app.delete('/todos/:id', (req, res) => {
  var id = req.params.id;

  if (!ObjectId.isValid(id)) {
    return res.status(404).send();
  }

  Todo.findByIdAndRemove(id).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }

    res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  });
});
app.listen(port, () => {
  console.log(`Started on port ${port}` );
});


 module.exports={app};


// var Todo =mongoose.model('Todo',{
//   text:{
//     type:String,
//     required:true,
//     minlength:1,
//     trim:true
//   },
//   completed:{
//     type:Boolean,
//     default:false
//   },
//   completedAt:{
//   type:Number,
//   default:null
//   }
// });

// var newTodo =new Todo({
//   text:'Cook Dinner'
// });
//
// newTodo.save().then((doc)=>{
//   console.log('Saved todo',doc);
// },(e)=>{
//   console.log('Unable to save todo');
// });

// var otherTodo=new Todo({
//
//   text:' Edit This Video'
//   // text:'Feed the cat',
//   // completed:true,
//   // completedAt:123
// });
//
// otherTodo.save().then((doc)=>{
//   console.log(JSON.stringify(doc,undefined,2));
// },(e)=>{
//   console.log('Unable to save',e);
// });

// var User=mongoose.model('User',{
//   email:{
//     type:String,
//     required:true,
//     minlength:1,
//     trim:true
//   }
// });
//  var user=new User({
// email:'iqbalict39@gmail.com'
//  });
// user.save().then((doc)=>{
//     console.log('User saved',doc);
// },(e)=>{
//   console.log('Unable to save user',e);
// });
