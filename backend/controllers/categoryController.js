const mongoose = require('mongoose');
const Category = require('../models/Category');

function sendError(res, error) {
	if (error.code === 11000) {
		return res.status(400).json({ message: 'Category name already exists' });
	}
	if (error.name === 'ValidationError' || error.name === 'CastError') {
		return res.status(400).json({ message: 'Invalid input' });
	}
	return res.status(500).json({ message: 'Server error' });
}

exports.createCategory = async (req, res) => {
	try {
		if (typeof req.body.name !== 'string' || !req.body.name.trim()) {
			return res.status(400).json({ message: 'Category name is required' });
		}
		const category = await Category.create({
			name: req.body.name,
			description: req.body.description
		});
		return res.status(201).json(category);
	} catch (error) {
		return sendError(res, error);
	}
};

exports.getCategories = async (req, res) => {
	try {
		return res.status(200).json(await Category.find());
	} catch (error) {
		return sendError(res, error);
	}
};

exports.getCategoryById = async (req, res) => {
	try {
		if (!mongoose.isValidObjectId(req.params.id)) {
			return res.status(400).json({ message: 'Invalid category ID' });
		}
		const category = await Category.findById(req.params.id);
		if (!category) return res.status(404).json({ message: 'Category not found' });
		return res.status(200).json(category);
	} catch (error) {
		return sendError(res, error);
	}
};

exports.updateCategory = async (req, res) => {
	try {
		if (!mongoose.isValidObjectId(req.params.id)) {
			return res.status(400).json({ message: 'Invalid category ID' });
		}
		if (req.body.name !== undefined &&
				(typeof req.body.name !== 'string' || !req.body.name.trim())) {
			return res.status(400).json({ message: 'Category name is required' });
		}

		const updates = {};
		['name', 'description'].forEach((field) => {
			if (req.body[field] !== undefined) updates[field] = req.body[field];
		});
		const category = await Category.findByIdAndUpdate(req.params.id, updates, {
			new: true,
			runValidators: true
		});
		if (!category) return res.status(404).json({ message: 'Category not found' });
		return res.status(200).json(category);
	} catch (error) {
		return sendError(res, error);
	}
};

exports.deleteCategory = async (req, res) => {
	try {
		if (!mongoose.isValidObjectId(req.params.id)) {
			return res.status(400).json({ message: 'Invalid category ID' });
		}
		const category = await Category.findByIdAndDelete(req.params.id);
		if (!category) return res.status(404).json({ message: 'Category not found' });
		return res.status(200).json({ message: 'Category deleted successfully' });
	} catch (error) {
		return sendError(res, error);
	}
};
