import { Message } from "discord.js";
import { contactFunction } from "../Util/ContactDeveloper";
import { CreateInstance } from "../Util/CreateInstance";
import { Command, D, RunEvent } from "../Util/Interfaces";
import { onMessage } from "../Util/onMessageHandler";
import { findMentions } from "../Util/Regex";

export const name = "messageCreate";
export const run: RunEvent = async (d: D, message: Message) => {
	if (message.author.bot || !message.guild) return;

	const Instance = CreateInstance(d, { message });

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

	Instance.args = args
	Instance.configuration.prefix = prefix;
	Instance.user = message.author;
	Instance.guild = message.guild;

	if (findMentions(message.content, "ids")?.at(0) === d.client.user.id && args.length === 1) return d.f.reply(Instance, { content: "Hai~ I'm " + d.client.user.username + "!" });

	if (!message.content.startsWith(prefix)) return;

	const cmd = args.shift().toLowerCase();

	if (!cmd.length) return;

	const command: Command = d.commands.get(cmd) || d.commands.get(d.commands.find((c: Command) => c.aliases.includes(cmd)).name);
	Instance.command = command;

	try {
		if (command.category === "developer" && !d.client.d.owner(message.author.id)) return d.f.reply(Instance, { content: "Oops~ This command is only for my developers!" });

		const target = command.cooldown.type === "user" ? message.author.id : message.guild.id;
		const InCooldown = await d.f.setCD(command, target, Instance);

		if (InCooldown) return d.f.reply(Instance, { content: `This command is on cooldown! Please wait **${d.f.getCooldown(command, target, d)}** to use this command again.` });

		if (!command.usage && args[0] && command.category !== "developer") return;

		await command.run(Instance);
	} catch (err) {
		await contactFunction(d.client, err);
		return d.f.reply(Instance, { content: "I'm sorry! An unexpected bug has happened! The error has been already reported~" });
	}
};
