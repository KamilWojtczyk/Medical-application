const httpStatus = require('http-status');
const Notification = require('../../models/Notification/notification.model');
const ApiError = require('../../utils/ApiError');
const moment = require('moment');

class NotificationBody {
    title = '';
    user = '';
    doctor = '';
    patient = '';
    route = '';
    subTitle = '';
}
/**
 * @param {NotificationBody} body - The body of the notification.
 */
async function createNotification(body) {
    return Notification.create(body);
};

const getAllNotifications = async (req) => {

    let query = {
        user: req.user._id,
        readAt: null
    };

    // Define the query options for pagination
    const page = 1; // The page number you want to retrieve
    const pageSize = 50; // The number of records per page
    const skip = (page - 1) * pageSize;
    // Define the sort options
    const sort = {
        createdAt: -1, // Sort by descending order of 'createdAt' field
    };

    let notifications = await Notification.find(query)
        .sort(sort)
        .skip(skip)
        .limit(pageSize);

    let totalRecords = await Notification.count(query);

    const totalPages = Math.ceil(totalRecords / pageSize);


    let unreadQuery = { ...query, readAt: null }
    let unread = await Notification.count(unreadQuery);

    return { unread, page, totalPages, totalRecords, pageSize, data: notifications }
};

const markNotificationRead = async (id) => {
    return Notification.findByIdAndUpdate(id, {
        readAt: moment()
    })
}

module.exports = {
    createNotification,
    getAllNotifications,
    markNotificationRead
};
