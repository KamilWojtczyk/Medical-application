const Saturation = require('../../models/saturation');

const createSaturation = async (d_body) => {
  return Saturation.create(d_body);
};

const getAllSaturation = async () => {
  return Saturation.find().populate('patient doctor');
};

module.exports = {
  createSaturation,
  getAllSaturation,
};
