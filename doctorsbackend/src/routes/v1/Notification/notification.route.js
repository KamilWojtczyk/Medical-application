const express = require('express');
const auth = require('../../../middlewares/auth');
const { getAllNotifications, markNotificationRead } = require('../../../controllers/Notification/notification.controller');
const router = express.Router();

router
  .route('/')
  .get(auth('doctor'), getAllNotifications)

router
  .route('/read/:id')
  .put(auth('doctor'), markNotificationRead)
  
module.exports = router;
