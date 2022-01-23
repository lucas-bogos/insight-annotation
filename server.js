import express, { request, response } from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import sequelize from './database/connection';
import cors from 'cors';

// const anotacoes = require('./database');
const Note = require('./database/models/Note');
require('dotenv').config();

// configura para usar express
const app = express();

// inicia o banco de dados
sequelize.sync().then(() => console.log('Database is ready!'))

// middlewares
app.use(cors())
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, '/public')));

const config = {
    port: process.env.PORT,
    hostname: process.env.HOSTNAME
};

// rotas do app
app.get('/listar-anotacao', async (request, response) => {
    const annotations = await Note.findAll();
    response.json({ annotations });
});

app.get('/listar-anotacao/:id', async (request, response) => {
    const annotation = await Note.findByPk(request.params.id)
    if(!annotation)
        return response.status(404).json({
            error: 404,
            message: "anotação não encontrada :("
        })
    response.json({ annotation })
});

app.post('/adicionar-anotacao', async (request, response) => {
    const { title, description } = request.body;

    await Note.create({
        title: title,
        description: description
    })

    return response.status(200).json({ title, description })
});

app.put('/editar-anotacao/:id', async (request, response) => {
    const { title, description } = request.body;

    await Note.update({ 
        title: title,
        description: description
    },{ 
        where: { id: request.params.id } 
    })

    return response.status(200).json({ title, description })
});

app.delete('/remover-anotacao/:id', async (request, response) => {
    await Note.destroy({ where: { id:request.params.id }})
    .then(() => {
        response.status(200).json({
            removido: `sucesso na remoção da anotação com o ID ${request.params.id}`
        })
    })
    .catch(() => {
        response.status(404).json({
            error: 404,
            message: "Não foi possível deletar a anotação"
        })
    })
});

// inicia o servidor
app.listen(config.port, config.hostname, () => {
    console.log(
        `server running in http://${config.hostname}:${config.port}`
    )
});