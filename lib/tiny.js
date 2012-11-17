var path = require('path');

var Tiny = require('tiny');
module.exports = DB;

function DB(cfg){

	var dbs = {}

    function init(dbname){
        Tiny(path.join(cfg.mainpath,cfg.names[n]),function(err,db){
            dbs[dbname] = db;
        });
    }
	for(var n in cfg.names){
        var dbname = cfg.names[n];
        init(dbname);
	}


	this.remove = function(AggreName,id,callback){
		dbs[AggreName].remove(id,callback)
	}		

	this.save = function(AggreName,data,callback){
		dbs[AggreName].set(data.id,data,callback)
	}

	this.update = function(AggreName,id,data,callback){
		dbs[AggreName].update(id,data,callback);
	}

	this.find = function(AggreName){
		var name = [].shift.apply(arguments);
		var db = dbs[name];
		return db.find.apply(db,arguments);	
	}
	
}

