import { SlashCommandBuilder } from 'discord.js'
import { SlashCommand } from '../types'

const command : SlashCommand = {
    command: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('\'Test bot latency!\'')
    ,
    execute: async(interaction) => {
        await interaction.reply({ content: `Pong! Latency: \`${interaction.client.ws.ping}ms\`!`, ephemeral: true })
    },
    helpText: 'Ping command'
}

export default command
