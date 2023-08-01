const express = require('express');
const auth = require('../../../middlewares/auth');
const BloodSugarController = require('../../../controllers/BloodSugar/bloodSugar.controller');
const router = express.Router();

router.route('/').post(auth('doctor'), BloodSugarController.createBloodSugar).get(BloodSugarController.getBloodSugars);

router.route('/searchByPatientId').post(BloodSugarController.getBloodSugarByPatientId);
router.route('/getAPGByPatientIdAndDate').post(BloodSugarController.getAPGByPatientIdAndDate);

router
  .route('/:id')
  .get(BloodSugarController.getBloodSugar)
  .patch(auth('admin'), BloodSugarController.updateBloodSugar)
  .delete(auth('admin'), BloodSugarController.deleteBloodSugar);
module.exports = router;
