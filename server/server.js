require('./config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {authenticate} = require('./middleware/authenticate');

var app = express();
const port = process.env.PORT;

app.use(bodyParser.json());
app.post('/todos',authenticate, (req, res) => {
  var todo = new Todo({
    text: req.body.text,
    _creator:req.user._id // to add user who created the todo
  });

  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/todos',authenticate, (req, res) => {
  Todo.find({
    _creator:req.user._id
  }).then((todos) => {
    res.send({todos});
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/todos/:id', authenticate,(req, res) => {
  var id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Todo.findOne({
    _id:id,
    _creator:req.user._id
  }).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }

    res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  });
});

app.delete('/todos/:id',authenticate, (req, res) => {
  var id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Todo.findOneAndRemove({
    _id:id,
    _creator:req.user._id
  }).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }

    res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  });
});

app.patch('/todos/:id',authenticate, (req, res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ['text', 'completed']);

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findOneAndUpdate({ _id:id,_creator:req.user._id}, {$set: body}, {new: true}).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }

    res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  })
});

// POST /users
app.post('/users', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);
  var user = new User(body);

  user.save().then(() => {
    return user.generateAuthToken();
  }).then((token) => {
    res.header('x-auth', token).send(user);
  }).catch((e) => {
    res.status(400).send(e);
  })
});

app.get('/users/me', authenticate, (req, res) => {/// authenticate is middleware here
  res.send(req.user);
});

//POST/users/login{email,password}

app.post('/users/login',(req,res)=>{
  var body=_.pick(req.body,['email','password']);
  User.findByCredentials(body.email,body.password).then((user)=>{
  user.generateAuthToken().then((token)=>{
      res.header('x-auth', token).send(user);
  });
  }).catch((e)=>{
    res.status(400).send();
  });
});

app.delete('/users/me/token',authenticate,(req,res)=>{//authenticate is middleware here
  req.user.removeToken(req.token).then(()=>{
    res.status(200).send();
  },()=>{
    res.status(400).send();
  });
});


app.listen(port, () => {
  console.log(`Started up at port ${port}`);
});

module.exports = {app};







/// 92 section
// require('./config/config');
//
//
// const _=require('lodash');
//
// var express = require('express');
// var bodyParser = require('body-parser');
//
// var {ObjectId}=require('mongodb');
//
// var {mongoose} = require('./db/mongoose');
// var {Todo} = require('./models/todo');
// var {User} = require('./models/user');
// var{authenticate}=require('./middleware/authenticate');
//
// var app = express();
//  // for herku ur
//
//  const port=process.env.PORT || 3000;
//
//
// app.use(bodyParser.json());
// // for post data
// app.post('/todos', (req, res) => {
//   var todo = new Todo({
//     text: req.body.text
//   });
//
//   todo.save().then((doc) => {
//     res.send(doc);
//   }, (e) => {
//     res.status(400).send(e);
//   });
// });
//
// // for Get data
//
// app.get('/todos',(req,res)=>{
//   Todo.find().then((todos)=>{
//     res.send({todos})
//   },(e)=>{
//     res.status(400).send(e);
//   });
// });
//
// //Get/todos/1234324 like id
//
// app.get('/todos/:id',(req,res)=>{
//   var id=req.params.id;
// //valid id using isValid
// if(!ObjectId.isValid(id)){
//   return res.status(404).send();
// }
// //404- send back empty send
// //findById
// Todo.findById(id).then((todo)=>{
//   if(!todo){
//     return res.status(404).send();
//   }
// res.send({todo});// this object todo used in //GET/todos:id testing secttion
// }).catch((e)=>{
//   res.status(400).send();
// })
// });
//
// //used in mongoose-remove.js file
//
// app.delete('/todos/:id', (req, res) => {
//   var id = req.params.id;
//
//   if (!ObjectId.isValid(id)) {
//     return res.status(404).send();
//   }
//
//   Todo.findByIdAndRemove(id).then((todo) => {
//     if (!todo) {
//       return res.status(404).send();
//     }
//
//     res.send({todo});
//   }).catch((e) => {
//     res.status(400).send();
//   });
// });
//
// /// update process
//
// app.patch('/todos/:id',(req,res)=>{    ///patch is used for update
//   var id = req.params.id;
//
//   var body=_.pick(req.body,['text','completed']);
//   if (!ObjectId.isValid(id)) {
//     return res.status(404).send();
//   }
//
// if(_.isBoolean(body.completed)&& body.completed){
//
// body.completedAt=new Date().getTime();
//
// }else{
//
//   body.completed=false;
//   body.completedAt=null;
//   }
//
//  Todo.findByIdAndUpdate(id,{$set: body},{new:true}).then((todo)=>{
//    if(!todo){
//
//      return res.status(404).send();
//    }
//    res.send({todo});
//  }).catch((e)=>{
//    res.status(400).send();
//  });
//
// });
//
// ///Post /Users
//
//
// app.post('/users',(req,res)=>{
//   var body=_.pick(req.body,['email','password']);
//   var user=new User(body);
//
//
//
//   user.save().then(()=>{
//     return user.generateAuthToken();
//     //res.send(user);
//   }).then((token)=>{
//     res.header('x-auth',token).send(user); //here x-auth is custom authentication
//   }).catch((e)=>{
//     res.status(400).send(e);
//   });
// });
//
//
// // it is access from authenticate.js
// app.get('/users/me',authenticate,(req,res)=>{
//
//   res.send(req.user);
//
// });
//
// app.listen(port, () => {
//   console.log(`Started on port ${port}` );
// });
//
//
//  module.exports={app};
