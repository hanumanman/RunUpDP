const { EmbedBuilder, SlashCommandBuilder } = require('@discordjs/builders');
const { AttachmentBuilder } = require('discord.js');
const Fuse = require('fuse.js');

const characterArray = [
  `aba`,
  `anji`,
  `axl`,
  `baiken`,
  `bridget`,
  `chipp`,
  `dizzy`,
  `eddie`,
  `faust`,
  `jam`,
  `johny`,
  `ky`,
  `may`,
  `millia`,
  `ordersol`,
  `potemkin`,
  `roboky`,
  `slayer`,
  `sol`,
  `testament`,
  `venom`,
  `zappa`,
];

const convertFirstLetterToUpperCase = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const characterList = characterArray
  .map((character) => convertFirstLetterToUpperCase(character))
  .join(', ');
const options = { minMatchCharLength: 2, findAllMatches: true };
const fuse = new Fuse(characterArray, options);

module.exports = {
  data: new SlashCommandBuilder()
    .setName('sidewinder')
    .setDescription(`Display Sidewinder's clean hit data`)

    .addStringOption((option) =>
      option
        .setName('character')
        .setDescription('whos gonna be sidewinded')
        .setRequired(true)
    ),
  async execute(interaction) {
    await interaction.deferReply();
    const character = interaction.options.getString('character');
    const characterLowerCase = character.toLowerCase();

    try {
      if (characterLowerCase === 'help') {
        await interaction.editReply(`${characterList}`);
      } else {
        const attachment = new AttachmentBuilder(
          `commands/assets/cl_sw/${character}.png`
        );
        // Create an embed with the card information and image
        const embed = new EmbedBuilder()
          .setTitle(convertFirstLetterToUpperCase(character))
          .setDescription(
            `Puch HERE for [Clean Hit](https://www.youtube.com/watch?v=5lyl-gavEn0)`
          )
          .setImage(`attachment://${character}.png`)
          .setFooter({
            text: `Tips: /sidewinder:help to get all characters!`,
          });

        await interaction.editReply({
          embeds: [embed],
          files: [attachment],
        });
      }
    } catch (error) {
      //Fuzzy search character list, return closest results. Or ur mum gay.
      const searchResult = fuse.search(`${character}`).length
        ? fuse
            .search(`${character}`)
            .map((result) => convertFirstLetterToUpperCase(result.item))
            .join(' or ')
        : `ur mum gay`;

      await interaction.editReply(
        `You looked up "${character}". Did you mean ${searchResult}?`
      );
    }
  },
};
