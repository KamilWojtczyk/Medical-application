const httpStatus = require('http-status');
const Patient = require('../../models/Patient/patient.model');
const HeartRate = require('../../models/HeartRate/HeartRate.model');
const BloodPressure = require('../../models/BloodPressure/BloodPressure.model');
const BloodSugar = require('../../models/BloodSugar/BloodSugar.model');
const Saturation = require('../../models/saturation');
const ApiError = require('../../utils/ApiError');
const moment = require('moment');
const Doctor = require('../../models/Doctor/doctor.model');
const ObjectId = require('mongoose').Types.ObjectId;

const getPatientHealthReport = async (patientId, startDate, endDate) => {
  console.log(moment(startDate).format('YYYY-MM-DD HH:mm:ss'));
  console.log(moment(startDate).format('YYYY-MM-DD HH:mm:ss'));
  const bloodSugar = await BloodSugar.find({
    patient: patientId,
    createdAt: {
      $gte: moment.utc(new Date(startDate).setHours(0, 0, 0, 0)).toISOString(),
      $lte: moment.utc(new Date(endDate).setHours(23, 59, 59, 999)).toISOString(),
    },
  });
  const bloodPressure = await BloodPressure.find({
    patient: patientId,
    createdAt: {
      $gte: moment.utc(new Date(startDate).setHours(0, 0, 0, 0)).toISOString(),
      $lte: moment.utc(new Date(endDate).setHours(23, 59, 59, 999)).toISOString(),
    },
  });
  const saturation = await Saturation.find({
    patient: patientId,
    createdAt: {
      $gte: moment.utc(new Date(startDate).setHours(0, 0, 0, 0)).toISOString(),
      $lte: moment.utc(new Date(endDate).setHours(23, 59, 59, 999)).toISOString(),
    },
  });
  const heartRate = await HeartRate.find({
    patient: patientId,
    createdAt: {
      $gte: moment.utc(new Date(startDate).setHours(0, 0, 0, 0)).toISOString(),
      $lte: moment.utc(new Date(endDate).setHours(23, 59, 59, 999)).toISOString(),
    },
  });
  const patient = await Patient.findById(patientId);
  const report = {
    bloodSugar,
    bloodPressure,
    saturation,
    heartRate,
    patient,
  };
  return { report };
};
const createPatient = async (patientBody) => {
  console.log({ patientBody });
  return Patient.create(patientBody);
};

const getAllPatients = async () => {
  return Patient.find().populate('medicalNotes userId doctor');
};

// const searchPatients = async (req) => {
//   const patiets = await Patient.search(
//     { query_string: { query: req.body.search } },
//     { hydrate: true, hydrateOptions: { select: 'name' } },
//     function (err, results) {
//       console.log(results);
//       return results;
//     }
//   );
//   return patiets;
// };

const getPatientById = async (id) => {
  return Patient.findById(id).populate('medicalNotes userId doctor');
};
const getPatientByName = async (name) => {
  const regex = new RegExp(name, 'i');
  return Patient.find({ name: { $regex: regex } }).populate('medicalNotes userId doctor');
};

const getPatientsByDoctor = async (doctorId) => {
  return Patient.find({ doctor: doctorId }).populate('medicalNotes userId doctor');
};
const getPatientByUserId = async (userId) => {
  return Patient.find({ userId: userId }).populate('userId, doctor');
};

const getPatientsByDate = (createdAt) => {
  return Patient.find({
    createdAt: {
      $gte: moment.utc(createdAt.from).toISOString(),
      $lte: moment.utc(createdAt.to).toISOString(),
    },
  });
};

const getTodayPatients = async () => {
  let t = moment(Date.now()).subtract(1, 'days');
  return Patient.find({
    createdAt: {
      $gte: moment.utc(t).toISOString(),
      $lte: moment.utc(Date.now()).toISOString(),
    },
  });
};

const updatePatientById = async (id, updateBody) => {
  const patient = await getPatientById(id);
  if (!patient) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Patient not found');
  }
  Object.assign(patient, updateBody);
  await patient.save();
  return patient;
};

