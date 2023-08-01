const mongoose = require('mongoose');
const moment = require('moment')

const Schema = mongoose.Schema;
const patientSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      es_indexed: true,
    },
    age: {
      type: Number,
      required: true,
      es_indexed: true,
    },
    height: {
      type: Number,
      required: true,
      es_indexed: true,
    },
    weight: {
      type: Number,
      required: true,
      es_indexed: true,
    },
    phone: {
      type: String,
      required: true,
      es_indexed: true,
    },
    gender: {
      type: String,
      required: true,
      es_indexed: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    doctor: {
      type: Schema.Types.ObjectId,
      ref: 'Doctor',
    },
    DOB: {
      type: Date,
      required: true,
    },
    peselNo: {
      type: Number,
      required: true,
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

const patient = mongoose.model('Patient', patientSchema);
module.exports = patient;
