const Saturation = require('../models/saturation');
const { getDoctorById } = require('../services/Doctor/doctor.service');
const { createNotification } = require('../services/Notification/notification.service');
const { getPatientById } = require('../services/Patient/patient.service');
const ObjectId = require('mongoose').Types.ObjectId;

const createSaturation = async (req, res) => {
  try {
    const { patient, doctor, rate } = req.body;
    if (!patient || !doctor || !rate) {
      return res.status(400).json({ message: 'patient, doctor and rate are required' });
    }
    const saturation = await Saturation.create(req.body);

    return res.status(201).json({
      saturation,
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getSaturationByPatientId = async (req, res) => {
  try {
    const { patientId } = req.params;
    // const saturation = await Saturation.find({ patient: patientId }).populate('patient doctor').sort({ createdAt: -1 });

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
          Object.keys(Saturation.schema.paths).reduce((arr, item) => {
            if (['doctor', 'patient'].includes(item)) {
              arr[item] = { "$arrayElemAt": [`$${item}`, 0] }
            } else {
              arr[item] = 1;
            }
            return arr;
          }, {})
      }

    ]

    let saturation = await Saturation.aggregate(pipeline);

    return res.status(200).json({ saturation });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createSaturation,
  getSaturationByPatientId,
};
