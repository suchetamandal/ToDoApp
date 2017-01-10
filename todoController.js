var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var urlencodedParser= bodyParser.urlencoded({extended: false});

//Connect to mongo db
mongoose.connect('mongodb://sucheta:sucheta@ds161008.mlab.com:61008/tododb');

//Create a schema
var todoScema = new mongoose.Schema({
	item: String
});

//Create a todo Model
var Todo = mongoose.model('Todo',todoScema);
/*var itemOne = Todo({item: 'buy flowers'}).save(function(err){
	if(err) {
		throw err;
	}
	console.log('Item is saved');
});*/

//var data = [{item:'get Milk'},{item:'walk dog'}];


module.exports = function(app){
	
	app.get('/todo', function(req,res){
		Todo.find({},function(err,data){
			if(err){
				throw err;
			}
			res.render('todo',{todo:data});
		});
	});
	
    app.post('/todo', urlencodedParser, function(req,res){
    	var newTodo = Todo({item: req.body.item}).save(function(err,data){
    		if(err){
    			throw err;
    		}
    		res.json(data);
    	});
	});
    
    app.del('/todo/:item', function(req,res){
    	Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err,data){
    		if(err){
    			throw err;
    		}
    		res.json(data);
    	});
    });
};