const deletePatientById = async (id) => {
  const patient = await getPatientById(id);
  if (!patient) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Patient not found');
  }
  await patient.remove();
  return patient;
};

const getPatientAgeReport = async (req) => {
  let pipeline = [
    {
      $bucket: {
        groupBy: { $toInt: '$age' }, // Field to group by
        boundaries: [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, Infinity], // Boundaries for the buckets
        default: 'Other', // Bucket id for documents which do not fall into a bucket
        output: {
          // Output for each bucket
          count: { $sum: 1 },
          patientsMale: {
            $push: {
              $cond: [
                { $eq: ['$gender', 'Male'] },
                {
                  name: '$name',
                  age: '$age',
                  gender: '$gender',
                },
                '$$REMOVE',
              ],
            },
          },
          patientsFemale: {
            $push: {
              $cond: [
                { $eq: ['$gender', 'Female'] },
                {
                  name: '$name',
                  age: '$age',
                  gender: '$gender',
                },
                '$$REMOVE',
              ],
            },
          },
        },
      },
    },
    {
      $project: {
        range: {
          $concat: [
            { $toString: '$_id' },
            {
              $cond: [
                { $lt: ['$_id', 75] },
                {
                  $concat: [
                    '-',
                    {
                      $toString: { $add: ['$_id', 4] },
                    },
                  ],
                },
                '+',
              ],
            },
          ],
        },
        count: '$count',
        patientsMale: '$patientsMale',
        patientsFemale: '$patientsFemale',
      },
    },
  ];
  return Patient.aggregate(pipeline);
};

const getPatientHeightReport = async (req) => {
  let pipeline = [
    {
      $bucket: {
        groupBy: { $toInt: '$height' }, // Field to group by
        boundaries: [0, 20, 40, 60, 80, Infinity], // Boundaries for the buckets
        default: 'Other', // Bucket id for documents which do not fall into a bucket
        output: {
          // Output for each bucket
          count: { $sum: 1 },
          patientsMale: {
            $push: {
              $cond: [
                { $eq: ['$gender', 'Male'] },
                {
                  name: '$name',
                  height: '$height',
                  gender: '$gender',
                },
                '$$REMOVE',
              ],
            },
          },
          patientsFemale: {
            $push: {
              $cond: [
                { $eq: ['$gender', 'Female'] },
                {
                  name: '$name',
                  height: '$height',
                  gender: '$gender',
                },
                '$$REMOVE',
              ],
            },
          },
        },
      },
    },
    {
      $project: {
        range: {
          $concat: [
            { $toString: '$_id' },
            {
              $cond: [
                { $lt: ['$_id', 75] },
                {
                  $concat: [
                    '-',
                    {
                      $toString: { $add: ['$_id', 19] },
                    },
                  ],
                },
                '+',
              ],
            },
          ],
        },
        count: '$count',
        patientsMale: '$patientsMale',
        patientsFemale: '$patientsFemale',
      },
    },
  ];
  return Patient.aggregate(pipeline);
};

const getPatientWeightReport = async (req) => {
  let pipeline = [
    {
      $bucket: {
        groupBy: { $toInt: '$weight' }, // Field to group by
        boundaries: [0, 20, 40, 60, 80, Infinity], // Boundaries for the buckets
        default: 'Other', // Bucket id for documents which do not fall into a bucket
        output: {
          // Output for each bucket
          count: { $sum: 1 },
          patientsMale: {
            $push: {
              $cond: [
                { $eq: ['$gender', 'Male'] },
                {
                  name: '$name',
                  weight: '$weight',
                  gender: '$gender',
                },
                '$$REMOVE',
              ],
            },
          },
          patientsFemale: {
            $push: {
              $cond: [
                { $eq: ['$gender', 'Female'] },
                {
                  name: '$name',
                  weight: '$weight',
                  gender: '$gender',
                },
                '$$REMOVE',
              ],
            },
          },
        },
      },
    },
    {
      $project: {
        range: {
          $concat: [
            { $toString: '$_id' },
            {
              $cond: [
                { $lt: ['$_id', 75] },
                {
                  $concat: [
                    '-',
                    {
                      $toString: { $add: ['$_id', 4] },
                    },
                  ],
                },
                '+',
              ],
            },
          ],
        },
        count: '$count',
        patientsMale: '$patientsMale',
        patientsFemale: '$patientsFemale',
      },
    },
  ];
  return Patient.aggregate(pipeline);
};

