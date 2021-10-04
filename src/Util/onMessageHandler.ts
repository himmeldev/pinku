import { Message } from "discord.js";
import { CreateInstance } from "./CreateInstance";
import { Command, D } from "./Interfaces";

export const alwaysExecute = async (message: Message, d: D) => {
	const commands = d.commands.filter((c: Command) => c.type === "onMessage");

	commands.map((command: Command) => {
		command.run(CreateInstance(d, { args: message.content.split(/\s+/g).filter((b) => b), command, guild: message.guild.id, message, user: message.author.id }));
	});
};
