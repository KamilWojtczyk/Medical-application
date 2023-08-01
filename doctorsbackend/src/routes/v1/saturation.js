const express = require('express');
const router = express.Router();

const { createSaturation, getSaturationByPatientId } = require('../../controllers/saturation');
router.post('/createSaturation', createSaturation);
router.get('/getSaturationByPatientId/:patientId', getSaturationByPatientId);

module.exports = router;
