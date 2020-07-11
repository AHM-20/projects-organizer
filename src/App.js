import React from 'react';
import NavBar from './components/navbar.component';
import ProjectsList from './components/projects-list.component';
import AddProject from './components/add-project.component';
import EditProject from './components/edit-project.component ';
//import ProjectDetails from './components/project-details.component';
import ProjectDetails from './components/project-details.component';
import JobsList from './components/jobs-list.component';
import { BrowserRouter as Router, Route } from 'react-router-dom';

export default function App() {
	return (
		<Router>
			<NavBar />
			<br />
			<Route path="/" exact component={ProjectsList} />
			<Route path="/add" component={AddProject} />
			<Route path="/project/:id/edit" component={EditProject} />
			<Route path="/project/:id/details" exact component={ProjectDetails} />
			<Route path="/project/:id/jobs" exact component={JobsList} />
		</Router>
	);
}
