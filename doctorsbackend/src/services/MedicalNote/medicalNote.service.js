const httpStatus = require('http-status');
const MedicalNote = require('../../models/MedicalNote/MedicalNote.model');
const ApiError = require('../../utils/ApiError');

const createMedicalNote = async (body) => {
  return MedicalNote.create(body);
};

const getAllMedicalNotes = async () => {
  return MedicalNote.find().populate('patient doctor');
};

const getMedicalNoteById = async (id) => {
  return MedicalNote.findById(id).populate('patient doctor');
};

const getNoteByPatientId = async (patientId) => {
  return MedicalNote.find({ patient: patientId }).populate('patient doctor');
};
const updateMedicalNoteById = async (id, updateBody) => {
  const medicalNote = await getMedicalNoteById(id);
  if (!medicalNote) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Medical Note not found');
  }
  Object.assign(medicalNote, updateBody);
  await medicalNote.save();
  return medicalNote;
};

const deleteMedicalNoteById = async (id) => {
  const medicalNote = await getMedicalNoteById(id);
  if (!medicalNote) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Medical Note not found');
  }
  await medicalNote.remove();
  return medicalNote;
};

module.exports = {
  createMedicalNote,
  getAllMedicalNotes,
  getMedicalNoteById,
  getNoteByPatientId,
  updateMedicalNoteById,
  deleteMedicalNoteById,
};
