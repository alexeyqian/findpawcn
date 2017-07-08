var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var lostpawSchema = new Schema({
	lost_date: {type: Date, required: true},
	zipcode: String,
	location: String,
	breed: {type: String, required: true},
	color: {type: String, required: true},
	size: {type: String, required: true},
	description: String,
	created_by: {type: String, required: true},
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

var LostPaw = mongoose.model('LostPaw', lostpawSchema);

module.exports = LostPaw;