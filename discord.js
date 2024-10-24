const { Client, GatewayIntentBits } = require("discord.js");
require("dotenv").config();
const  searchEncar  = require("./searchEncar"); // Import the scraping function

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent, // Needed to read message content
  ],
});

client.once("ready", () => {
  console.log("Bot is online!");
});

client.on("messageCreate", async (message) => {
  // Prevent bot from responding to its own messages or other bots
  if (message.author.bot) return;

  if (message.content.startsWith("!search")) {
    const query = message.content.replace("!search ", "").trim();

    if (!query) {
      message.channel.send("Please provide a search query.");
      return;
    }

    // Call the scraper
    try {
      const results = await searchEncar(query);

      console.log('results', results)

      if (results && results.length > 0) {
        results.slice(0, 5).forEach((result) => {
          message.channel.send(
            `**${result.title}**\nPrice: ${result.price}\nLink: ${result.link}`
          );
        });
      } else {
        message.channel.send("No results found for your search.");
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
      message.channel.send("There was an error processing your search.");
    }
  }
});

client.login(process.env.TOKEN);
