const {
  SlashCommandBuilder,
  EmbedBuilder,
  AttachmentBuilder,
} = require('discord.js');
const path = require('path');
module.exports = {
  data: new SlashCommandBuilder().setName('runup').setDescription('for what'),
  async execute(interaction) {
    // Construct the path to the card image file
    const imagePath = path.join(__dirname, 'assets', 'DP.gif');

    // Send the embed with the image as an attachment
    const attachment = new AttachmentBuilder(imagePath);

    const embed = new EmbedBuilder()
      .setTitle('DP!')
      .setImage(`attachment://DP.gif`);
    await interaction.reply({ embeds: [embed], files: [attachment] });
  },
};
