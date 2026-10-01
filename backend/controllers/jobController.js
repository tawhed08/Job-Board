const mongoose = require('mongoose');
const Category = require('../models/Category');
const Job = require('../models/Job');

const requiredFields = ['title', 'company', 'description', 'location', 'category', 'jobType'];
const editableFields = [
	...requiredFields,
	'salary',
	'requirements',
	'responsibilities',
	'deadline'
];

function hasRequiredJobFields(job) {
	return requiredFields.every((field) => {
		const value = job[field];
		return typeof value === 'string' ? value.trim().length > 0 : Boolean(value);
	});
}

function sendError(res, error) {
	if (error.name === 'ValidationError' || error.name === 'CastError') {
		return res.status(400).json({ message: 'Invalid input' });
	}
	return res.status(500).json({ message: 'Server error' });
}

exports.createJob = async (req, res) => {
	try {
		if (!hasRequiredJobFields(req.body)) {
			return res.status(400).json({ message: 'Required job fields are missing or invalid' });
		}
		if (!mongoose.isValidObjectId(req.body.category)) {
			return res.status(400).json({ message: 'Invalid category ID' });
		}
		if (!(await Category.exists({ _id: req.body.category }))) {
			return res.status(400).json({ message: 'Category not found' });
		}

		const jobData = {};
		editableFields.forEach((field) => {
			if (req.body[field] !== undefined) jobData[field] = req.body[field];
		});
		const job = await Job.create(jobData);
		return res.status(201).json(await job.populate('category'));
	} catch (error) {
		return sendError(res, error);
	}
};

exports.getJobs = async (req, res) => {
	try {
		const filter = {};
		if (req.query.search) {
			const search = new RegExp(req.query.search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
			filter.$or = [
				{ title: search },
				{ company: search },
				{ location: search }
			];
		}
		if (req.query.category) {
			if (!mongoose.isValidObjectId(req.query.category)) {
				return res.status(400).json({ message: 'Invalid category ID' });
			}
			filter.category = req.query.category;
		}

		const jobs = await Job.find(filter).populate('category');
		return res.status(200).json(jobs);
	} catch (error) {
		return sendError(res, error);
	}
};

exports.getJobById = async (req, res) => {
	try {
		if (!mongoose.isValidObjectId(req.params.id)) {
			return res.status(400).json({ message: 'Invalid job ID' });
		}
		const job = await Job.findById(req.params.id).populate('category');
		if (!job) return res.status(404).json({ message: 'Job not found' });
		return res.status(200).json(job);
	} catch (error) {
		return sendError(res, error);
	}
};

exports.updateJob = async (req, res) => {
	try {
		if (!mongoose.isValidObjectId(req.params.id)) {
			return res.status(400).json({ message: 'Invalid job ID' });
		}
		const job = await Job.findById(req.params.id);
		if (!job) return res.status(404).json({ message: 'Job not found' });

		const updates = {};
		editableFields.forEach((field) => {
			if (req.body[field] !== undefined) updates[field] = req.body[field];
		});
		if (updates.category !== undefined) {
			if (!mongoose.isValidObjectId(updates.category)) {
				return res.status(400).json({ message: 'Invalid category ID' });
			}
			if (!(await Category.exists({ _id: updates.category }))) {
				return res.status(400).json({ message: 'Category not found' });
			}
		}
		Object.assign(job, updates);
		await job.save();
		return res.status(200).json(await job.populate('category'));
	} catch (error) {
		return sendError(res, error);
	}
};

exports.deleteJob = async (req, res) => {
	try {
		if (!mongoose.isValidObjectId(req.params.id)) {
			return res.status(400).json({ message: 'Invalid job ID' });
		}
		const job = await Job.findByIdAndDelete(req.params.id);
		if (!job) return res.status(404).json({ message: 'Job not found' });
		return res.status(200).json({ message: 'Job deleted successfully' });
	} catch (error) {
		return sendError(res, error);
	}
};
