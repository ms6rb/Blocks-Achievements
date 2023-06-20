require('dotenv').config();
const { Client, Collection, Intents } = require('discord.js');
const fs = require('fs');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.DIRECT_MESSAGES, Intents.FLAGS.MESSAGE_CONTENT] });
client.commands = new Collection();

client.messageCounter = {};
client.voiceCounter = {};

runUtilitys();


try {
    const commandFiles = fs.readdirSync('./src/commands').filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const command = require(`./src/commands/${file}`);
        client.commands.set(command.name, command);
    }

    fs.readdir('./src/events/', (err, files) => {
        if (err) return console.error(err);
        files.forEach(file => {
            const eventFunction = require(`./src/events/${file}`);
            if (eventFunction.disabled) return;

            const event = eventFunction.event || file.split('.')[0];
            const emitter = (typeof eventFunction.emitter === 'string' ? client[eventFunction.emitter] : eventFunction.emitter) || client;
            const once = eventFunction.once;

            try {
                emitter[once ? 'once' : 'on'](event, (...args) => eventFunction.run(client, ...args));
            } catch (error) {
                console.error(error.stack);
            }
        });
    });
} catch (err) {
    console.log(err);
}


async function runUtilitys() {
    try {
        // const createBoard = await require('./src/utilitys/createBoard');
        // const createGifBoard = await require('./src/utilitys/createGifBoard');
        // client.createGifBoard = createGifBoard;
        // client.createBoard = createBoard;
        // client.chessIMGs = await imgs();
        // client.endGame = endGame;
        // stockfish.run(client);
        // db.run(client);


        
    } catch (err) {
        console.log(err);
    }
}

client.login(process.env.TOKEN);