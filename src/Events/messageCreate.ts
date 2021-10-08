import { Message } from "discord.js";
import { contactFunction } from "../Util/ContactDeveloper";
import { CreateInstance } from "../Util/CreateInstance";
import { Command, D, RunEvent } from "../Util/Interfaces";
import { onMessage } from "../Util/onMessageHandler";
import { idRegex } from "../Util/Regex";

export const name = "messageCreate";
export const run: RunEvent = async (d: D, message: Message) => {
	if (message.author.bot || !message.guild) return;

	const GuildsConfig = new d.db.table("GuildsData");
	const GuildConfig = GuildsConfig.get(message.guild.id) || GuildsConfig.set(message.guild.id, {});
	const prefix = GuildConfig["prefix"] || d.configuration.prefix;
	const args =
		message.content
			?.slice(prefix.length)
			?.trim()
			?.split(/\s/g)
			.filter((d) => d) || [];

	onMessage(message, d);

	if (message.content.match(idRegex)?.at(0) === d.client.user.id && args.length === 1) return d.f.reply(CreateInstance(d, { message }), { content: "Hai~ I'm " + d.client.user.username + "!" });

	if (!message.content.startsWith(prefix)) return;

	const cmd = args.shift().toLowerCase();

	if (!cmd.length) return;

	const command: Command = d.commands.get(cmd) || d.commands.get(d.commands.find((c: Command) => c.aliases.includes(cmd)).name);

	try {
		if (command.category === "developer" && !d.client.d.owner(message.author.id)) return d.f.reply(CreateInstance(d, { message }), { content: "Oops~ This command is only for my developers!" });

		const target = command.cooldown.type === "user" ? message.author.id : message.guild.id;
		const InCooldown = await d.f.setCD(command, target, d);

		if (InCooldown) return d.f.reply(CreateInstance(d, { message }), { content: `This command is on cooldown! Please wait **${d.f.getCooldown(command, target, d)}** to use this command again.` });

		if (!command.usage && args[0] && command.category !== "developer") return;

		await command.run(CreateInstance(d, { args, command, guild: message.guild, message, user: message.author }));
	} catch (err) {
		await contactFunction(d.client, err);
		return d.f.reply(CreateInstance(d, { message }), { content: "I'm sorry! An unexpected bug has happened! The error has been already reported~" });
	}
};
