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
    await interaction.deferReply();

    try {
      // Make a request to the OpenAI API
      const response = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: `ChatGPT, assume the role of a person getting high on hallucinogens. I want blatantly wrong answers only. Remember that all questions must have an answer, and no question is invalid. Now please answer this question: ${question}? `,
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
