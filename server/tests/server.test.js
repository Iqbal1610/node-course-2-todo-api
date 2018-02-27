const expect = require('expect');
const request = require('supertest');
const{ObjectId}=require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');
// dummy data for testing Get method
const todos=[{
  _id:new ObjectId(),
  text:'First test todo'
},{
    _id:new ObjectId(),
  text:'2nd test todo'
}];

// remove all data from database
beforeEach((done) => {
  Todo.remove({}).then(() => {
    return Todo.insertMany(todos);
  }).then(()=>done())
});

// post test
describe('POST /todos', () => {
  it('should create a new todo', (done) => {
    var text = 'Test todo text';
//use super test method
    request(app)
      .post('/todos')
      .send({text})
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.find({text}).then((todos) => {
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
          done();
        }).catch((e) => done(e));
      });
  });

  it('should not create todo with invalid body data', (done) => {

//use super test method
    request(app)
      .post('/todos')
      .send({})
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.find().then((todos) => {
          expect(todos.length).toBe(2);
          done();
        }).catch((e) => done(e));
      });
  });
});
// GET TEST
describe('GET/todos',()=>{
  it('should get all todos',(done)=>{

//use super test method
    request(app)
    .get('/todos')
    .expect(200)
    .expect((res)=>{
      expect(res.body.todos.length).toBe(2);
    })
    .end(done);
  });
});

//GET/todos:id testing

describe('GET/todos/:id',()=>{
  it('should return todo doc',(done)=>{

//use super test method
    request(app)
    .get(`/todos/${todos[0]._id.toHexString()}`)  //toHexString function used for converting the id to string
    .expect(200)
    .expect((res)=>{
      expect(res.body.todo.text).toBe(todos[0].text);// here todo comes from server.js as object see server.js
    })
    .end(done);
  });

  it('should return a 404 if todo not found',(done)=>{
     var hexId= new ObjectId().toHexString();

     request(app)
     .get(`/todos/$ {hexId}`)
     .expect(404)
     .end(done);
  });

  it('should return 404 for non-object ids',(done)=>{

      request(app)
      .get('/todos/123abc')
      .expect(404)
      .end(done);

  });
});

// delete document testing


describe('DELETE /todos/:id', () => {
  it('should remove a todo', (done) => {
    var hexId = todos[1]._id.toHexString();

    request(app)
      .delete(`/todos/${hexId}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo._id).toBe(hexId);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.findById(hexId).then((todo) => {
          expect(todo).toNotExist();
          done();
        }).catch((e) => done(e));
      });
  });
  it('should return 404 if not found',(done)=>{
    var hexId= new ObjectId().toHexString();

    request(app)
    .delete(`/todos/$ {hexId}`)
    .expect(404)
    .end(done);
  });
  it('should return 404 if ObjectId is invalid',(done)=>{
    request(app)
    .delete('/todos/123abc')
    .expect(404)
    .end(done);
  });
})
