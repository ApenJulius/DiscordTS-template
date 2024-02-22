import { CommandInteraction, Events, Interaction } from 'discord.js'
import { BotEvent, EventType } from '../types'

const event : BotEvent = {
    name: Events.InteractionCreate,
    type: EventType.ON,
    execute: async (interaction : Interaction) => { // Triggers on baseInteraction
        if (interaction.isCommand()) {
            await executeCommand(interaction) // Perform commands
        }
    }
}

export default event


async function executeCommand(interaction : CommandInteraction) {
    const command = interaction.client.slashCommands.get(interaction.commandName)
    if (command) {
        try {
            // TODO: Actually find the correct typing despite below actually working
            // eslint-disable-next-line
            // @ts-ignore
            await command.execute(interaction)
        } catch (error) {
            console.error(error)
            await interaction.reply({ content: `${error}`, ephemeral: true }).catch(err => {
                interaction.followUp({ content: `${err}`, ephemeral: true })
            }) // If fails just sends it right on back
        }
    }
}