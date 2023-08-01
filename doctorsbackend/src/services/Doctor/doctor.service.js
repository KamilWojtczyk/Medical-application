const httpStatus = require('http-status');
const Doctor = require('../../models/Doctor/doctor.model');
const ApiError = require('../../utils/ApiError');

const createDoctor = async (doctorBody) => {
  return Doctor.create(doctorBody);
};

const getAllDoctors = async () => {
  return Doctor.find().populate("userId");
};

const getDoctorById = async (id) => {
  return Doctor.findById(id).populate("userId");
};
const getDoctorByName = async (name) => {
  const regex = new RegExp(name, 'i') 
  return Doctor.find({ name :{$regex: regex}}).populate("userId")
}
const getDoctorByUserId = async (userId) => { 
  return Doctor.find({ userId : userId}).populate("userId")
}

const getDoctorsByShift = (shiftId) => {
  return Doctor.find({shift: shiftId}).populate("userId")
}

const updateDoctorById = async (id, updateBody) => {
  const doctor = await getDoctorById(id);
  if (!doctor) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Doctor not found');
  }
  Object.assign(doctor, updateBody);
  await doctor.save();
  return doctor;
};

const deleteDoctorById = async (id) => {
  const doctor = await getDoctorById(id);
  if (!doctor) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Doctor not found');
  }
  await doctor.remove();
  return doctor;
};

module.exports = {
  createDoctor,
  getAllDoctors,
  getDoctorById,
  getDoctorByName,
  getDoctorByUserId,
  getDoctorsByShift,
  updateDoctorById,
  deleteDoctorById,
};
