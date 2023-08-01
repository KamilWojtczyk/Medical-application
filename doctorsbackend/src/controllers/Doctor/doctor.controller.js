const httpStatus = require('http-status');
const pick = require('../../utils/pick');
const ApiError = require('../../utils/ApiError');
const catchAsync = require('../../utils/catchAsync');
const doctorService = require('../../services/Doctor/doctor.service');
require('dotenv').config();

const createDoctor = catchAsync(async (req, res) => {
  const doctor = await doctorService.createDoctor(req.body);
  res.send(doctor);
});

const getDoctors = catchAsync(async (req, res) => {
  const result = await doctorService.getAllDoctors();
  res.send(result);
});

const getDoctor = catchAsync(async (req, res) => {
  const doctor = await doctorService.getDoctorById(req.params.id);
  if (!doctor) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Doctor not found');
  }
  res.send(doctor);
});

const getDoctorByName = catchAsync(async (req, res) => {
  const doctor = await doctorService.getDoctorByName(req.body.name);
  if (!doctor) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Doctor not found');
  }
  res.send(doctor);
});
const getDoctorByUserId = catchAsync(async (req, res) => {
  const doctor = await doctorService.getDoctorByUserId(req.body.userId);
  if (!doctor) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Doctor not found');
  }
  res.send(doctor);
});

const updateDoctor = catchAsync(async (req, res) => {
  req.body.updated_at = new Date();
  const doctor = await doctorService.updateDoctorById(req.params.id, req.body);
  res.send(doctor);
});

const deleteDoctor = catchAsync(async (req, res) => {
  await doctorService.deleteDoctorById(req.params.id);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createDoctor,
  getDoctors,
  getDoctor,
  getDoctorByName,
  getDoctorByUserId,
  updateDoctor,
  deleteDoctor,
};
