const express = require('express');
const router = express.Router();
const ConsultaController = require('../../controllers/ConsultaController');

router.get('/consultar', ConsultaController.getAllConsulta);

router.get('/consulta/:id', ConsultaController.getConsultaById);

router.post('/salvar', ConsultaController.createConsulta);

router.put('/editar/:id', ConsultaController.updateConsulta);

router.delete('/deletar/:id', ConsultaController.deleteConsulta);

module.exports = router;