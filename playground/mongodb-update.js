// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');

  // db.collection('Todos').findOneAndUpdate({
  //   _id: new ObjectID('57bc4b15b3b6a3801d8c47a2')
  // }, {
  //   $set: {
  //     completed: true
  //   }
  // }, {
  //   returnOriginal: false
  // }).then((result) => {
  //   console.log(result);
  // });

  db.collection('Users').findOneAndUpdate({
    _id: new ObjectID('57abbcf4fd13a094e481cf2c')
  }, {
    $set: {
      name: 'Andrew'
    },
    $inc: {
      age: 1
    }
  }, {
    returnOriginal: false
  }).then((result) => {
    console.log(result);
  });

  // db.close();
});




// //const MongoClient= require('mongodb').MongoClient;
// const {MongoClient,ObjectId}= require('mongodb');//object destructuring id generate
//
//
//
// MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
//   if(err){
//   return  console.log('Unable to connect to Mongodb server');
//   }
//   console.log('Connected to Mongodb server');
//
// // db.collection('Todos').findOneAndUpdate({
// //   _id:new ObjectId('5a911060ff7c45d6cd5a9a57')
// // },
// // {
// //   $set:{
// //     completed:true
// //   }
// // },{
// //   returnOriginal:false
// // }).then((result)=>{
// //   console.log(result);
// // });
//
// db.collection('Users').findOneAndUpdate({
//   _id:new ObjectId('5a91072538c7d22fc05d3114')
// },
// {
//   $set:{
//     name:"Ibrahim"
//   },
//   $inc:{
//     age:1
//   }
// },{
//   returnOriginal:false
// }).then((result)=>{
//   console.log(result);
// });
//
// //db.close();
// });
