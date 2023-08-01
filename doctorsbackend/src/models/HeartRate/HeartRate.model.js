const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const moment = require('moment')

let HeartRateSchema = new Schema(
  {
    rate: {
      type: String,
      required: true,
    },

    doctor: {
      type: Schema.Types.ObjectId,
      ref: 'Doctor',
    },
    patient: {
      type: Schema.Types.ObjectId,
      ref: 'Patient',
    },
    created_at: {
      type: String,
      required: true,
      default: moment().format("YYYY-MM-DD HH:mm:ss"),
    },
    updated_at: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const vitalParam = mongoose.model('HeartRate', HeartRateSchema);

// Set up the Change Stream
const changeStream = vitalParam.watch();
// Listen for 'change' events
changeStream.on('change', async (change) => {
  if (change.operationType === 'insert') {
    const doc = change.fullDocument;

    try {
      if (parseInt(`${doc.rate}`) > 100) {
        const { getPatientById } = require('../../services/Patient/patient.service');
        const { getDoctorById } = require('../../services/Doctor/doctor.service');
        const { createNotification } = require('../../services/Notification/notification.service');
        let patient = await getPatientById(doc.patient);
        let doctor = await getDoctorById(doc.doctor);
        let notification = {
          doctor: doc.doctor,
          patient: doc.patient,
          title: `The heart rate of ${patient.name} is high at ${doc.rate}`,
          subTitle: `High heart rate under observation`,
          route: `/patients/patient-details/${doc.patient}`,
          user: doctor.userId._id
        }
        await createNotification(notification)
        try { global.socket.emit('message', JSON.stringify(notification)); console.log("sent") } catch (err) {
          console.log("error", err)
        }
        try { global.socket.broadcast.emit('message', JSON.stringify(notification)) } catch (err) {
          console.log("error", err)
        }
      }
    } catch (err) {
      console.log("post save error", err)
    }
  }
});

module.exports = vitalParam;
