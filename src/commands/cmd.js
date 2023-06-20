module.exports = {
	name: 'cmd',
    description: '.',
    ownerOnly: true,
	execute(client, msg, args) {

		

		if (args[0] == 'reload') {
			if (!args[0] || !args[1]) return msg.channel.send('cmd [relaod, login, logout] [Command]');

			const commandName = args[1].toLowerCase();
			const command = msg.client.commands.get(commandName)
				|| msg.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

			if (!command) {
				return msg.channel.send(`There is no command with name or alias \`${commandName}\`, ${msg.author}!`);
			}

			try {
				delete require.cache[require.resolve(`./${command.name}.js`)];
				const newCommand = require(`./${command.name}.js`);
				msg.client.commands.set(newCommand.name, newCommand);
				msg.channel.send(`Command \`${command.name}\` was reloaded!`);
			} catch (error) {
				console.log(error);
				msg.channel.send(`There was an error while reloading a command \`${command.name}\`:\n\`${error.message}\``);
			}

		} else if (args[0] == 'logout') {
			if (!args[0] || !args[1]) return msg.channel.send('cmd [relaod, login, logout] [Command]');

			const commandName = args[1].toLowerCase();
			const command = msg.client.commands.get(commandName)
				|| msg.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

			if (!command) {
				return msg.channel.send(`There is no command with name or alias \`${commandName}\`, ${msg.author}!`);
			}

			delete require.cache[require.resolve(`./${command.name}.js`)];
			client.commands.sweep(cmd => cmd.name === command.name);

			msg.reply('Done.');
		} else if (args[0] == 'login') {
			try {
				const newCommand = require(`./${args[1]}.js`);
				msg.client.commands.set(args[1], newCommand);
				msg.channel.send(`Done.`);
			} catch (error) {
				console.log(error);
				msg.channel.send(`error`);
			}
		}
		return;
	},
};