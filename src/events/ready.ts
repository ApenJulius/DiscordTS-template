import consola from 'consola'
import { BotEvent, EventType } from '../types'
import { Client, Events } from 'discord.js'

const event : BotEvent = {
    name: Events.ClientReady,
    type: EventType.ONCE,
    execute: async (client : Client) => {
        consola.success(`Logged in as ${client.user.username}`)
        consola.log(`Bot has started, with ${client.users.cache.size} users, in ${client.channels.cache.size} channels of ${client.guilds.cache.size} guilds.\n ${client.guilds.cache.map(guild => ` - ${guild.name} (${guild.id})`).join('\n')}`)
    }
}

export default event
