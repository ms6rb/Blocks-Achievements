const { signup, update, checkNumericalAchievements } = require('../utilitys/db')

const numericalAchievements = [
    {type: 'messages', number: '100', id: '1'},
    {type: 'messages', number: '1000', id: '2'},
    {type: 'messages', number: '100000', id: '3'},
    {type: 'messages', number: '1000000', id: '4'},
    {type: 'voiceSec', number: '3600 ', id: '5'},
    {type: 'voiceSec', number: '36000', id: '6'},
    {type: 'voiceSec', number: '360000', id: '7'},
    {type: 'voiceSec', number: '3600000', id: '8'}
]


module.exports = {
    async run(client) {  
        
        client.query = await signup();

        setInterval(() => {
            countVoice(client);
        }, 5000);


        setInterval(() => {
            update(client)
        }, 60000);
        

        setInterval(() => {
            numericalAchievements.forEach(a => checkNumericalAchievements(a.type, a.number, a.id))
        }, 60000 * 3);


        console.log(`I'm Ready As ${client.user.tag}.`);
    }
}



function countVoice(client) {

    const guild = client.guilds.cache.get("211543198651121664");
    const voiceChannels = guild.channels.cache.filter(c => c.type == 'GUILD_VOICE') ;

    voiceChannels.each(vc => vc.members.filter(m => !m.voice.mute).each(m => {
        if (!client.voiceCounter[m.id]) {
            client.voiceCounter[m.id] = 5;
        } else client.voiceCounter[m.id] = client.voiceCounter[m.id] + 5;
    }))
}