const getAbnormalBloodPressurePatientCount = async (req, patientId = null) => {

  var currentDate = new Date();
  var pastDate = new Date(currentDate.getTime() - (24 * 60 * 60 * 1000)); // Subtracting 24 hours in milliseconds

  let doctor = await Doctor.findOne({ userId: req.user._id });
  if (!doctor) throw { message: `Please contact admin to verify that you have a doctor account!` };
  let pipeline = [];

  if (patientId) {
    pipeline = pipeline.concat([
      { $addFields: { patient: { $toObjectId: '$patient' } } },
      { $match: { patient: ObjectId(patientId) } }
    ])
  }

  if (req.user.role == "doctor") {
    pipeline = pipeline.concat([
      { $addFields: { doctor: { $toObjectId: '$doctor' } } },
      { $match: { doctor: ObjectId(doctor._id) } }
    ])
  }

  pipeline = pipeline.concat([
    { $addFields: { created_at: { $toDate: "$created_at" } } },
    { $match: { created_at: { $gt: pastDate } } },
    {
      $addFields: {
        rateParts: { $split: ["$rate", "/"] },
        upper: { $toInt: { $arrayElemAt: [{ $split: ["$rate", "/"] }, 0] } }
      }
    },
    { $match: { upper: { $gt: 130 } } },
    { $addFields: { patient: { $toObjectId: '$patient' } } },
    { $group: { _id: "$patient", data: { $first: "$$ROOT" }, list: { $push: "$$ROOT" } } },
    { $lookup: { from: 'patients', localField: 'data.patient', foreignField: '_id', as: 'data.patient' } },
    { $addFields: { "data.patient": { $arrayElemAt: ["$data.patient", 0] } } }
  ]);
  let bloodPressure = await BloodPressure.aggregate(pipeline)
  return bloodPressure;
};
const getAbnormalHeartRatePatientCount = async (req, patientId = null) => {

  var currentDate = new Date();
  var pastDate = new Date(currentDate.getTime() - (24 * 60 * 60 * 1000)); // Subtracting 24 hours in milliseconds

  let doctor = await Doctor.findOne({ userId: req.user._id });
  if (!doctor) throw { message: `Please contact admin to verify that you have a doctor account!` };
  let pipeline = [];

  if (patientId) {
    pipeline = pipeline.concat([
      { $addFields: { patient: { $toObjectId: '$patient' } } },
      { $match: { patient: ObjectId(patientId) } }
    ])
  }

  if (req.user.role == "doctor") {
    pipeline = pipeline.concat([
      { $addFields: { doctor: { $toObjectId: '$doctor' } } },
      { $match: { doctor: ObjectId(doctor._id) } }
    ])
    pipeline = pipeline.concat([
      { $addFields: { created_at: { $toDate: "$created_at" } } },
      { $match: { created_at: { $gt: pastDate } } },
      { $addFields: { rate: { $toDouble: "$rate" } } },
      { $match: { rate: { $gt: 110 } } },
      { $addFields: { patient: { $toObjectId: '$patient' } } },
      { $group: { _id: "$patient", data: { $first: "$$ROOT" }, list: { $push: "$$ROOT" } } },
      { $lookup: { from: 'patients', localField: 'data.patient', foreignField: '_id', as: 'data.patient' } },
      { $addFields: { "data.patient": { $arrayElemAt: ["$data.patient", 0] } } }
    ]);
  }

  let heartRate = await HeartRate.aggregate(pipeline)

  return heartRate;
};
const getAbnormalSaturationPatientCount = async (req, patientId = null) => {

  var currentDate = new Date();
  var pastDate = new Date(currentDate.getTime() - (24 * 60 * 60 * 1000)); // Subtracting 24 hours in milliseconds

  let doctor = await Doctor.findOne({ userId: req.user._id });
  if (!doctor) throw { message: `Please contact admin to verify that you have a doctor account!` };
  let pipeline = [];

  if (patientId) {
    pipeline = pipeline.concat([
      { $addFields: { patient: { $toObjectId: '$patient' } } },
      { $match: { patient: ObjectId(patientId) } }
    ])
  }

  if (req.user.role == "doctor") {
    pipeline = pipeline.concat([
      { $addFields: { doctor: { $toObjectId: '$doctor' } } },
      { $match: { doctor: ObjectId(doctor._id) } }
    ])
  }

  pipeline = pipeline.concat([
    { $addFields: { created_at: { $toDate: "$created_at" } } },
    { $match: { created_at: { $gt: pastDate } } },
    { $addFields: { rate: { $toDouble: "$rate" } } },
    { $match: { rate: { $lt: 93 } } },
    { $addFields: { patient: { $toObjectId: '$patient' } } },
    { $group: { _id: "$patient", data: { $first: "$$ROOT" }, list: { $push: "$$ROOT" } } },
    { $lookup: { from: 'patients', localField: 'data.patient', foreignField: '_id', as: 'data.patient' } },
    { $addFields: { "data.patient": { $arrayElemAt: ["$data.patient", 0] } } }
  ]);
  let saturation = await Saturation.aggregate(pipeline)

  return saturation;
};
const getAbnormalBloodSugarPatientCount = async (req, patientId = null) => {

  var currentDate = new Date();
  var pastDate = new Date(currentDate.getTime() - (24 * 60 * 60 * 1000)); // Subtracting 24 hours in milliseconds

  let doctor = await Doctor.findOne({ userId: req.user._id });
  if (!doctor) throw { message: `Please contact admin to verify that you have a doctor account!` };
  let pipeline = [];

  if (patientId) {
    pipeline = pipeline.concat([
      { $addFields: { patient: { $toObjectId: '$patient' } } },
      { $match: { patient: ObjectId(patientId) } }
    ])
  }

  if (req.user.role == "doctor") {
    pipeline = pipeline.concat([
      { $addFields: { doctor: { $toObjectId: '$doctor' } } },
      { $match: { doctor: ObjectId(doctor._id) } }
    ])
    pipeline = pipeline.concat([
      { $addFields: { created_at: { $toDate: "$created_at" } } },
      { $match: { created_at: { $gt: pastDate } } },
      { $addFields: { rate: { $toDouble: "$rate" } } },
      { $match: { rate: { $gt: 115 } } },
      { $addFields: { patient: { $toObjectId: '$patient' } } },
      { $group: { _id: "$patient", data: { $first: "$$ROOT" }, list: { $push: "$$ROOT" } } },
      { $lookup: { from: 'patients', localField: 'data.patient', foreignField: '_id', as: 'data.patient' } },
      { $addFields: { "data.patient": { $arrayElemAt: ["$data.patient", 0] } } }
    ]);
  }

  let bloodSugar = await BloodSugar.aggregate(pipeline)

  return bloodSugar;
};

const getAbnormalReport = async (req) => {

  let id = ObjectId(req.params.patientId)
  let bloodPressure = await getAbnormalBloodPressurePatientCount(req, id)
  let bloodSugar = await getAbnormalBloodSugarPatientCount(req, id)
  let heartRate = await getAbnormalHeartRatePatientCount(req, id)
  let saturation = await getAbnormalSaturationPatientCount(req, id)

  return { bloodPressure, bloodSugar, heartRate, saturation }

}

module.exports = {
  createPatient,
  getAllPatients,
  getPatientById,
  getTodayPatients,
  getPatientByName,
  getPatientsByDoctor,
  getPatientByUserId,
  updatePatientById,
  getPatientsByDate,
  deletePatientById,
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
