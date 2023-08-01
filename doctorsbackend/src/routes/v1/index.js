const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./User/user.route');
const docsRoute = require('./docs.route');
const doctorRoute = require('./Doctor/doctor.route');
const patientRoute = require('./Patient/patient.route');
const bloodPressureRoute = require('./BloodPressure/BloodPressure.route');
const bloodSugarRoute = require('./BloodSugar/BloodSugar.route');
const heartRateRoute = require('./HeartRate/heartRate.route');
const noteRoute = require('./MedicalNote/medicalNote.route');
const saturationRoute = require('./saturation');
const notificationRoute = require('./Notification/notification.route');
const config = require('../../config/config');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/doctors',
    route: doctorRoute,
  },
  {
    path: '/patients',
    route: patientRoute,
  },
  {
    path: '/blood-pressure',
    route: bloodPressureRoute,
  },
  {
    path: '/blood-sugar',
    route: bloodSugarRoute,
  },
  {
    path: '/heart-rate',
    route: heartRateRoute,
  },
  {
    path: '/medical-notes',
    route: noteRoute,
  },
  {
    path: '/saturation',
    route: saturationRoute,
  },
  {
    path: '/notifications',
    route: notificationRoute,
  },
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
