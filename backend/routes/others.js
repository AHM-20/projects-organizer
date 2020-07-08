const router = require('express').Router({ mergeParams: true });
const Other = require('../models/other.model');

router.route('/').get((req, res) => {
	//get jobs where id = projectid ** chnage this **
	Other.find().then((Others) => res.json(Others)).catch((err) => res.status(400).json('Error:' + err));
});

router.route('/add').post((req, res) => {
	const otherName = req.body.otherName;
	const otherCost = Number(req.body.otherCost);
	const notes = req.body.notes;
	const projectId = req.params.id;
	console.log(req.params.id);
	const newOther = new Other({
		otherName,
		otherCost,
		notes,
		projectId
	});

	newOther.save().then(() => res.json('Other Added!')).catch((err) => res.status(400).json('Error:' + err));
});

router.route('/:OtherId').get((req, res) => {
	Other.findById(req.params.jobId)
		.then((other) => res.json(other))
		.catch((err) => res.status(400).json('Error:' + err));
});

router.route('/:OtherId').delete((req, res) => {
	Other.findByIdAndDelete(req.params.OtherId)
		.then(() => res.json('Other Deleted!'))
		.catch((err) => res.status(400).json('Error:' + err));
});

router.route('/update/:OtherId').post((req, res) => {
	Other.findById(req.params.OtherId)
		.then((other) => {
			other.otherName = req.body.otherName;
			other.otherCost = Number(req.body.otherCost);
			other.notes = req.body.notes;
			other.projectId = req.params.id;

			other.save().then(() => res.json('Other Updated!')).catch((err) => res.status(400).json('Error:' + err));
		})
		.catch((err) => res.status(400).json('Error:' + err));
});

module.exports = router;
