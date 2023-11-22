const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const password = encodeURIComponent('MongoDB@123');
import User from './models/User.js'

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get('/users', async (request, response) => {
  const users = await User.find()
  return response.status(200).json(users)
})

app.post('/users', async (request, response) => {
  const user = request.body

  const newUser = await User.create(user)

  return response.status(201).json(newUser)
})

const connectDatabase = async () => {
  try {
    await mongoose.connect(`mongodb+srv://Micael:${Password}@cluster0.qf5kkox.mongodb.net/`, {});

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
// mongoose.connect(`mongodb+srv://Micael:${password}@cluster0.qf5kkox.mongodb.net/?retryWrites=true&w=majority`)
//     .then(() => console.log("Banco de Dados conectado"))
//     .catch(() => console.log('Deu RUIM'))

connectDatabase();