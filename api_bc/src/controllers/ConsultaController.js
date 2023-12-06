const Consulta = require('../models/Consulta');

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
    const { medico, paciente, descricao, dataConsulta } = req.body;
    console.log("Nova Consulta");

    if (!dataConsulta) {
      return res.status(400).json({ message: 'A data de consulta é obrigatória' });
    }

    const data = new Date(dataConsulta)
    const horaConsulta = data.getUTCHours();
    if (horaConsulta < 8 || horaConsulta >= 18) {
      return res.status(400).json({ message: 'Consulta não permitida antes das 08:00 ou após as 18:00' });
    }      console.log('Consulta feita fora de hora '+ horaConsulta);


    //Verificar se a consulta ocorre em um domingo
    if (data.getDay() === 0){
      return res.status(400).json({ message: 'Consulta não permitida aos domingos' });
    }

    const dataInicio = new Date(data.getTime() - 30 * 60 * 1000); // 30 minutos antes
    const dataFim = new Date(data.getTime() + 30 * 60 * 1000); // 30 minutos depois

    const consultas = await Consulta.find({
      medico,
      dataConsulta: {
        $gte: dataInicio,
        $lt: dataFim,
      },
    });

    if (consultas.length > 0) {
      console.log('Já possui consulta nesse horário para esse Médico');
      return res.status(400).json({ message: 'Já possui consulta nesse horário para esse Médico' });
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
  scheduleReconsulta: async (req, res) => {
    try {
      const consultaOriginal = await Consulta.findById(req.params.id);

      if (!consultaOriginal) {
        return res.status(404).json({ message: 'Consulta original não encontrada' });
      }

      // Verificar se há consulta no mesmo horário 6 meses depois
      const dataReconsulta = new Date(consultaOriginal.dataConsulta);
      dataReconsulta.setMonth(dataReconsulta.getMonth() + 6);

      const dataInicio = new Date(dataReconsulta.getTime() - 30 * 60 * 1000);
      const dataFim = new Date(dataReconsulta.getTime() + 30 * 60 * 1000);

      const consultas = await Consulta.find({
        medico: consultaOriginal.medico,
        dataConsulta: {
          $gte: dataInicio,
          $lt: dataFim,
        },
      });

      if (consultas.length > 0) {
        return res.status(400).json({ message: 'Já possui consulta nesse horário para esse Médico' });
      }

      // Agendar a reconsulta
      const reconsulta = new Consulta({
        medico: consultaOriginal.medico,
        paciente: consultaOriginal.paciente,
        descricao: 'Reconsulta',
        dataConsulta: dataReconsulta,
      });

      const savedReconsulta = await reconsulta.save();
      res.status(201).json(savedReconsulta);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = ConsultaController;