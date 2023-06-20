const message = require("../events/messageCreate");

module.exports = {
	name: 'give',
    description: 'Ping!',
	execute(client, msg, args) {

		const member = msg.mentions.users.first();

        if (!member || member.bot) return msg.reply('mention?');
		if (!args[1]) return msg.reply(`1- event wining count\n2-Meme Master\n3-Content Creator`);

		if (args[1] == '1') {

			client.query(`UPDATE achievements SET events = events + 1 WHERE id = '${member.id}';`);
			checkEventCounter(client, member.id);
			msg.reply('Done.');

		} else if (args[1] == '2') {

			client.query(`UPDATE achievements SET achev12 = true WHERE id = '${member.id}';`);
			member.send(`congratulations, you had won the **Meme Master** achievement.`);
			msg.reply('Done.');


		} else if (args[1] == '3') {

			client.query(`UPDATE achievements SET achev13 = true WHERE id = '${member.id}';`);
			member.send(`congratulations, you had won the **Content Creator** achievement.`);
			msg.reply('Done.');

		} else msg.reply(`1- event wining count\n2-Meme Master\n3-Content Creator`);
				
		return;
	},
};

function checkEventCounter(client, userID) {

	[
		{number: 1, id: 9},
		{number: 5, id: 10},
		{number: 10, id: 11}	
	].forEach(async a=> {
		const eventAchev = await client.query(`SELECT * FROM achievements WHERE id = '${userID}' AND events >= ${a.number} AND achev${a.id} = false;`)
		if (!eventAchev[0]) return;

		await client.query(`UPDATE achievements SET achev${a.id} = true WHERE id = '${userID}';`)
		const user = client.users.cache.get(userID);
		user.send(a.number == 1 ? `congratulations, you had win in events achievement.` : `congratulations, you had ${a.number} wins in events achievement.`)
		
	})
}