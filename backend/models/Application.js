const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema(
	{
		job: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Job',
			required: true
		},
		name: { type: String, required: true, trim: true },
		email: { type: String, required: true, trim: true, lowercase: true },
		phone: { type: String, required: true, trim: true },
		resume: { type: String, trim: true },
		coverLetter: { type: String, trim: true },
		status: {
			type: String,
			enum: ['Pending', 'Reviewed', 'Accepted', 'Rejected'],
			default: 'Pending'
		}
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Application', applicationSchema);
