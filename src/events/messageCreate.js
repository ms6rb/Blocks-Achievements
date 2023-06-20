const { prefix, ownerID, staffList } = require('../data/config.json');

module.exports = {
    async run(client, msg) {

        if (!msg.guild || msg.guild.id !== "211543198651121664") return;
        if (!msg.author.bot) countMessage(client, msg.author.id);

        if (!msg.content.startsWith(prefix) || msg.author.bot) return;

        const args = msg.content.slice(prefix.length).split(/ +/);
        const commandName = args.shift().toLowerCase();

        const command = client.commands.get(commandName)
            || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

        if (!command) return;

        if (command.ownerOnly && msg.author.id !== ownerID) return;
        if (command.staffOnly && !staffList.includes(msg.author.id)) return;

        try {
            msg.prefix = prefix;
            command.execute(client, msg, args);
        } catch (error) {
            console.error(error);
            msg.reply('there was an error trying to execute that command!');
        }
    }
}




function countMessage(client, userID) {

    if (!client.messageCounter[userID]) {
        client.messageCounter[userID] = 1;
    } else client.messageCounter[userID] ++;

}