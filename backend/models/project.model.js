const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const projectSchema = new Schema(
	{
		projectName: {
			type: String,
			required: true
		},
		projectPay: Number,
		payments: String,
		totalRecieved: Number,
		totalpayed: Number,
		totalOwed: Number,
		deadline: Date,
		notes: String
	},
	{
		timestamps: true
	}
);

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
