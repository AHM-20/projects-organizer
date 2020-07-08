const router = require('express').Router();
const Project = require('../models/project.model');

router.route('/').get((req, res) => {
	Project.find().then((projects) => res.json(projects)).catch((err) => res.status(400).json('Error:' + err));
});

router.route('/:projectID/details').get((req, res) => {
	Project.aggregate(
		[
			{
				$project: {
					_id: {
						//****** ADD THE REST OF THE PARAMS */
						$toString: '$_id'
					}
				}
			},
			{ $match: { _id: req.params.projectID } },
			{
				$lookup: {
					from: 'jobs', // collection to join
					localField: '_id', //field from the input documents
					foreignField: 'projectId', //field from the documents of the "from" collection
					as: 'jobsList' // output array field
				}
			},
			{
				$lookup: {
					from: 'others', // collection to join
					localField: '_id', //field from the input documents
					foreignField: 'projectId', //field from the documents of the "from" collection
					as: 'othesList' // output array field
				}
				// { $unwind: '$othesList' },
				// { $group: { _id: '$othesList.projectId', count: { $sum: 1 } } }
			}
			// { $unwind: '$othesList' },
			// { $group: { _id: '$othesList.projectId', count: { $sum: 1 } } }
		] //,
		// function(error, data) {
		// 	return res.json(data);
		// 	//handle error case also
		// }
	)
		.then((projectsData) => res.json(projectsData))
		.catch((err) => res.status(400).json('Error:' + err));
});

router.route('/:projectID/jobstotal').get((req, res) => {
	Project.aggregate([
		{
			$project: {
				_id: {
					$toString: '$_id'
				}
			}
		},
		{ $match: { _id: req.params.projectID } },
		{
			$lookup: {
				from: 'jobs', // collection to join
				localField: '_id', //field from the input documents
				foreignField: 'projectId', //field from the documents of the "from" collection
				as: 'jobsList' // output array field
			}
		},
		{ $unwind: '$jobsList' },
		{
			$group: {
				_id: '$jobsList.projectId',
				jobsCostTotal: { $sum: '$jobsList.jobCost' },
				jobsPayedTotal: { $sum: '$jobsList.totalPayed' }
			}
		},
		{
			$lookup: {
				from: 'jobs', // collection to join
				localField: '_id', //field from the input documents
				foreignField: 'projectId', //field from the documents of the "from" collection
				as: 'jobsList' // output array field
			}
		},
		{
			$lookup: {
				from: 'others', // collection to join
				localField: '_id', //field from the input documents
				foreignField: 'projectId', //field from the documents of the "from" collection
				as: 'othersList' // output array field
			}
		}

		// { $unwind: '$othersList' },

		// {
		// 	$group: {
		// 		_id: '$othersList.projectId',
		// 		sCostTotal: { $sum: '$othersList.otherCost' }
		// 		//	othersPayedTotal: { $sum: '$othersList.totalPayed' }
		// 	}
		// }
	])
		.then((projectsData) => res.json(projectsData))
		.catch((err) => res.status(400).json('Error:' + err));
});

/*
Job.aggregate({
	$group:{
		_id: "$projectId",
		jobsCostTotal: {$sum : "$jobCost"},
		jobsPayedTotal: {$sum : "$totalPayed"}
	}
})
*/

router.route('/add').post((req, res) => {
	const projectName = req.body.projectName;
	const projectPay = Number(req.body.projectPay);
	const payments = req.body.payments;
	// const totalRecieved = req.body.totalRecieved;
	// const totalPayed = req.body.totalPayed; //   in jobs add or update, find project by id and update totalpayed
	// const totalOwed = req.body.totalOwed;
	const deadline = Date.parse(req.body.deadline);
	const notes = req.body.notes;
	const newProject = new Project({
		projectName,
		projectPay,
		payments,
		deadline,
		notes
	});

	newProject.save().then(() => res.json('Project Added!')).catch((err) => res.status(400).json('Error:' + err));
});

router.route('/:id').get((req, res) => {
	Project.findById(req.params.id)
		.then((project) => res.json(project))
		.catch((err) => res.status(400).json('Error:' + err));
});

router.route('/:id').delete((req, res) => {
	Project.findByIdAndDelete(req.params.id)
		.then(() => res.json('Project Deleted!'))
		.catch((err) => res.status(400).json('Error:' + err));
});

router.route('/update/:id').post((req, res) => {
	Project.findById(req.params.id)
		.then((project) => {
			project.projectName = req.body.projectName;
			project.projectPay = Number(req.body.projectPay);
			project.payments = req.body.payments;
			project.deadline = Date.parse(req.body.deadline);
			project.notes = req.body.notes;

			project
				.save()
				.then(() => res.json('Project Updated!'))
				.catch((err) => res.status(400).json('Error:' + err));
		})
		.catch((err) => res.status(400).json('Error:' + err));
});

module.exports = router;
