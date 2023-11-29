const express = require('express');
const router = express.Router();
const PacienteController = require('../../controllers/PacienteController');

router.get('/consultar', PacienteController.getAllPacientes);

router.get('/consulta/:id', PacienteController.getPacienteById);

router.post('/salvar', PacienteController.createPaciente);

router.put('/editar/:id', PacienteController.updatePaciente);

router.delete('/deletar/:id', PacienteController.deletePaciente);

module.exports = router;
