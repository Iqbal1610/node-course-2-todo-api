
const{ObjectId}=require('mongodb');

const {mongoose}=require('./../server/db/mongoose');
const {Todo}=require('./../server/models/todo');
const {User}=require('./../server/models/user');

// In the todo table
// var id='5a93e646fbb1223b3c144cc1';
//  if(!ObjectId.isValid(id)){
//    console.log('Id not valid');
//  }
//
// // Todo.find({
// //   _id:id
// // }).then((todos)=>{
// //   console.log('Todos',todos);
// // });
// //
// // Todo.findOne({
// //   _id:id
// // }).then((todo)=>{
// //   console.log('Todo',todo);
// // });
//
// Todo.findById(id).then((todo)=>{
//   if(!todo){
//     return console.log('Id not found');
//   }
//   console.log('Todo By Id',todo);
// }).catch((e)=>console.log(e));



// now using User

// var id='5a9251604b44910a0c0840d2';
// if(!ObjectId.isValid(id)){
//     console.log('Id not valid');
//  }
//
//  User.find({
//    _id:id
//  }).then((users)=>{
//    console.log('Users',users);
//  });
//
//  User.findOne({
//    _id:id
//  }).then((user)=>{
//    console.log('User',user);
//  });
//
//  User.findById(id).then((user)=>{
//    if(!user){
//      console.log('Id not Found');
//    }
//    console.log('user By Id',user);
//  }).catch((e)=>console.log(e));


User.findById('5a9251604b44910a0c0840d2').then((user)=>{
  if(!user){
    return console.log('Unable to find User');
  }
  console.log(JSON.stringify(user,undefined,2));
},(e)=>{
  console.log(e);
});
