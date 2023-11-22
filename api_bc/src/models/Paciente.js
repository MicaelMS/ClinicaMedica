const mongoose = require('mongoose');

const pacienteSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },
  idade: {
    type: Number,
    required: true,
  },
  dataCadastro:{
    type: Date,
    default: Date.now(),
  }
});

const Paciente = mongoose.model('Paciente', pacienteSchema);

module.exports = Paciente;