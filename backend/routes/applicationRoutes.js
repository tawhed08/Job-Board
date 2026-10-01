const express = require('express');
const applicationController = require('../controllers/applicationController');

const router = express.Router();

router.get('/', applicationController.getApplications);
router.get('/:id', applicationController.getApplicationById);
router.post('/', applicationController.createApplication);
router.put('/:id', applicationController.updateApplication);
router.delete('/:id', applicationController.deleteApplication);

module.exports = router;
