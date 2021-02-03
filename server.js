import express from 'express';
import path from 'path';
import fetch from 'node-fetch';
import fs from 'fs';
import './index.js';

const port = process.env.PORT || 5000;
const __dirname = path.resolve(path.dirname(''));

express()
    .get('/', (req, res) => res.send('Tasty Bot!'))
    .get('/server/data', (req, res) => {
        res.sendFile(path.join(__dirname, 'serverproperties.json'));
    })
    .listen(port, () => console.log(`Server is running on ${port}`));

if (process.env.PORT != null) {
    setInterval(async () => {
        await fetch('https://tatsy-bot.herokuapp.com/');
        console.log('PING!');
    }, 60000);
}
