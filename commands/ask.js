const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { Configuration, OpenAIApi } = require('openai');
require('dotenv').config();

// Set up the OpenAI API key
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ask')
    .setDescription(' "We have ChatGPT at home" ')
    .addStringOption((option) =>
      option
        .setName('question')
        .setDescription('Your question')
        .setRequired(true)
    ),
  async execute(interaction) {
    // Get the user's question from the command argument
    const question = interaction.options.getString('question');
    console.log(`question is ${question}`);
    await interaction.deferReply();

    try {
      // Make a request to the OpenAI API
      const response = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: `${question}? I want blatantly wrong answer only`,
        temperature: 1,
        max_tokens: 1000,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });
      if (response) {
        // Get the generated response from the OpenAI API
        const answer = `**Q:** ${question}
      **A:** ${response.data.choices[0].text.trim()}`;

        console.log(answer);

        const embed = new EmbedBuilder()
          .setTitle('ScuffedGPT')
          .setDescription(answer);

        // Send the response back to the user
        await interaction.editReply({ embeds: [embed] });
      }
    } catch (error) {
      console.error(error);
      await interaction.editReply(`${error}`);
    }
  },
};
