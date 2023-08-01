const httpStatus = require('http-status');
const BloodPressure = require('../../models/BloodPressure/BloodPressure.model');
const ApiError = require('../../utils/ApiError');
const ObjectId = require('mongoose').Types.ObjectId;

const createBloodPressure = async (d_body) => {
  return BloodPressure.create(d_body);
};

const getAllBloodPressures = async () => {
  return BloodPressure.find().populate('patient doctor');
};

const getBloodPressureById = async (id) => {
  return BloodPressure.findById(id).populate('patient doctor');
};
const getBloodPressureByPatientId = async (patientId) => {
  // return BloodPressure.find({ patient: patientId }).populate('patient doctor');

  let pipeline = [
    { $addFields: { patient: { $toObjectId: '$patient' } } },
    { $addFields: { doctor: { $toObjectId: '$doctor' } } },
    {
      $match: { patient: ObjectId(patientId) }
    },
    { $lookup: { from: 'doctors', localField: 'doctor', foreignField: '_id', as: 'doctor' } },
    { $lookup: { from: 'patients', localField: 'patient', foreignField: '_id', as: 'patient' } },

    {
      $project:
        Object.keys(BloodPressure.schema.paths).reduce((arr, item) => {
          if (['doctor', 'patient'].includes(item)) {
            arr[item] = { "$arrayElemAt": [`$${item}`, 0] }
          } else {
            arr[item] = 1;
          }
          return arr;
        }, {})
    }

  ]

  return await BloodPressure.aggregate(pipeline);

};
const updateBloodPressureById = async (id, updateBody) => {
  const result = await getBloodPressureById(id);
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Blood Pressure not found');
  }
  Object.assign(result, updateBody);
  await result.save();
  return result;
};

const deleteBloodPressureById = async (id) => {
  const result = await getBloodPressureById(id);
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Blood Pressure not found');
  }
  await result.remove();
  return result;
};

module.exports = {
  createBloodPressure,
  getAllBloodPressures,
  getBloodPressureById,
  getBloodPressureByPatientId,
  updateBloodPressureById,
  deleteBloodPressureById,
};
