const { Client, Intents } = require('discord.js');
const searchMobileDe = require('./searchMobile');  // Import the scraping function

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

client.once('ready', () => {
  console.log('Bot is online!');
});

client.on('messageCreate', async (message) => {
  if (message.content.startsWith('!search')) {
    const query = message.content.replace('!search ', '');
    
    // Call the scraper
    const results = await searchMobileDe(query);

    if (results.length > 0) {
      results.slice(0, 5).forEach((result) => {
        message.channel.send(`**${result.title}**\nPrice: ${result.price}\nLink: ${result.link}`);
      });
    } else {
      message.channel.send('No results found for your search.');
    }
  }
});

client.login('YOUR_DISCORD_BOT_TOKEN');
