import { SlashCommandBuilder } from "@discordjs/builders";
import { hash } from "../../bot.js";

export const data = new SlashCommandBuilder()
    .setName("hash")
    .setDescription("Renvoie le hash de la chaine de caractères passée en paramètre")
    .addStringOption(option => option
        .setName("string")
        .setDescription("La chaine de caractères à hasher")
        .setRequired(true)
    );

export async function execute(ctx) {
    await ctx.interaction.deferReply();
    const opt_string = ctx.interaction.options.getString("string");

    var hashed = hash(opt_string);
    await ctx.interaction.editReply(hashed);
}