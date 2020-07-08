const router = require('express').Router({ mergeParams: true });
const Job = require('../models/job.model');

router.route('/').get((req, res) => {
	//get jobs where id = projectid ** chnage this **
	Job.find().then((jobs) => res.json(jobs)).catch((err) => res.status(400).json('Error:' + err));
});

router.route('/add').post((req, res) => {
	const jobName = req.body.jobName;
	const jobCost = Number(req.body.jobCost);
	const payments = req.body.payments;
	const totalPayed = Number(req.body.totalPayed);
	const notes = req.body.notes;
	const projectId = req.params.id;
	console.log(req.params.id);
	const newJob = new Job({
		jobName,
		jobCost,
		payments,
		totalPayed,
		notes,
		projectId
	});

	newJob.save().then(() => res.json('Job Added!')).catch((err) => res.status(400).json('Error:' + err));
});

router.route('/:jobId').get((req, res) => {
	Job.findById(req.params.jobId).then((job) => res.json(job)).catch((err) => res.status(400).json('Error:' + err));
});

router.route('/:jobId').delete((req, res) => {
	Job.findByIdAndDelete(req.params.jobId)
		.then(() => res.json('Job Deleted!'))
		.catch((err) => res.status(400).json('Error:' + err));
});

router.route('/update/:jobId').post((req, res) => {
	Job.findById(req.params.jobId)
		.then((job) => {
			job.jobtName = req.body.jobtName;
			job.jobCost = Number(req.body.jobCost);
			job.payments = req.body.payments;
			job.totalPayed = Number(req.body.totalPayed);
			job.notes = req.body.notes;
			job.projectId = req.params.id;

			job.save().then(() => res.json('Job Updated!')).catch((err) => res.status(400).json('Error:' + err));
		})
		.catch((err) => res.status(400).json('Error:' + err));
});

module.exports = router;
