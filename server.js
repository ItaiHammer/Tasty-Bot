import express from 'express';
import './index.js';

const port = process.env.PORT || 5000;
const isHeroku = process.env.NODE_ENV === 'production';

express()
    .get('/', (req, res) => res.send('welcome!'))
    .listen(port, () => console.log(`Server is running on ${port}`));

if (isHeroku === true) {
    setInterval(async () => {
        await fetch('/');
        console.log('fetched');
    }, 60000);
}
