const mongoose = require('mongoose');

const consultaSchema = new mongoose.Schema({    
    medico: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Medico',
        required: true
    },
    paciente: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Paciente',
        required: true
    },
    descricao: {
        type: String,
        required: true
    },
    dataConsulta: {
        type: Date,
        required: true
    },
    dataCadastro: {
        type: Date,
        default: Date.now(),
        required: true
    }
});

const Consulta = mongoose.model("Consulta", consultaSchema);

module.exports = Consulta;