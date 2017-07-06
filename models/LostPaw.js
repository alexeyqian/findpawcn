var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var lostpawSchema = new Schema({
	name: String,
	username: {type: String, required: true, unique: true},
	password: {type: String, required: true},
	admin: Boolean,
	location: String,
	meta: {
		age: Number,
		website: String
	},
	created_at: Date,
	updated_at: Date
});

lostpawSchema.pre('save', function(next){
	const currentDate = new Date();
	this.updated_at = currentDate;
	if(!this.created_at)
		this.created_at = currentDate;

	next();
});

lostpawSchema.methods.dudify = function(){
	this.name = this.name + '-dude';
	return this.name;
};

var LostPaw = mongoose.model('User', lostpawSchema);

module.exports = LostPaw;