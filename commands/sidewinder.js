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

const characterList = characterArray.join(', ');
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
          .setTitle(character.charAt(0).toUpperCase() + character.slice(1))
          .setDescription(
            `Puch HERE for [Clean Hit](https://www.youtube.com/watch?v=5lyl-gavEn0)`
          )
          .setImage(`attachment://${character}.png`)
          .setFooter({
            text: `Tips: /sidewinder:help to get all characters!`,
          });
        // .addField(
        //   '[Sidewinder Guide](https://www.youtube.com/watch?v=5lyl-gavEn0)'
        // );
        await interaction.editReply({
          embeds: [embed],
          files: [attachment],
        });
      }
    } catch (error) {
      const searchResult = fuse
        .search(`${character}`)
        .map(
          (result) => result.item.charAt(0).toUpperCase() + result.item.slice(1)
        )
        .join(' or ');

      await interaction.editReply(
        `You looked up ${character}. Do you mean ${searchResult}?`
      );
    }
  },
};
