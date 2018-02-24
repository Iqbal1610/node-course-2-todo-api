//const MongoClient= require('mongodb').MongoClient;
const {MongoClient,ObjectId}= require('mongodb');//object destructuring id generate



MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
  if(err){
  return  console.log('Unable to connect to Mongodb server');
  }
  console.log('Connected to Mongodb server');


//delete many

// db.collection('Todos').deleteMany({text:'Eat lunch'}).then((result)=>{
//   console.log(result);
// });

//delete one
// db.collection('Todos').deleteOne({text:'Eat lunch'}).then((result)=>{
//   console.log(result);
// });


// find one and delete

// db.collection('Todos').findOneAndDelete({completed:false}).then((result)=>{
//   console.log(result);
// });

//From user table
//db.collection('Users').deleteMany({name:'Bancha'});

db.collection('Users').findOneAndDelete({
  _id:new ObjectId("5a9106f302c4c31d60425f8b")
}).then((result)=>{
  console.log(JSON.stringify(result,undefined,2));
});
//db.close();
});
