var assert = require('assert');
var should = require('should');
var DB = require('..');


describe('db', function(){
var Driver  =  DB.Mongoose;
var driver = new Driver('User',['id','name','age'])
var db = new DB('User',driver);
  describe('#new', function(){
    it('create new obj', function(done){

        db.save({id:"abc",name:'brighthas'},done)

    })
  })

  describe('#update', function(){
    it('update obj', function(done){

       var dd = DB.get('User');
       dd.update('abc',{name:'dddddddddddddddddd'},done)

    })
  })

  describe('#remove', function(){
    it('remove a obj', function(done){

       var dd = DB.get('User');
       dd.remove('abc',done)

    })
  })
})
