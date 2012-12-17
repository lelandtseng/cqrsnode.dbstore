var path = require('path');
var EventEmitter = require('events').EventEmitter;
var Tiny = require('tiny');
module.exports = DB;

function DB(cfg){

    var emitter = new EventEmitter;

	var dbs = {}
    var nameNum = 0;


    function init(dbname){
        Tiny(path.join(cfg.mainpath,cfg.names[n]),function(err,db){
            dbs[dbname] = db;
            ++nameNum;
            if(nameNum === cfg.names.length){
                emitter.emit('complete');
            }
        });
    }
	for(var n in cfg.names){
        var dbname = cfg.names[n];
        init(dbname);
	}

    this.on = function(n,handle){
        if(n === 'complete'){
            if(cfg.names.length === nameNum){
                handle();
            }else{
                emitter.on('complete',handle);
            }
        }
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

