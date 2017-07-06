

var mongoose = require('mongoose');
var User = require('./models/User');

const dburl = 'mongodb://alexey:Paw%40123'
	+ '@studycluster-shard-00-00-14ucg.mongodb.net:27017'
	+ ',studycluster-shard-00-01-14ucg.mongodb.net:27017' 
	+ ',studycluster-shard-00-02-14ucg.mongodb.net:27017'
	+ '/findpaw?ssl=true&replicaSet=StudyCluster-shard-0&authSource=admin';

mongoose.connect(dburl);
//mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('connected successfully.');

  const alexey = new User({
	name: 'Alexey',
	username: 'alexey',
	password: 'password',
	});

	alexey.dudify(function(err, name){
		if(err) throw err;
		console.log('Your new name is ' + name);
	});

	alexey.save(function(err){
		if(err) throw err;
		console.log('User saved successfully!');
	});
});