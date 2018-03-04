//setting environment both for local and heroku

var env=process.env.NODE_ENV || 'development';
//// dynamic config
if(env==='development' || env==='test'){
  var config=require('./config.json');
  var envConfig=config[env];

Object.keys(envConfig).forEach((key)=>{
  process.env[key]=envConfig[key];
});
}

//// loaclly config

// if(env==='development'){
//   process.env.PORT=3000;
//   process.env.MONGODB_URI='mongodb://localhost:27017/TodoApp';
// }else if (env==='test') {
//     process.env.PORT=3000;
//     process.env.MONGODB_URI='mongodb://localhost:27017/TodoAppTest';
// }
