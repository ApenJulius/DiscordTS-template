import { Client, SlashCommandBuilder, REST, Routes } from 'discord.js'
import { readdirSync } from 'fs'
import { join } from 'path'
import { SlashCommand } from '../types'
import consola from 'consola'

module.exports = (client : Client) => {
    const slashCommands : SlashCommandBuilder[] = []
    const slashCommandsDir = join(__dirname, '../commands')
 
    readdirSync(slashCommandsDir).forEach(file => {
        if (!file.endsWith('.js')) return
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const command : SlashCommand = require(`${slashCommandsDir}/${file}`).default
        slashCommands.push(command.command)
        client.slashCommands.set(command.command.name, command)
        consola.success(`Successfully registered command: ${command.command.name}`)
    })
    const rest = new REST({ version: '10' }).setToken(process.env.BOT_TOKEN)
    rest.put(Routes.applicationCommands(process.env.APPLICATION_ID), {
        body: slashCommands.map(command => command.toJSON())
    })
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .then((data : any) => {
            consola.success(`Successfully loaded ${data.length} slash command(s)`)
        }).catch(e => {
            consola.error(e) // TODO: Log errors differently here
        })
}
