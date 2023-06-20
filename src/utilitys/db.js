const mysql = require('mysql2/promise');

const dbConfig = {
    host: '141.95.141.208',
    user: "Prum",
    password: 'kgmJN2rBeMWAGOF2',
    database: 'BlocksDiscord',
    port: 3306,
    multipleStatements: true,
};

let connection;

module.exports = {
    
    signup,
    update,
    checkNumericalAchievements

}

async function query(sql, params) {
    const [results, ] = await connection.execute(sql, params);

    return results;
}


async function signup() {
    connection = await mysql.createConnection(dbConfig);

    await query(`CREATE TABLE IF NOT EXISTS achievements (
        id VARCHAR(100) PRIMARY KEY,
        messages INT(100),
        voiceSec INT(100),
        events INT(100),
        purchases INT(100),
        achev1 BOOLEAN DEFAULT FALSE,
        achev2 BOOLEAN DEFAULT FALSE,
        achev3 BOOLEAN DEFAULT FALSE,
        achev4 BOOLEAN DEFAULT FALSE,
        achev5 BOOLEAN DEFAULT FALSE,
        achev6 BOOLEAN DEFAULT FALSE,
        achev7 BOOLEAN DEFAULT FALSE,
        achev8 BOOLEAN DEFAULT FALSE,
        achev9 BOOLEAN DEFAULT FALSE,
        achev10 BOOLEAN DEFAULT FALSE,
        achev11 BOOLEAN DEFAULT FALSE,
        achev12 BOOLEAN DEFAULT FALSE,
        achev13 BOOLEAN DEFAULT FALSE
    );`);
    return query;
}


function update(client) {
    updateMessageCounter(client);
    updateVoiceCounter(client);
}

function updateMessageCounter(client) {
    var messageCounter = client.messageCounter;
    
    if (Object.keys(messageCounter).length == 0) return;

    client.messageCounter = {};


    for (let [key, value] of Object.entries(messageCounter)) {
        query(`INSERT INTO achievements (id, messages, voiceSec, events, purchases) VALUES ('${key}', ${value}, 0, 0, 0) ON DUPLICATE KEY UPDATE messages = messages + ${value};`);
    };
}

function updateVoiceCounter(client) {
    var voiceCounter = client.voiceCounter;
    
    if (Object.keys(voiceCounter).length == 0) return;

    client.voiceCounter = {};


    for (let [key, value] of Object.entries(voiceCounter)) {
        query(`INSERT INTO achievements (id, voiceSec, messages, events, purchases) VALUES ('${key}', ${value}, 0, 0, 0) ON DUPLICATE KEY UPDATE voiceSec = voiceSec + ${value};`);
    };
}


async function checkNumericalAchievements(type, number, achievementID) {
    const members = await query(`SELECT * FROM achievements WHERE ${type} >= ${number} AND achev${achievementID} = false;`)
    if (members.length == 0) return;

    members.forEach(m => {
        query(`UPDATE achievements SET achev${achievementID} = true WHERE id = '${m.id}';`);
        console.log(`${m.id} got the Achievement number ${achievementID}`);
    })

}


