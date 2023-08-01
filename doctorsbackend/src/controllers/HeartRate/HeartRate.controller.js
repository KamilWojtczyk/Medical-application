const httpStatus = require('http-status');
const ApiError = require('../../utils/ApiError');
const catchAsync = require('../../utils/catchAsync');
const HeartRateService = require('../../services/HeartRate/heartRate.service');
const { getPatientById } = require('../../services/Patient/patient.service');
const { getDoctorById } = require('../../services/Doctor/doctor.service');
const { createNotification } = require('../../services/Notification/notification.service');
require('dotenv').config();

const createHeartRate = catchAsync(async (req, res) => {
  const result = await HeartRateService.createHeartRate(req.body);
  res.send(result);
});

const getHeartRates = catchAsync(async (req, res) => {
  const result = await HeartRateService.getAllHeartRates();
  res.send(result);
});

const getHeartRate = catchAsync(async (req, res) => {
  const result = await HeartRateService.getHeartRateById(req.params.id);
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Heart Rate not found');
  }
  res.send(result);
});

const getHeartRateByPatientId = catchAsync(async (req, res) => {
  const result = await HeartRateService.getHeartRateByPatientId(req.body.patientId);
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Heart Rate not found');
  }
  res.send(result);
});

const updateHeartRate = catchAsync(async (req, res) => {
  req.body.updated_at = new Date();
  const result = await HeartRateService.updateHeartRateById(req.params.id, req.body);
  res.send(result);
});

const deleteHeartRate = catchAsync(async (req, res) => {
  await HeartRateService.deleteHeartRateById(req.params.id);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createHeartRate,
  getHeartRates,
  getHeartRate,
  getHeartRateByPatientId,
  updateHeartRate,
  deleteHeartRate,
};
