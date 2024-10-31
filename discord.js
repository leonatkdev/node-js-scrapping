const { Client, GatewayIntentBits, REST, Routes, SlashCommandBuilder } = require("discord.js");
const { manufacturersObj, clickManufacturer } = require("./searchEncar");
require("dotenv").config();

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
});

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

client.once("ready", async () => {
  console.log("Bot is online!");

  // Fetch manufacturers and build the command dynamically
  const manufacturersList = manufacturersObj; // Wait for data
  const manufacturerChoices = manufacturersList.map((item) => ({
    name: item.englishName,
    value: item.originalKey,
  }));

  // Define the slash command with dynamic choices
  const commands = [
    new SlashCommandBuilder()
      .setName("search")
      .setDescription("Search for a car")
      .addStringOption(option =>
        option
          .setName("manufacturer")
          .setDescription("Choose a car manufacturer")
          .setRequired(true)
          .addChoices(...manufacturerChoices)
      )
      .toJSON()
  ];

  // Register commands
  try {
    await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body: commands });
    console.log("Slash commands registered.");
  } catch (error) {
    console.error("Error registering slash commands:", error);
  }
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  if (interaction.commandName === "search") {
    const manufacturer = interaction.options.getString("manufacturer");

    try {
      await clickManufacturer(manufacturer);
      await interaction.reply(`Selected manufacturer: **${manufacturer}**. Continuing search...`);
      // Further actions after selecting the manufacturer
    } catch (error) {
      console.error("Error clicking manufacturer:", error.message);
      await interaction.reply(`Could not select manufacturer: ${manufacturer}`);
    }
  }
});

client.login(process.env.TOKEN);
