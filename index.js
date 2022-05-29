//dependencies
const fetch = require('node-fetch');
const {
	Client,
	MessageEmbed
} = require('discord.js');
const client = new Client({
	intents: 32767
});
const colors = require('colors');

//configuration
const config = {
	prefix: '!',
	color: 'blurple',
	errorColor: 'red',
	footer: 'By DerpyDev♥️',
	emoji: '🤯',
	errorEmoji: '🤔',
	timestamp: true,
	website: false
};
const embed = new MessageEmbed()
	.setColor(config.color.toUpperCase())
	.setFooter({
		text: config.footer
	})
	.setTimestamp(config.timestamp);

//commands (message event)
client.on('messageCreate', async message => {
	if (message.content.startsWith(`${config.prefix}random`)) {
		const args = message.content.split(' ');
		const choice = args.slice(1).join(0).toUpperCase();
		if (!choice) return message.reply({
			embeds: [embed
				.setTitle(config.errorEmoji + ' | No Option Provided!')
				.setDescription(`Options: \n\`wyr\` - Would you rather\n\`dare\` - Dare\n\`truth\` - Truth\n\`nhie\` - Never have I ever`)
				.setColor(config.errorColor.toUpperCase())
			]
		});
fetch(`https://api.truthordarebot.xyz/api/${choice}`).then(res => res.json())
			.then(async json => {
				const question = json.question;
				if (!question) return message.reply({
					embeds: [embed
						.setTitle(config.errorEmoji + ' | Invalid Option Provided!')
						.setDescription(`Options: \n\`wyr\` - Would you rather\n\`dare\` - Dare\n\`truth\` - Truth\n\`nhie\` - Never have I ever`)
						.setColor(config.errorColor.toUpperCase())
					]
				});
				await message.reply({
					embeds: [embed
						.setTitle(config.emoji + ` | Random ${choice}`)
						.setDescription(`${question}`)
					]
				}).catch(error => message.reply({
					embeds: [embed
						.setTitle(config.errorEmoji + ' | An Error Occured')
						.setDescription(`${error}`)
						.setColor(config.errorColor.toUpperCase())
					]
				}));
			});
	} else if (message.content == `${config.prefix}help`) {
		await message.reply({
			embeds: [embed
				.setTitle(config.emoji + ' | My Commands & Options')
				.setDescription(`${config.prefix}random\nOptions: \n\`wyr\` - Would you rather\n\`dare\` - Dare\n\`truth\` - Truth\n\`nhie\` - Never have I ever`)
			]
		});
	} else return;
});

//ready event
client.on('ready', async() => {
	console.log('[BOT]: ONLINE!'.brightGreen);
  await client.user.setPresence({
    activities: [{
    name: 'Random Games',
    type: 'COMPETING'
    }], status: 'dnd'
  });
});

//website (if config is true)
if (config.website == true) {
	app.get('/', async (req, res) => {
	res.sendFile(path.join(__dirname + '/website.html'));
	});
	app.listen(3000 || 8080, () => console.log('[WEBSITE]: ONLINE!'.brightGreen));
} else console.log('[WEBSITE]: OFFLINE'.grey);

//start bot
client.login(process.env.TOKEN);