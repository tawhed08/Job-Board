const mongoose = require('mongoose');
const Application = require('../models/Application');
const Job = require('../models/Job');

function sendError(res, error) {
	if (error.name === 'ValidationError' || error.name === 'CastError') {
		return res.status(400).json({ message: 'Invalid input' });
	}
	return res.status(500).json({ message: 'Server error' });
}

function populateJob(query) {
	return query.populate({
		path: 'job',
		populate: { path: 'category' }
	});
}

exports.createApplication = async (req, res) => {
	try {
		const requiredFields = ['job', 'name', 'email', 'phone'];
		const missingField = requiredFields.some((field) => {
			const value = req.body[field];
			return typeof value !== 'string' || !value.trim();
		});
		if (missingField) {
			return res.status(400).json({ message: 'Required application fields are missing or invalid' });
		}
		if (!mongoose.isValidObjectId(req.body.job)) {
			return res.status(400).json({ message: 'Invalid job ID' });
		}
		if (!(await Job.exists({ _id: req.body.job }))) {
			return res.status(400).json({ message: 'Job not found' });
		}

		const application = await Application.create({
			job: req.body.job,
			name: req.body.name,
			email: req.body.email,
			phone: req.body.phone,
			resume: req.body.resume,
			coverLetter: req.body.coverLetter,
			status: req.body.status
		});
		return res.status(201).json(await populateJob(Application.findById(application._id)));
	} catch (error) {
		return sendError(res, error);
	}
};

exports.getApplications = async (req, res) => {
	try {
		return res.status(200).json(await populateJob(Application.find()));
	} catch (error) {
		return sendError(res, error);
	}
};

exports.getApplicationById = async (req, res) => {
	try {
		if (!mongoose.isValidObjectId(req.params.id)) {
			return res.status(400).json({ message: 'Invalid application ID' });
		}
		const application = await populateJob(Application.findById(req.params.id));
		if (!application) return res.status(404).json({ message: 'Application not found' });
		return res.status(200).json(application);
	} catch (error) {
		return sendError(res, error);
	}
};

exports.updateApplication = async (req, res) => {
	try {
		if (!mongoose.isValidObjectId(req.params.id)) {
			return res.status(400).json({ message: 'Invalid application ID' });
		}
		if (req.body.job !== undefined) {
			if (!mongoose.isValidObjectId(req.body.job)) {
				return res.status(400).json({ message: 'Invalid job ID' });
			}
			if (!(await Job.exists({ _id: req.body.job }))) {
				return res.status(400).json({ message: 'Job not found' });
			}
		}

		const updates = {};
		['job', 'name', 'email', 'phone', 'resume', 'coverLetter', 'status'].forEach((field) => {
			if (req.body[field] !== undefined) updates[field] = req.body[field];
		});
		const application = await populateJob(
			Application.findByIdAndUpdate(req.params.id, updates, {
				new: true,
				runValidators: true
			})
		);
		if (!application) return res.status(404).json({ message: 'Application not found' });
		return res.status(200).json(application);
	} catch (error) {
		return sendError(res, error);
	}
};

exports.deleteApplication = async (req, res) => {
	try {
		if (!mongoose.isValidObjectId(req.params.id)) {
			return res.status(400).json({ message: 'Invalid application ID' });
		}
		const application = await Application.findByIdAndDelete(req.params.id);
		if (!application) return res.status(404).json({ message: 'Application not found' });
		return res.status(200).json({ message: 'Application deleted successfully' });
	} catch (error) {
		return sendError(res, error);
	}
};
