import express from 'express';
import path from 'path';
import fetch from 'node-fetch';
import fs from 'fs';
import bodyParser from 'body-parser';

//files
import './index.js';
import connectToDatabase from './config/connectToDatabase.js';

const port = process.env.PORT || 5000;
const __dirname = path.resolve(path.dirname(''));

express()
    .use(bodyParser())

    .get('/', (req, res) => res.send('Tasty Bot!'))
    .listen(port, () => console.log(`Server is running on ${port}`));

connectToDatabase();

if (process.env.PORT != null) {
    setInterval(async () => {
        await fetch('https://tatsy-bot.herokuapp.com/');
        console.log('PING!');
    }, 60000);
}
