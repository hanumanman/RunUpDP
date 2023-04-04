const { Events } = require('discord.js');

module.exports = {
  name: Events.ClientReady,
  once: true,
  execute(client) {
    console.log(
      `Hello! Logged in as ${client.user.username} on private test server`
    );
  },
};
