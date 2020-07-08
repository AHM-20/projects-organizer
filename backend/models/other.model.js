const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const otherSchema = new Schema(
	{
		otherName: String,
		otherCost: Number,
		notes: String,
		projectId: {
			type: String,
			required: true
		}
	},
	{
		timestamps: true
	}
);

const Other = mongoose.model('Other', otherSchema);

module.exports = Other;
