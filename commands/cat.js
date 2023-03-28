const { default: axios } = require('axios');
const {
  SlashCommandBuilder,

  EmbedBuilder,
} = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder().setName('cat').setDescription('Random cat'),
  async execute(interaction) {
    await interaction.deferReply();

    try {
      const res = await axios.get('https://aws.random.cat/meow');
      if (res) {
        const fileLink = await res.data.file;

        const embed = new EmbedBuilder()
          .setTitle('Random cat')
          .setImage(fileLink)
          .setDescription('Look at him');

        await interaction.editReply({ embeds: [embed] });
      }
    } catch (error) {
      await interaction.editReply(error);
    }
  },
};
