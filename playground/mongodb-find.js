// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');

  // db.collection('Todos').find({
  //   _id: new ObjectID('57bb36afb3b6a3801d8c479d')
  // }).toArray().then((docs) => {
  //   console.log('Todos');
  //   console.log(JSON.stringify(docs, undefined, 2));
  // }, (err) => {
  //   console.log('Unable to fetch todos', err);
  // });

  // db.collection('Todos').find().count().then((count) => {
  //   console.log(`Todos count: ${count}`);
  // }, (err) => {
  //   console.log('Unable to fetch todos', err);
  // });

  db.collection('Users').find({name: 'Andrew'}).toArray().then((docs) => {
    console.log(JSON.stringify(docs, undefined, 2));
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
// //db.collection('Todos').find({completed:false}).toArray().then((docs)=>{ //query for completed value
// //query for id
// // db.collection('Todos').find({
// //   _id:new ObjectId('5a911060ff7c45d6cd5a9a57')
// // }).toArray().then((docs)=>{
// //   console.log('Todos');
// //   console.log(JSON.stringify(docs,undefined,2));
// // },(err)=>{
// //   console.log('Unable to fetch todos',err);
// // })
//
// // db.collection('Todos').find().count().then((count)=>{
// //   console.log(`Todos count:${count}`);
// //
// // },(err)=>{
// //   console.log('Unable to fetch todos',err);
// // })
//  db.collection('Users').find({name:'Iqbal'}).toArray().then((docs)=>{
//    console.log(JSON.stringify(docs,undefined,2));
//  });
//
// //db.close();
// });
