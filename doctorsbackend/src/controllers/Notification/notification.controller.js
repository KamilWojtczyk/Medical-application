const catchAsync = require('../../utils/catchAsync');
const notificationService = require('../../services/Notification/notification.service');
require('dotenv').config();

const getAllNotifications = catchAsync(async (req, res) => {
    const doctor = await notificationService.getAllNotifications(req);
    res.send(doctor);
});

const markNotificationRead = catchAsync(async (req, res) => {
    const result = await notificationService.markNotificationRead(req.params.id);
    res.send(result);
});

module.exports = {
    getAllNotifications,
    markNotificationRead,
};
