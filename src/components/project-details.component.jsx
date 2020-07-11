import React, { Component } from 'react';
import axios from 'axios';

class ProjectDetails extends Component {
	constructor(props) {
		super(props);

		this.state = {
			jobs: [],
			others: []
		};
	}

	componentWillMount() {
		axios
			.get('http://localhost:5000/projects/' + this.props.match.params.id + '/details')
			.then((response) => {
				this.setState({
					jobs: response.data.jobsList,
					others: response.data.othersList
				});
				console.log(response.data);
			})
			.catch((err) => console.log(err));
	}

	render() {
		return <div />;
	}
}

export default ProjectDetails;
