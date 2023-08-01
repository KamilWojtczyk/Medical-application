const express = require('express');
const auth = require('../../../middlewares/auth');
const medicalNoteController = require('../../../controllers/MedicalNote/medicalNote.controller');
const router = express.Router();

router
  .route('/')
  .post(auth('doctor'), medicalNoteController.createMedicalNote)
  .get(medicalNoteController.getMedicalNotes);

  router.route('/searchByPatientId').post(medicalNoteController.getMedicalNoteByPatientId);

router
  .route('/:id')
  .get(medicalNoteController.getMedicalNote)
  .patch(auth('manageUsers'), medicalNoteController.updateMedicalNote)
  .delete(auth('manageUsers'), medicalNoteController.deleteMedicalNote);
module.exports = router;
