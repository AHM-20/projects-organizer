import React, { Component } from 'react';
import MaterialTable from 'material-table';
import axios from 'axios';
import Container from '@material-ui/core/Container';

export default class JobsList extends Component {
	constructor(props) {
		super(props);

		this.state = {
			columns: [
				{ title: 'Job Name', field: 'jobName' },
				{ title: 'Job Cost', field: 'jobCost', type: 'numeric' },
				{ title: 'Notes', field: 'notes' },
				{ title: 'Payments', field: 'payments' },
				{ title: 'Total Payed', field: 'totalPayed', type: 'numeric' }
			],
			data: [
				//{ name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 },
				// {
				// 	jobName: 'gigi',
				// 	jobCost: 989,
				// 	payments: 'somthing',
				// 	totalPayed: 1699,
				// 	notes: 'sohn'
				// }
			]
		};
	}

	componentDidMount() {
		axios
			.get('http://localhost:5000/projects/' + this.props.match.params.id + '/details')
			.then((response) => {
				this.setState({
					data: response.data[0].jobsList
					//others: response.data[0].othersList
				});
				console.log(response.data[0].jobsList + 'from db');
			})
			.catch((err) => console.log(err));
	}

	addJob = (newJob) => {
		const Job = {
			jobName: newJob.jobName,
			jobCost: newJob.jobCost,
			payments: newJob.payments,
			totalPayed: newJob.totalPayed,
			notes: newJob.notes,
			projectId: '5efcc89ca6630142686ed87f'
		};
		axios
			.post('http://localhost:5000/projects/' + this.props.match.params.id + '/jobs/add', Job)
			.then((res) => console.log(res.data))
			.catch((err) => console.log(err));
	};

	render() {
		return (
			<Container maxWidth="lg">
				<MaterialTable
					title="Jobs List"
					columns={this.state.columns}
					data={this.state.data}
					editable={{
						onRowAdd: (newData) =>
							new Promise((resolve) => {
								setTimeout(() => {
									resolve();
									this.addJob(newData);
									this.setState((prevState) => {
										const data = [ ...prevState.data ];
										data.push(newData);
										return { ...prevState, data };
									});
								}, 600);
							}),
						onRowUpdate: (newData, oldData) =>
							new Promise((resolve) => {
								console.log(oldData);
								setTimeout(() => {
									resolve();
									if (oldData) {
										this.setState((prevState) => {
											const data = [ ...prevState.data ];
											data[data.indexOf(oldData)] = newData;
											return { ...prevState, data };
										});
									}
								}, 600);
							}),
						onRowDelete: (oldData) =>
							new Promise((resolve) => {
								console.log(oldData);
								setTimeout(() => {
									resolve();
									this.setState((prevState) => {
										const data = [ ...prevState.data ];
										data.splice(data.indexOf(oldData), 1);
										return { ...prevState, data };
									});
								}, 600);
							})
					}}
				/>
			</Container>
		);
	}
}
