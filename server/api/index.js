import dotenv from 'dotenv';
import express from 'express';
import {getAllUsers, getUserById} from "../queries/index.js";
import cors from "cors";

dotenv.config({path: '../../.env'});
const app = express();
const port =  3000;

app.use(cors())

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
        response.status(500).json({error : 'Erreur serveur !'})
    }
})

app.listen(port, () => {
    console.log(`Serveur tourne sur le port : ${port}.`)
})

