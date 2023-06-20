module.exports = {
	name: 'ping',
    description: 'Ping!',
	cooldown: 5,
	execute(client, msg) {
		msg.channel.send('Pong.');
		return;
	},
};