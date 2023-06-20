module.exports = {
	name: 'eval',
    description: '>',
    ownerOnly: true,
	async execute(client, msg, args) {
        try {
            const code = args.join(" ");
            let evaled = args[0] !== 'await' ? eval(code) : await eval("(async () => { return " + code + "})()");
            
            if (typeof evaled !== "string") evaled = require("util").inspect(evaled);
            msg.channel.send(clean(await evaled), {code:"xl"});
            return;
        } catch (err) {
            console.log(err);
            msg.channel.send(`\`\`\`\n${err}\n\`\`\``)
        }
    }
};


function clean(text) {
    if (typeof(text) === "string") return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    else return text;
}