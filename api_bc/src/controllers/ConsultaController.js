const Consulta = require ('../models/Consulta');

const ConsultaController = {
    getAllConsulta: async (req, res) => {
      try {
        console.log('Entrou em consultas')
        const consultas = await Consulta.find();
        res.json(consultas);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    },
  
    getConsultaById: async (req, res) => {
      try {
        const consulta = await Consulta.findById(req.params.id)
          .populate('id_Medico')
          .exec();
  
        if (consulta) {
          res.json(consulta);
        } else {
          res.status(404).json({ message: 'Consulta não encontrado' });
        }
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    },
  
    createConsulta: async (req, res) => {
      const { medico, paciente, descricao, dataConsulta} = req.body;
      console.log("Nova Consulta");

      if (!dataConsulta){
        return res.status(400).json({ message: 'A data de consulta é obrigatória'});
      }
      const newConsulta = new Consulta(req.body);
  
      try {
        const savedConsulta = await newConsulta.save();
        res.status(201).json(savedConsulta);
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
    },
  
    updateConsulta: async (req, res) => {
      console.log("Atualizando Consulta");
      try {
        const updatedConsulta = await Consulta.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedConsulta);
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
    },
  
    deleteConsulta: async (req, res) => {
      console.log("Deletando Consulta");
      try {
        await Consulta.findByIdAndDelete(req.params.id);
        res.json({ message: 'Consulta excluída com sucesso' });
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    },
  };

  module.exports = ConsultaController;