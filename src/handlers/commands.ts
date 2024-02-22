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
    rest.put(Routes.applicationCommands(process.env.APPLICATION_ID), {          // this is GLOBAL commands. It can take up to an hour for them to appear in server
        body: slashCommands.map(command => command.toJSON())                    // If you want commands added right away you can do so to a server of your choosing with:
    })                                                                          // Routes.applicationGuildCommands(process.env.APPLICATION_ID, <serverId>)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .then((data : any) => {                                                 // https://discordjs.guide/creating-your-bot/command-deployment.html#guild-commands
            consola.success(`Successfully loaded ${data.length} slash command(s)`)
        }).catch(e => {
            consola.error(e) // TODO: Log errors differently here
        })
}
