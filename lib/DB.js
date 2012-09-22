var MongooseDriver = require('./drivers/mongoose');

module.exports = DB;

var repo = {}

function DB(name,driver){
	this._driver =  driver;
	this._name = name;
	repo[this._name] = this;

	/*
		return a extensions object.reference driver description.
	*/
	this.extensions = driver.extendsions;
}

DB.get = function(name){
	return repo[name];
}

DB.driver = {}
DB.driver.Mongoose = MongooseDriver;

DB.prototype = {
	/*
		callback(err);
	*/
	remove:function(id,callback){
		this._driver.remove(id,callback);
	},

	/* 
		callback(err)
	*/
	update:function(id,data,callback){
		this._driver.update(id,data,callback);
	},

	/*
		callback(err,id)
	*/
	save:function(data,callback){
		this._driver.save(data,callback);
	}

}
