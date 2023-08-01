const express = require('express');
const auth = require('../../../middlewares/auth');
const HeartRateController = require('../../../controllers/HeartRate/heartRate.controller');
const router = express.Router();

router.route('/').post(auth('doctor'), HeartRateController.createHeartRate).get(HeartRateController.getHeartRates);

router.route('/searchByPatientId').post(HeartRateController.getHeartRateByPatientId);

router
  .route('/:id')
  .get(HeartRateController.getHeartRate)
  .patch(auth('admin'), HeartRateController.updateHeartRate)
  .delete(auth('admin'), HeartRateController.deleteHeartRate);
module.exports = router;
