const httpStatus = require('http-status');
const ApiError = require('../../utils/ApiError');
const catchAsync = require('../../utils/catchAsync');
const BloodPressureService = require('../../services/BloodPressure/bloodPressure.service');
const { createNotification } = require('../../services/Notification/notification.service');
const { getPatientById } = require('../../services/Patient/patient.service');
const { getDoctorById } = require('../../services/Doctor/doctor.service');
require('dotenv').config();

const createBloodPressure = catchAsync(async (req, res) => {
  const result = await BloodPressureService.createBloodPressure(req.body);
  res.send(result);
});

const getBloodPressures = catchAsync(async (req, res) => {
  const result = await BloodPressureService.getAllBloodPressures();
  res.send(result);
});

const getBloodPressure = catchAsync(async (req, res) => {
  const result = await BloodPressureService.getBloodPressureById(req.params.id);
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Blood Pressure not found');
  }
  res.send(result);
});

const getBloodPressureByPatientId = catchAsync(async (req, res) => {
  const result = await BloodPressureService.getBloodPressureByPatientId(req.body.patientId);
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Blood Pressure not found');
  }
  res.send(result);
});

const updateBloodPressure = catchAsync(async (req, res) => {
  req.body.updated_at = new Date();
  const result = await BloodPressureService.updateBloodPressureById(req.params.id, req.body);
  res.send(result);
});

const deleteBloodPressure = catchAsync(async (req, res) => {
  await BloodPressureService.deleteBloodPressureById(req.params.id);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createBloodPressure,
  getBloodPressures,
  getBloodPressure,
  getBloodPressureByPatientId,
  updateBloodPressure,
  deleteBloodPressure,
};
