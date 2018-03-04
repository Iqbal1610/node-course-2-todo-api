const {ObjectID} = require('mongodb');
const jwt = require('jsonwebtoken');

const {Todo} = require('./../../models/todo');
const {User} = require('./../../models/user');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();
const users = [{
  _id: userOneId,
  email: 'andrew@example.com',
  password: 'userOnePass',
  tokens: [{
    access: 'auth',
    token: jwt.sign({_id: userOneId, access: 'auth'}, process.env.JWT_SECRET).toString()
  }]
}, {
  _id: userTwoId,
  email: 'jen@example.com',
  password: 'userTwoPass',
  tokens: [{
    access: 'auth',
    token: jwt.sign({_id: userTwoId, access: 'auth'}, process.env.JWT_SECRET).toString()
  }]
}];

const todos = [{
  _id: new ObjectID(),
  text: 'First test todo',
  _creator:userOneId
}, {
  _id: new ObjectID(),
  text: 'Second test todo',
  completed: true,
  completedAt: 333,
  _creator:userTwoId
}];

const populateTodos = (done) => {
  Todo.remove({}).then(() => {
    return Todo.insertMany(todos);
  }).then(() => done());
};

const populateUsers = (done) => {
  User.remove({}).then(() => {
    var userOne = new User(users[0]).save();
    var userTwo = new User(users[1]).save();

    return Promise.all([userOne, userTwo])
  }).then(() => done());
};

module.exports = {todos, populateTodos, users, populateUsers};






// const {ObjectId}=require('mongodb');
// const jwt=require('jsonwebtoken');
//
//
//  const{Todo}=require('./../../models/todo');
//
// const {User}=require('./../../models/user');
//
// //create user with token and without token
// const userOneId=new ObjectId();
// const userTwoId=new ObjectId();
//
// const users=[{
//   _id:userOneId,
//   email:'andrew@example.com',
//   password:'userOnePass',
//   tokens:[{
//     access:'auth',
//     token:jwt.sign({_id:userOneId,access:'auth'},'abc123').toString()
//   }]
// },{
//   _id:userTwoId,
//   email:'jen@example.com',
//   password:'userTwoPass'
// }];
//
//
//
// // dummy data for testing Get method
// const todos=[{
//   _id:new ObjectId(),
//   text:'First test todo'
// },{
//     _id:new ObjectId(),
//   text:'2nd test todo',
//   completed:true,
//   completedAt:333
// }];
//
//
// //// saving user in database
// const populateTodos=(done) => {
//   Todo.remove({}).then(() => {
//     return Todo.insertMany(todos);
//   }).then(()=>done())
// };
//
// const populateUser=(done)=>{
//   User.remove({}).then(()=>{
//     var userOne=new User(users[0]).save();
//     var userTwo=new User(users[1]).save();
//
//     return Promise.all([userOne,userTwo])
//   }).then(()=>done());
// };
//
// module.exports={todos,populateTodos,users,populateUser};
