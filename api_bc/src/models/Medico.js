const mongoose = require('mongoose');

const medicoSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    dataCadastro: {
        type: Date,
        default: Date.now(),
        required: true
    },
    especialidade: {
        type: String,
        required: true
    },
    // Adicione um campo opcional para armazenar o número de telefone do médico, por exemplo
    telefone: {
        type: String
    }
});

const Medico = mongoose.model("Medico", medicoSchema);

module.exports = Medico;
