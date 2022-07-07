import { SlashCommandBuilder } from "@discordjs/builders";
import { MessageEmbed } from "discord.js";

export const data = new SlashCommandBuilder()
    .setName("help")
    .setDescription("Renvoie la liste des commandes")
    .addStringOption(option => option
        .setName("categorie")
        .setDescription("La categorie sur laquelle vous voulez des précisions")
        .setRequired(false)
        .addChoice("Classiques", "Classiques")
        .addChoice("Trading", "Trading")
    );

export async function execute(ctx) {
    await ctx.interaction.deferReply();

    const opt_categorie = ctx.interaction.options.getString("categorie");

    let help_embed = new MessageEmbed()
        .setColor(ctx.config.getData("/main_color"))
        .setThumbnail(ctx.interaction.client.user.avatarURL())
    
    if (opt_categorie) {
        help_embed.setAuthor({ name: opt_categorie, iconURL: ctx.interaction.client.user.avatarURL(), url: ctx.config.getData("/help_link") });
        for (let cmd of ctx.db.getData(`/categories[${ctx.db.getIndex("/categories", opt_categorie, "name")}]/commands`)) {
            help_embed.addField(`\`/${cmd}\``, ctx.db.getData(`/commands[${ctx.db.getIndex("/commands", cmd, "name")}]/description`));
        }
        if (help_embed.fields.length === 0) {
            help_embed.setDescription("Aucune commande dans cette catégorie");
        }
    } else {
        help_embed.setAuthor({ name: `Aide de ${ctx.interaction.client.user.username}`, iconURL: ctx.interaction.client.user.avatarURL(), url: ctx.config.getData("/help_link") });
        for (let categorie of ctx.db.getData("/categories")) {
            help_embed.addField(categorie.name, `\`/help ${categorie.name}\``, true);
        }
    }

    await ctx.interaction.editReply({ embeds: [help_embed] });
}