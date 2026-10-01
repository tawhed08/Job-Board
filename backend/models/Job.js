const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema(
	{
		title: { type: String, required: true, trim: true },
		company: { type: String, required: true, trim: true },
		description: { type: String, required: true, trim: true },
		location: { type: String, required: true, trim: true },
		salary: { type: String, trim: true },
		category: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Category',
			required: true
		},
		jobType: {
			type: String,
			required: true,
			enum: ['Full Time', 'Part Time', 'Remote', 'Internship', 'Contract']
		},
		requirements: { type: [String], default: [] },
		responsibilities: { type: [String], default: [] },
		deadline: { type: Date }
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Job', jobSchema);
