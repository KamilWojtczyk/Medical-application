const mongoose = require('mongoose');
const moment = require('moment');
const { paginate } = require('../plugins');

const Schema = mongoose.Schema;
const schema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        subTitle: {
            type: String,
            required: false,
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        doctor: {
            type: Schema.Types.ObjectId,
            ref: 'Doctor',
        },
        patient: {
            type: Schema.Types.ObjectId,
            ref: 'Patient',
        },
        route: {
            type: String,
            required: true,
        },
        readAt: {
            type: Date
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

// schema.plugin(paginate)

module.exports = mongoose.model('Notification', schema);
