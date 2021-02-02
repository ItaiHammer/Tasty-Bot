import express from 'express';
import fs from 'fs';
import './index.js';

const port = process.env.PORT || 5000;

express()
    .get('/', (req, res) => res.send('welcome!'))
    .get('/server/data', (req, res) => {
        const serverData = JSON.parse(
            fs.readFileSync('./serverproperties.json')
        );
        res.sendFile(serverData);
    })
    .listen(port, () => console.log(`Server is running on ${port}`));

if (process.env.PORT !== null) {
    setInterval(async () => {
        await fetch('/');
        console.log('fetched');
    }, 60000);
}
