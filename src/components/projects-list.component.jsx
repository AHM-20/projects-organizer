import React, { Component } from 'react';
//import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import Project from './project.component';

export default class ProjectsList extends Component {
	constructor(props) {
		super(props);

		this.state = { projects: [] };
	}

	componentWillMount() {
		axios
			.get('http://localhost:5000/projects/')
			.then((response) => {
				this.setState({ projects: response.data });
				console.log(response.data);
			})
			.catch((err) => console.log(err));
	}

	deleteProject = (id) => {
		axios
			.delete('http://localhost:5000/projects/' + id)
			.then((res) => console.log(res.data))
			.catch((err) => console.log(err));
		this.setState({
			projects: this.state.projects.filter((el) => el._id !== id)
		});
	};

	render() {
		//const classes = useStyles();
		//const bull = <span className={classes.bullet}>•</span>;

		return (
			<Container maxWidth="md">
				{this.state.projects.map((project) => {
					return <Project project={project} deleteProject={this.deleteProject} key={project._id} />;
				})}
			</Container>
		);
	}
}
