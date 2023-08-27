// Require the necessary discord.js classes
const { Client, Events, GatewayIntentBits } = require('discord.js');
const { token, botChannels, regex } = require('./config.json');
const re = new RegExp(regex);
// Create a new client instance
const client = new Client({ intents: [
					GatewayIntentBits.MessageContent,
					GatewayIntentBits.Guilds,
					GatewayIntentBits.GuildMessages,
					GatewayIntentBits.GuildMembers] });

// When the client is ready, run this code (only once)
client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.on(Events.MessageCreate, message => {
	if (!botChannels.includes(message.channelId)) {
		if(message.author.bot)
			message.delete();
		else if(re.test(message.content)) {
			usr = message.guild.members.resolve(message.author.id);
			message.delete();
			usr.timeout(60000);
		}
	}
})

// Log in to Discord with your client's token
client.login(token);

const { server, PORT } = require('keepAlive.js');
server.listen(PORT, () => console.log(`Keep alive server running on port ${PORT}`));
