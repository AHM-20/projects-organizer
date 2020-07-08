const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;

mongoose
	.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
	.then(() => console.log('Database Connected'))
	.catch((err) => console.log(err));

const projectsRouter = require('./routes/projects');
const jobsRouter = require('./routes/jobs');
const othersRouter = require('./routes/others');

app.use('/projects', projectsRouter);
app.use('/projects/:id/jobs', jobsRouter);
app.use('/projects/:id/others', othersRouter);

app.listen(port, () => {
	console.log(`Server is Running on Port: ${port}`);
});
