import {
    Collection,
    AutocompleteInteraction,
    ChatInputCommandInteraction,
    RESTEvents,
    Events,
} from 'discord.js'

export interface SlashCommand {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    command: any,
    execute: (interaction : ChatInputCommandInteraction) => void,
    autocomplete?: (interaction: AutocompleteInteraction) => void,
    helpText?: string | 'This command doesn\'t have a help description.' // TODO: On HelpCommand make sure on empty you get default value
}
export enum EventType {
    ONCE = 'once',
    ON = 'on',
    REST_ON = 'rest_on'
}

export interface BotEvent {
    name: Events | RESTEvents | string,
    type: EventType,
    execute: (...args) => void
}

declare module 'discord.js' {
    export interface Client {
        slashCommands: Collection<string, SlashCommand>
    }
  }
  
