//const MongoClient= require('mongodb').MongoClient;
const {MongoClient,ObjectId}= require('mongodb');//object destructuring id generate

var obj=new ObjectId();
console.log(obj);
// var user={name:'Rubel',age:26};
// var {name}=user;
// console.log(name);


MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
  if(err){
  return  console.log('Unable to connect to Mongodb server');
  }
  console.log('Connected to Mongodb server');



// db.collection('Todos').insertOne({
// text:'something to do',
// completed:false
// },(err,result)=>{
//   if(err){
//     return console.log('Unable to insert in todo',err);
//   }
//   console.log(JSON.stringify(result.ops,undefined,2));
// });
// db.collection('Users').insertOne({
//
// name:'Iqbal',
// age:25,
// location:'Dhaka'
// },(err,result)=>{
//   if(err){
//     return console.log('Unable to insert in Users',err);
//   }
//console.log(JSON.stringify(result.ops[0]._id,undefined,2));//return id only
//   console.log(JSON.stringify(result.ops[0]._id.getTimestamp(),undefined,2));//ops returns the array of data
// });
  db.close();
});
