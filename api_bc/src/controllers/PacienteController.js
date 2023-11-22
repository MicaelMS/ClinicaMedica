const Paciente = require('../models/Paciente');

const PacienteController = {
  getAllPacientes: async (req, res) => {
    try {
      const pacientes = await Paciente.find();
      res.json(pacientes);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getPacienteById: async (req, res) => {
    try {
      const pacientes = await Paciente.findById(req.params.id);
      if (pacientes) {
        res.json(pacientes);
      } else {
        res.status(404).json({ message: 'Paciente não encontrado' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  createPaciente: async (req, res) => {
    const newPaciente = new Paciente(req.body);

    try {
      const savedPaciente = await newPaciente.save();
      res.status(201).json(savedPaciente);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  updatePaciente: async (req, res) => {
    try {
      const updatedPaciente = await Paciente.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(updatedPaciente);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  deletePaciente: async (req, res) => {
    try {
      await Paciente.findByIdAndDelete(req.params.id);
      res.json({ message: 'Paciente excluído com sucesso' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = PacienteController;
