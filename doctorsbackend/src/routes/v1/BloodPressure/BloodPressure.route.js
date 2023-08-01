const express = require('express');
const auth = require('../../../middlewares/auth');
const BloodPressureController = require('../../../controllers/BloodPressure/bloodPressure.controller');
const router = express.Router();

router.route('/').post(auth('doctor'), BloodPressureController.createBloodPressure).get(BloodPressureController.getBloodPressures);

router.route('/searchByPatientId').post(BloodPressureController.getBloodPressureByPatientId);

router
  .route('/:id')
  .get(BloodPressureController.getBloodPressure)
  .patch(auth('admin'), BloodPressureController.updateBloodPressure)
  .delete(auth('admin'), BloodPressureController.deleteBloodPressure);
module.exports = router;
