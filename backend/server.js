require('dotenv').config();

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const jobRoutes = require('./routes/jobRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const applicationRoutes = require('./routes/applicationRoutes');

const app = express();

app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
	if (!req.body || typeof req.body !== 'object' || Array.isArray(req.body)) {
		req.body = {};
	}
	next();
});

app.get('/', (req, res) => {
	res.status(200).json({ message: 'Job Board API is running!' });
});

app.use('/api/jobs', jobRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/applications', applicationRoutes);

app.use((req, res) => {
	res.status(404).json({ message: 'Route not found' });
});

async function startServer() {
	try {
		await connectDB();
		const port = process.env.PORT || 5000;
		app.listen(port, () => {
			console.log(`Server is running on port ${port}`);
		});
	} catch (error) {
		console.error(error.message);
		process.exitCode = 1;
	}
}

if (require.main === module) {
	startServer();
}

module.exports = app;
