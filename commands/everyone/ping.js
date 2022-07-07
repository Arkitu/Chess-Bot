import { SlashCommandBuilder } from '@discordjs/builders';

export const data = new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Répond pong');
export async function execute(ctx) {
    await ctx.interaction.reply(':ping_pong: Pong !');
}