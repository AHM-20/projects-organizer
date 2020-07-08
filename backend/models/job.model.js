const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const jobSchema = new Schema(
	{
		jobName: String,
		jobCost: Number,
		payments: String,
		totalPayed: Number,
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

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;
