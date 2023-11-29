const mongoose = require('mongoose');
const password = encodeURIComponent('MongoDB@123');
const port = 3000;

const connectDatabase = async () => {
    try {
    //   await mongoose.connect(`mongodb+srv://Micael:${password}@cluster0.qf5kkox.mongodb.net/ClinicaSaude`, {});
      await mongoose.connect(`mongodb://localhost:27017/ClinicaSaude`, {});
      
      console.log('MongoDB conectado');
  
      const db = mongoose.connection;
  
      db.on('error', console.error.bind(console, 'Erro de conexão ao MongoDB:'));
      db.once('open', function () {
        console.log('Conectado ao MongoDB Atlas');
        
        app.listen(port, () => {
          console.log(`Servidor rodando na porta ${port}`);
        });
      });
    } catch (error) {
      console.error('Erro de conexão ao MongoDB:', error.message);
    }
  };

module.exports = connectDatabase;
