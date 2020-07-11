import React from 'react';
//import { Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Box from '@material-ui/core/Box';

const Project = ({ project, deleteProject }) => (
	<div>
		<Card style={{ backgroundColor: '#fafafa' }}>
			<CardContent>
				<Typography color="textSecondary" gutterBottom component={'span'}>
					{project.projectPay}
				</Typography>
				<Typography variant="h5" component="h2">
					{project.projectName}
				</Typography>
				<Typography color="textSecondary" component={'span'}>
					adjective
					<Box textAlign="right" m={1}>
						Right aligned text.
					</Box>
				</Typography>
				<Grid container spacing={3}>
					<Grid item xs>
						<Box textAlign="center" m={1}>
							Right aligned text.
						</Box>
					</Grid>
					<Grid item xs>
						<Box textAlign="center" m={1}>
							Right aligned text.
						</Box>
					</Grid>
				</Grid>

				{/* <Typography variant="body2" component="p">
					well meaning and kindly.
					<br />
					{'"a benevolent smile"'}
				</Typography> */}
			</CardContent>
			<CardActions style={{ justifyContent: 'flex-end' }}>
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
				<IconButton href={'/project/' + project._id + '/edit'} aria-label="edit" color="primary">
					<EditIcon />
				</IconButton>
				<IconButton
					aria-label="delete"
					color="secondary"
					onClick={() => {
						if (window.confirm('Delete the project?')) {
							deleteProject(project._id);
						}
					}}
				>
					<DeleteIcon />
				</IconButton>
			</CardActions>
		</Card>
		<Divider variant="middle" />
		<br />
	</div>
);

export default Project;
