const express = require('express');
const router = express.Router();
const MedicoController = require('../../controllers/MedicoController');

router.get('/consultar', MedicoController.getAllMedico);

router.get('/consulta/:id', MedicoController.getMedicoById);

router.post('/salvar', MedicoController.createMedico);

router.put('/editar/:id', MedicoController.updateMedico);

router.delete('/deletar/:id', MedicoController.deleteMedico);

module.exports = router;