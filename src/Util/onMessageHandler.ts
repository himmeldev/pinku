import { Message } from "discord.js";
import { contactFunction } from "./ContactDeveloper";
import { CreateInstance } from "./CreateInstance";
import { Command, D } from "./Interfaces";

export const onMessage = async (message: Message, d: D) => {
	const commands = d.commands.filter((c: Command) => c.type === "onMessage");

	commands.map(async (command: Command) => {
		await command.run(CreateInstance(d, { args: message.content.split(/\s/g).filter((b) => b), command, guild: message.guild, message, user: message.author })).catch((err) => contactFunction(d.client, err));
	});
};
