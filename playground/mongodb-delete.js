// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');

  // deleteMany
  // db.collection('Todos').deleteMany({text: 'Eat lunch'}).then((result) => {
  //   console.log(result);
  // });

  // deleteOne
  // db.collection('Todos').deleteOne({text: 'Eat lunch'}).then((result) => {
  //   console.log(result);
  // });

  // findOneAndDelete
  // db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
  //   console.log(result);
  // });

  // db.collection('Users').deleteMany({name: 'Andrew'});

  db.collection('Users').findOneAndDelete({
    _id: new ObjectID("57ac8d47878a299e5dc21bc8")
  }).then((results) => {
    console.log(JSON.stringify(results, undefined, 2));
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
//
// //delete many
//
// // db.collection('Todos').deleteMany({text:'Eat lunch'}).then((result)=>{
// //   console.log(result);
// // });
//
// //delete one
// // db.collection('Todos').deleteOne({text:'Eat lunch'}).then((result)=>{
// //   console.log(result);
// // });
//
//
// // find one and delete
//
// // db.collection('Todos').findOneAndDelete({completed:false}).then((result)=>{
// //   console.log(result);
// // });
//
// //From user table
// //db.collection('Users').deleteMany({name:'Bancha'});
//
// db.collection('Users').findOneAndDelete({
//   _id:new ObjectId("5a9106f302c4c31d60425f8b")
// }).then((result)=>{
//   console.log(JSON.stringify(result,undefined,2));
// });
// //db.close();
// });
