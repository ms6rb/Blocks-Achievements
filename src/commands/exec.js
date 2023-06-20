const { exec } = require("child_process");

module.exports = {
	name: 'exec',
    description: '>',
    ownerOnly: true,
	execute(client, msg, args) {
        try {
            const code = args.join(" ");
            if (code.length < 2) return msg.channel.send("No Output;");
            exec(code, (error, stdout, stderr) => {
                if (!error) {
                    if (stdout) {
                    if (stdout.length > 1300) {
                        stdout = stdout.substr(stdout.length - 1299, stdout.length)
                    }
                    }
                    msg.channel.send(`Output:\`\`\`${stdout}\`\`\``)
                } else {
                    msg.channel.send(`Output:\`\`\`${stderr}\`\`\``)
                }
            });
            return;
        } catch (err) {
            console.log(err);
        }
    }
};