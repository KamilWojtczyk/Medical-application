const httpStatus = require('http-status');
const ApiError = require('../../utils/ApiError');
const catchAsync = require('../../utils/catchAsync');
const medicalNoteService = require('../../services/MedicalNote/medicalNote.service');
require('dotenv').config()


const createMedicalNote = catchAsync(async (req, res) => {

  const medicalNote = await medicalNoteService.createMedicalNote(req.body);
  res.send(medicalNote);
});

const getMedicalNotes = catchAsync(async (req, res) => {
  const result = await medicalNoteService.getAllMedicalNotes();
  res.send(result);
});

const getMedicalNote = catchAsync(async (req, res) => {
  const medicalNote = await medicalNoteService.getMedicalNoteById(req.params.id);
  if (!medicalNote) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Medical Note not found');
  }
  res.send(medicalNote);
});
const getMedicalNoteByPatientId = catchAsync(async (req, res) => {
  const medicalNote = await medicalNoteService.getNoteByPatientId(req.body.patientId);
  if (!medicalNote) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Medical Note not found');
  }
  res.send(medicalNote);
});

const updateMedicalNote = catchAsync(async (req, res) => {
  req.body.updated_at = new Date()
  const medicalNote = await medicalNoteService.updateMedicalNoteById(req.params.id, req.body);
  res.send(medicalNote);
});

const deleteMedicalNote = catchAsync(async (req, res) => {
  await medicalNoteService.deleteMedicalNoteById(req.params.id);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createMedicalNote,
  getMedicalNotes,
  getMedicalNote,
  getMedicalNoteByPatientId,
  updateMedicalNote,
  deleteMedicalNote,
};
