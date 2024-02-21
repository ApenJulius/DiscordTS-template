import consola from 'consola'
import { config } from 'dotenv'
import { join } from 'path'
import { logError } from './utils/functions'
import { SlashCommand } from './types'
import { Client, Collection, Partials, GatewayIntentBits } from 'discord.js'
import { readdirSync } from 'fs' 
const { Guilds, GuildMembers, GuildMessages, GuildMessageReactions, MessageContent } = GatewayIntentBits

config({
    path: '../.env',
})

const client: Client = new Client({
    presence: { activities: [{ name: 'with discord.js v14' }], status: 'online' },
    partials: [Partials.Message, Partials.Reaction],
    intents: [Guilds, GuildMembers, GuildMessages, GuildMessageReactions, MessageContent],
})
client.slashCommands = new Collection<string, SlashCommand>()
const handlersDir = join(__dirname, './handlers')
readdirSync(handlersDir).forEach(handler => {
    if (!handler.endsWith('.js')) return
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    require(`${handlersDir}/${handler}`)(client)
})

client.login(process.env.BOT_TOKEN).then(async () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    process.on('unhandledRejection', (error: Error, _: Promise<unknown>) => logError(error, client))
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    process.on('uncaughtException', (error: Error, _: string) => logError(error, client))
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    process.on('warning', (error: Error, _: string) => logError(error, client))
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    process.on('message', (error: Error, _: string) => logError(error, client))

}).catch((err) => consola.log(err))

