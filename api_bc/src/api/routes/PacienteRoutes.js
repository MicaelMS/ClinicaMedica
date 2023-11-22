const express = require('express');
const router = express.Router();
const PacienteController = require('../../controllers/PacienteController');

router.get('/paciente', PacienteController.getAllPacientes);

router.get('/paciente/:id', PacienteController.getPacienteById);

router.post('/paciente', PacienteController.createPaciente);

router.put('/paciente/:id', PacienteController.updatePaciente);

router.delete('/paciente/:id', PacienteController.deletePaciente);

module.exports = router;
