const mongoose = require('mongoose');
const moment = require('moment')

const Schema = mongoose.Schema;

let doctorSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },

    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
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

const doctor = mongoose.model('Doctor', doctorSchema);
module.exports = doctor;
