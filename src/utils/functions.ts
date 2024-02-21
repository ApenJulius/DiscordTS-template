import { DiscordAPIError, EmbedBuilder, TextChannel, Colors, Client } from 'discord.js'
import consola from 'consola'


export const logError: (error: Error, client: Client) => void = async (error: Error, client: Client) => { // Change this to *actually* be useful
    consola.error(error)

    if (error instanceof DiscordAPIError && error.message === 'Unknown Channel') {
        consola.error('Unknown channel, skipping error log')
        return
    }
    if ( error.message === 'Collector received no interactions before ending with reason: channelDelete' )
        return

    for (const guild of client.guilds.cache) {
        const channel = guild[1].channels.cache.find(c => c.name === 'console-log') as TextChannel

        if (!channel) continue
        const embed = styledEmbed(client).setColor(Colors.Red).setTitle('An error occurred with the bot').setDescription(error.message/*  + '```' + error.stack + '```' */) // I dont want to reveal system info

        await channel.send({ embeds: [embed] })
    }

}

export const styledEmbed: (client: Client) => EmbedBuilder = (client: Client) => {
    return new EmbedBuilder()
        .setAuthor({ name:'My Discord Bot', iconURL: client.user.displayAvatarURL() })
        .setFooter({ text:'My Discord Bot', iconURL: client.user.displayAvatarURL() })
        .setTimestamp(Date.now())
}
