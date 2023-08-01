const express = require('express');
const auth = require('../../../middlewares/auth');
const doctorController = require('../../../controllers/Doctor/doctor.controller');
const router = express.Router();

router
  .route('/')
  .post(auth('admin'), doctorController.createDoctor)
  .get(doctorController.getDoctors);

router
  .route('/searchByName')
  .post(auth('admin'), doctorController.getDoctorByName)
  router
  .route('/searchByUserId')
  .post(auth('doctor'), doctorController.getDoctorByUserId)

router
  .route('/:id')
  .get(doctorController.getDoctor)
  .patch(auth('admin'), doctorController.updateDoctor)
  .delete(auth('admin'), doctorController.deleteDoctor);
module.exports = router;
