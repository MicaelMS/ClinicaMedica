const Medico = require('../models/Medico');

const MedicoController = {
    getAllMedico: async (req, res) => {
        try {
            console.log('Entrou em medicos');
            const medicos = await Medico.find();
            res.json(medicos);
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    },

    getMedicoById: async (req, res) => {
        try {
            const medicos = await Medico.findById(req.params.id);
            if(medicos){
                res.json(medicos);
            } else {
                res.status(404).json({ message: 'Medico não encontrado' });
            }            
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    createMedico: async (req, res) => {
        console.log("Novo Medico");
        const newMedico = new Medico(req.body);

        try {
            const savedMedico = await newMedico.save();
            res.status(201).json(savedMedico);                        
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    },

    updateMedico: async (req, res) => {
        console.log("Atualizando Medico");
        try {
          const updatedMedico = await Medico.findByIdAndUpdate(req.params.id, req.body, { new: true });
          res.json(updatedMedico);
        } catch (error) {
          res.status(400).json({ message: error.message });
        }
      },
    
      deleteMedico: async (req, res) => {
        console.log("Deletando Medico");
        try {
          await Medico.findByIdAndDelete(req.params.id);
          res.json({ message: 'Medico excluída com sucesso' });
        } catch (error) {
          res.status(500).json({ message: error.message });
        }
      },
    };
module.exports = MedicoController;