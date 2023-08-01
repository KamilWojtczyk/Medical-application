const httpStatus = require('http-status');
const BloodSugar = require('../../models/BloodSugar/BloodSugar.model');
const ApiError = require('../../utils/ApiError');
const ObjectId = require('mongoose').Types.ObjectId;
const moment = require('moment');
const _ = require('lodash');

const createBloodSugar = async (d_body) => {
  return BloodSugar.create(d_body);
};

const getAllBloodSugars = async () => {
  return BloodSugar.find().populate('patient doctor');
};

const getBloodSugarById = async (id) => {
  return BloodSugar.findById(id).populate('patient doctor');
};
const getBloodSugarByPatientId = async (patientId) => {
  // return BloodSugar.find({ patient: patientId }).populate('patient doctor');

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
        Object.keys(BloodSugar.schema.paths).reduce((arr, item) => {
          if (['doctor', 'patient'].includes(item)) {
            arr[item] = { "$arrayElemAt": [`$${item}`, 0] }
          } else {
            arr[item] = 1;
          }
          return arr;
        }, {})
    }

  ]

  return await BloodSugar.aggregate(pipeline);

};
const getAPGByPatientIdAndDate = async (patientId, date) => {
  const regex = new RegExp(`^${date}`);
  
  const filter = {
    patient: patientId,
    created_at: { $regex: regex }
  }

  const bloodSugarList = await BloodSugar.find(filter).sort({ created_at: 1 });

  if (bloodSugarList.length == 0) return null;

  const groupedByHour = _.groupBy(bloodSugarList, (bloodSugar) => moment(bloodSugar.created_at).hour());

  const glucoseAverageData = _.times(24, _.constant(undefined));;
  const glucoseMinData = _.times(24, _.constant(undefined));;
  const glucoseMaxData = _.times(24, _.constant(undefined));;

  _.forIn(groupedByHour, (bloodSugarList, hour) => {
    const rateScores = _.map(bloodSugarList, bloodSugar => parseFloat(bloodSugar.rate));
    glucoseAverageData[parseInt(hour)] = _.mean(rateScores);
    glucoseMinData[parseInt(hour)] = _.min(rateScores);
    glucoseMaxData[parseInt(hour)] = _.max(rateScores);
  });

  return {
    glucoseAverageData: glucoseAverageData,
    glucoseMinData: glucoseMinData,
    glucoseMaxData: glucoseMaxData
  };
};
const updateBloodSugarById = async (id, updateBody) => {
  const result = await getBloodSugarById(id);
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Blood Sugar not found');
  }
  Object.assign(result, updateBody);
  await result.save();
  return result;
};

const deleteBloodSugarById = async (id) => {
  const result = await getBloodSugarById(id);
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Blood Sugar not found');
  }
  await result.remove();
  return result;
};

module.exports = {
  createBloodSugar,
  getAllBloodSugars,
  getBloodSugarById,
  getBloodSugarByPatientId,
  getAPGByPatientIdAndDate,
  updateBloodSugarById,
  deleteBloodSugarById,
};
