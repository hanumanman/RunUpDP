const { EmbedBuilder, SlashCommandBuilder } = require('@discordjs/builders');
const cardsData = require('./assets/tarot-cards.json');
const path = require('path');
const { AttachmentBuilder } = require('discord.js');

const randomIndexGen = (array) => {
  const index = Math.floor(Math.random() * array.length);
  return array[index];
};

module.exports = {
  data: new SlashCommandBuilder()
    .setName('tarot')
    .setDescription('Draw a tarot card')
    .addStringOption((option) =>
      option
        .setName('question')
        .setDescription('Your question')
        .setRequired(false)
    ),
  async execute(interaction) {
    // Generate a random number between 1 and 78
    const cardNumber = Math.floor(Math.random() * 78) + 1;

    // Retrieve the card data from the JSON file
    const cardData = cardsData.cards[cardNumber - 1];
    const cardName = cardData.name;
    const light = randomIndexGen(cardData.meanings.light);
    const shadow = randomIndexGen(cardData.meanings.shadow);
    const keywords = cardData.keywords.join(', ');
    const cardDescription = `**Light:** 
    ${light}.
    
    **Shadow:**
    ${shadow}.
    
    **Keywords:**
    ${keywords}.`;

    // Construct the path to the card image file
    const imagePath = path.join(__dirname, 'assets', 'cards', cardData.img);

    // Send the embed with the image as an attachment
    const attachment = new AttachmentBuilder(imagePath);
    // Create an embed with the card information and image
    const embed = new EmbedBuilder()
      .setTitle(cardName)
      .setDescription(cardDescription)
      .setImage(`attachment://${cardData.img}`);
    return interaction.reply({ embeds: [embed], files: [attachment] });
  },
};
