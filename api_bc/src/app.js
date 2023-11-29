const express = require('express');
const bodyParser = require ('body-parser');
const cors = require('cors');
const pacienteRouter = require('./api/routes/PacienteRoutes');
const userRouter = require('./api/routes/userRoutes')
const consultaRouter = require('./api/routes/consultaRoutes')
const medicoRouter = require('./api/routes/medicoRoutes')
const connectDatabase = require('./database');

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use('/paciente', pacienteRouter);
app.use('/user', userRouter);
app.use('/consulta', consultaRouter);
app.use('/medico', medicoRouter);
app.listen(3000, () => {
  console.log(`Servidor rodando na porta 3000`);
});

connectDatabase();