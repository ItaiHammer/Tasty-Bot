import express from 'express';
import './index.js';

const port = process.env.PORT || 5000;

express()
    .get('/', (req, res) => res.send('welcome!'))
    .listen(port, () => console.log(`Server is running on ${port}`));
