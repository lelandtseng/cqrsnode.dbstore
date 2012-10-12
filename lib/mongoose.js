var mongoose = require('mongoose'),
 	  Schema = mongoose.Schema,
	  ObjectId = Schema.ObjectId;


module.exports =  Mongo;

function Mongo(cfg){

	var models = {}

	var db = mongoose.createConnection(cfg.url,cfg.dbname);

	var schemas = cfg.schemas;
	
	for(var k in schemas){
		if(schemas.hasOwnProperty(k)){
		models[k] = db.model(k,mongoose.Schema(schemas[k]));	
		}
	}

	this.remove = function(AggreName,id,callback){
		models[AggreName].remove({id:id},callback);
	}

	this.save = function(AggreName,data,callback){
		var o = new models[AggreName](data);
		o.save(callback);
	}

	this.update = function(AggreName,id,data,callback){
		models[AggreName].update({id:id},data,callback);
	}
	
	this.find = function(AggreName){
		var name = [].shift.apply(arguments);
		var model = models[name];
		model.find.apply(model,arguments);
	}	

}
