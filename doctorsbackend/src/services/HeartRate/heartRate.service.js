const httpStatus = require('http-status');
const HeartRate = require('../../models/HeartRate/HeartRate.model');
const ApiError = require('../../utils/ApiError');
const ObjectId = require('mongoose').Types.ObjectId;

const createHeartRate = async (d_body) => {
  return HeartRate.create(d_body);
};

const getAllHeartRates = async () => {
  return HeartRate.find().populate('patient doctor');
};

const getHeartRateById = async (id) => {
  return HeartRate.findById(id).populate('patient doctor');
};
const getHeartRateByPatientId = async (patientId) => {
  // return HeartRate.find({ patient: patientId }).populate('patient doctor');

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
        Object.keys(HeartRate.schema.paths).reduce((arr, item) => {
          if (['doctor', 'patient'].includes(item)) {
            arr[item] = { "$arrayElemAt": [`$${item}`, 0] }
          } else {
            arr[item] = 1;
          }
          return arr;
        }, {})
    }

  ]

  return await HeartRate.aggregate(pipeline);
};

const updateHeartRateById = async (id, updateBody) => {
  const result = await getHeartRateById(id);
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Heart Rate not found');
  }
  Object.assign(result, updateBody);
  await result.save();
  return result;
};

const deleteHeartRateById = async (id) => {
  const result = await getHeartRateById(id);
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Heart Rate not found');
  }
  await result.remove();
  return result;
};

module.exports = {
  createHeartRate,
  getAllHeartRates,
  getHeartRateById,
  getHeartRateByPatientId,
  updateHeartRateById,
  deleteHeartRateById,
};
