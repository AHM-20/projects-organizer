import React from 'react';
//import { Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

const Project = ({ project, deleteProject }) => (
	<div>
		<Card>
			<CardContent>
				<Typography color="textSecondary" gutterBottom>
					{project.projectPay}
				</Typography>
				<Typography variant="h5" component="h2">
					{project.projectName}
				</Typography>
				<Typography color="textSecondary">adjective</Typography>
				{/* <Typography variant="body2" component="p">
					well meaning and kindly.
					<br />
					{'"a benevolent smile"'}
				</Typography> */}
			</CardContent>
			<CardActions>
				<Button
					size="medium"
					variant="contained"
					onClick={() => {
						deleteProject(project._id);
					}}
				>
					Delete
				</Button>
				<Button href={'/project/' + project._id} size="medium" variant="contained">
					Edit
				</Button>
			</CardActions>
		</Card>
		<Divider variant="middle" />
		<br />
	</div>
);

export default Project;
