import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import 'react-datepicker/dist/react-datepicker.css';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import dateFormat from 'dateformat';

class EditProject extends Component {
	constructor(props) {
		super(props);

		this.state = {
			projectName: '',
			projectPay: 0,
			payments: '',
			deadline: new Date(),
			notes: ''
		};
	}

	onChangeProjectName = (e) => {
		this.setState({
			projectName: e.target.value
		});
	};
	onChangeProjectCost = (e) => {
		this.setState({
			projectPay: e.target.value
		});
	};
	onChangePayments = (e) => {
		this.setState({
			payments: e.target.value
		});
	};
	onChangeNotes = (e) => {
		this.setState({
			notes: e.target.value
		});
	};

	onChangeDeadline = (deadline) => {
		this.setState({
			deadline: deadline.target.value
		});
		console.log(deadline.target.value);
	};

	componentDidMount() {
		axios
			.get('http://localhost:5000/projects/' + this.props.match.params.id)
			.then((response) => {
				this.setState({
					projectName: response.data.projectName,
					projectPay: response.data.projectPay,
					payments: response.data.payments,
					deadline: dateFormat(response.data.deadline, 'yyyy-mm-dd'),
					notes: response.data.notes
				});
				console.log(this.state);
				console.log(dateFormat(response.data.deadline, 'yyyy-mm-dd'));
			})
			.catch((error) => console.log(error));
		//console.log(this.state);
	}

	onSubmit = (e) => {
		e.preventDefault();
		const project = {
			projectName: this.state.projectName,
			projectPay: this.state.projectPay,
			payments: this.state.payments,
			deadline: this.state.deadline,
			notes: this.state.notes
		};
		console.log(project);
		axios
			.post('http://localhost:5000/projects/update/' + this.props.match.params.id, project)
			.then((res) => console.log(res.data))
			.catch((err) => console.log(err));
		window.location = '/'; //redirect to exercises list
	};

	render() {
		return (
			<React.Fragment>
				<Container maxWidth="md">
					<Paper elevation={6} style={{ padding: '20px 35px', borderRadius: '15px' }}>
						<form onSubmit={this.onSubmit}>
							<br />
							<Typography variant="h6" gutterBottom>
								Update Project
							</Typography>
							<br />
							<Grid container spacing={3}>
								<Grid item xs={12} sm={6}>
									<TextField
										required
										id="projectName"
										name="projectName"
										label="Project name"
										value={this.state.projectName}
										onChange={this.onChangeProjectName}
										fullWidth
										autoComplete="given-name"
									/>
								</Grid>
								<Grid item xs={12} sm={6}>
									<TextField
										required
										id="projectPay"
										name="projectPay"
										label="Project pay"
										value={this.state.projectPay}
										onChange={this.onChangeProjectCost}
										fullWidth
										autoComplete="family-name"
									/>
								</Grid>

								<Grid item xs={12} sm={6}>
									<TextField
										required
										id="payments"
										name="payments"
										label="Payments"
										value={this.state.payments}
										onChange={this.onChangePayments}
										fullWidth
										autoComplete="shipping address-level2"
									/>
								</Grid>
								<Grid item xs={12} sm={6}>
									<TextField
										id="deadline"
										type="date"
										name="deadline"
										label="Deadline"
										value={this.state.deadline}
										onChange={this.onChangeDeadline}
										// onChange={(event) => {
										// 	this.setState({ value: event.target.value });
										// }}
										InputLabelProps={{
											shrink: true
										}}
										margin="none"
										fullWidth
									/>
								</Grid>
								<Grid item xs={12}>
									<TextField
										id="notes"
										name="notes"
										label="Notes"
										value={this.state.notes}
										onChange={this.onChangeNotes}
										fullWidth
										autoComplete="shipping address-line2"
									/>
								</Grid>
								<Grid item xs={12}>
									<br />
									<Button type="submit" variant="contained" color="primary">
										Submit
									</Button>
								</Grid>
							</Grid>
						</form>
					</Paper>
				</Container>
			</React.Fragment>
		);
	}
}

export default EditProject;
