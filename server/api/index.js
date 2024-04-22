import dotenv from 'dotenv';
import express from 'express';
import {getAllUsers, getUserById , register , login} from "../queries/index.js";
import cors from "cors";

const app = express();
const port = 3000;

dotenv.config({path: '../../.env'});

app.use(cors())
app.use(express.json())

app.get('/api/users', async (request, response) => {
    try {
        const users = await getAllUsers();
        response.json(users);
    } catch (error) {
        response.status(500).json({error: 'Erreur serveur !'});
    }
});

app.get('/api/user/:id', async (request, response) => {
    try {
        const user = await getUserById(request.params.id);
        response.json(user);
    } catch (error) {
        response.status(500).json({error: 'Erreur serveur !'})
    }
})

app.post('/register', async (request, response) => {
    try {
        const result = await register(request.body);
        response.status(200).json(result.rows[0]);
    } catch (error) {
        console.log(error.message)
        response.status(500).json({error: 'Erreur serveur !', err: error.message})
    }
})

app.post('/login', async (request, response) => {
    try {
        const result = await login(request.body)
        response.json(result)
    } catch (error) {
        console.log(error.message)
        response.status(500).json({error: 'Erreur serveur !'})
    }
})

app.listen(port, () => {
    console.log(`Serveur tourne sur le port : ${port}.`)
})

