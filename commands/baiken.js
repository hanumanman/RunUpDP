const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder().setName('baiken').setDescription('baiken'),
  async execute(interaction) {
    await interaction.reply('bad');
  },
};
