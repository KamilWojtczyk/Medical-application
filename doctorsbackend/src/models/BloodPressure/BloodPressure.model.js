const mongoose = require('mongoose');
const moment = require('moment')

const Schema = mongoose.Schema;

let BloodPressureSchema = new Schema(
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

const vitalParam = mongoose.model('BloodPressure', BloodPressureSchema);

// Set up the Change Stream
const changeStream = vitalParam.watch();
// Listen for 'change' events
changeStream.on('change', async (change) => {
  if (change.operationType === 'insert') {
    const record = change.fullDocument;
    // console.log('New document inserted:', record);
    // Perform additional operations or trigger events
    try {
      if (parseInt(record.rate.split("/")) > 130) {
        const { getPatientById } = require('../../services/Patient/patient.service');
        const { getDoctorById } = require('../../services/Doctor/doctor.service');
        const { createNotification } = require('../../services/Notification/notification.service');
        let patient = await getPatientById(record.patient);
        let doctor = await getDoctorById(record.doctor);
        let notification = {
          doctor: record.doctor,
          patient: record.patient,
          title: `The blood pressure of ${patient.name} is high at ${record.rate}`,
          subTitle: `High blood pressure under observation`,
          route: `/patients/patient-details/${record.patient}`,
          user: doctor.userId._id
        };
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

BloodPressureSchema.post('save', async (doc) => {


})

module.exports = vitalParam;
