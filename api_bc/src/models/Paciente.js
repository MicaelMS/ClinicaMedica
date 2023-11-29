const mongoose = require('mongoose');

const pacienteSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },
  dataNascimento: {
    type: Date,
    required: true,
  },
  dataCadastro: {
    type: Date,
    default: Date.now(),
    required: true,
  },
  // Adicione campos opcionais conforme necessário
  endereco: {
    type: String
  },
  email: {
    type: String
  }
});

const Paciente = mongoose.model('Paciente', pacienteSchema);

module.exports = Paciente;
