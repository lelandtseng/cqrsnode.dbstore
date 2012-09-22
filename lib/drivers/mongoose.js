var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	ObjectId = Schema.ObjectId;

var db = mongoose.createConnection('localhost','cqrsnodedb');

module.exports =  Mongo;

function Mongo(name,fields){
	var sc = {}
	fields.forEach(function(f){
		sc[f] = {}
	})
	var schema = new Schema(sc);
	var Model = db.model(name,schema);

	// the extensions is a Model, see http://www.mongoosejs.com
	this.extensions = Model;

	this.remove = function(id,callback){
		Model.remove({id:id},callback);
	}

	this.save = function(data,callback){
		var o = new Model(data);
		o.save(callback);
	}

	this.update = function(id,data,callback){
		Model.update({id:id},data,callback);
	}

}
