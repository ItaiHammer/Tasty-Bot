import path from 'path';
import fs from 'fs';

async function changingServerData() {
    const response = await fetch('https://tatsy-bot.herokuapp.com/server/data');
    const data = await response.json();

    fs.writeFileSync('./serverproperties.json', JSON.stringify(data));
}
