const mongoose = require('mongoose');
const moment = require('moment')

const Schema = mongoose.Schema;
const medicalNoteSchema = new Schema(
  {
    note: {
      type: String,
      required: true,
      es_indexed: true,
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

const medicalNote = mongoose.model('MedicalNote', medicalNoteSchema);
module.exports = medicalNote;
