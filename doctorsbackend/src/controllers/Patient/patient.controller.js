const httpStatus = require('http-status');
const pick = require('../../utils/pick');
const ApiError = require('../../utils/ApiError');
const catchAsync = require('../../utils/catchAsync');
const patientService = require('../../services/Patient/patient.service');
const Patient = require('../../models/Patient/patient.model');
require('dotenv').config();

require('dotenv').config();

const getPatientHealthReport = catchAsync(async (req, res) => {
  const { patientId, startDate, endDate } = req.body;
  const report = await patientService.getPatientHealthReport(patientId, startDate, endDate);
  res.send(report);
});
const createPatient = catchAsync(async (req, res) => {
  const patient = await patientService.createPatient(req.body);
  res.send(patient);
});

const getPatients = catchAsync(async (req, res) => {
  const result = await patientService.getAllPatients();
  res.send(result);
});

const getPatient = catchAsync(async (req, res) => {
  const patient = await patientService.getPatientById(req.params.id);
  if (!patient) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Patient not found');
  }
  res.send(patient);
});

const getPatientsByDate = catchAsync(async (req, res) => {
  const patient = await patientService.getPatientsByDate(req.body.createdAt);
  if (!patient) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Patient not found');
  }
  res.send(patient);
});

const getTodayPatients = catchAsync(async (req, res) => {
  const patient = await patientService.getTodayPatients();
  if (!patient) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Patient not found');
  }
  res.send(patient);
});

const getPatientByName = catchAsync(async (req, res) => {
  const patient = await patientService.getPatientByName(req.body.name);
  if (!patient) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Patient not found');
  }
  res.send(patient);
});

const getPatientsByDoctor = catchAsync(async (req, res) => {
  const patient = await patientService.getPatientsByDoctor(req.params.doctorId);
  if (!patient) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Patient not found');
  }
  res.send(patient);
});
const getPatientByUserId = catchAsync(async (req, res) => {
  const patient = await patientService.getPatientByUserId(req.body.userId);
  if (!patient) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Patient not found');
  }
  res.send(patient);
});
const updatePatient = catchAsync(async (req, res) => {
  req.body.updated_at = new Date();
  const patient = await patientService.updatePatientById(req.params.id, req.body);
  res.send(patient);
});

const deletePatient = catchAsync(async (req, res) => {
  await patientService.deletePatientById(req.params.id);
  res.status(httpStatus.NO_CONTENT).send();
});

const getPatientAgeReport = catchAsync(async (req, res) => {
  res.send(await patientService.getPatientAgeReport(req));
});

const getPatientHeightReport = catchAsync(async (req, res) => {
  res.send(await patientService.getPatientHeightReport(req));
});
const getPatientWeightReport = catchAsync(async (req, res) => {
  res.send(await patientService.getPatientWeightReport(req));
});

const getAbnormalBloodPressurePatientCount = catchAsync(async (req, res) => {
  res.send(await patientService.getAbnormalBloodPressurePatientCount(req));
});
const getAbnormalHeartRatePatientCount = catchAsync(async (req, res) => {
  res.send(await patientService.getAbnormalHeartRatePatientCount(req));
});
const getAbnormalSaturationPatientCount = catchAsync(async (req, res) => {
  res.send(await patientService.getAbnormalSaturationPatientCount(req));
});
const getAbnormalBloodSugarPatientCount = catchAsync(async (req, res) => {
  res.send(await patientService.getAbnormalBloodSugarPatientCount(req));
});
const getAbnormalReport = catchAsync(async (req, res) => {
  res.send(await patientService.getAbnormalReport(req));
});

module.exports = {
  createPatient,
  getPatients,
  getPatient,
  getPatientByName,
  getPatientsByDoctor,
  getPatientByUserId,
  getTodayPatients,
  updatePatient,
  deletePatient,
  getPatientsByDate,
  getPatientAgeReport,
  getPatientHeightReport,
  getPatientWeightReport,
  getPatientHealthReport,
  getAbnormalBloodPressurePatientCount,
  getAbnormalHeartRatePatientCount,
  getAbnormalSaturationPatientCount,
  getAbnormalBloodSugarPatientCount,
  getAbnormalReport
};
