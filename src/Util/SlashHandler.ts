import { Command, D } from "./Interfaces";
import { CommandInteraction, ContextMenuInteraction, ButtonInteraction } from "discord.js";
import { contactFunction } from "./ContactDeveloper";

export const RunCommand = async (d: D, Interaction: CommandInteraction) => {
	const commands = d.commands.filter((c: Command) => c.type === "slash");
	const command: Command = commands.find((s: Command) => s.name === Interaction.commandName);

	if (!command) Interaction.reply({ content: `It appears to me that this interaction has been deleted from the files!`, ephemeral: true });

	await command.run(d, Interaction).catch((err) => contactFunction(d.client, err));
};

export const RunUICommand = async (d: D, Interaction: ContextMenuInteraction) => {
	const commands = d.commands.filter((c: Command) => c.type === "UIInteraction");
	const command: Command = commands.find((s: Command) => s.name === Interaction.commandName);

	if (!command) Interaction.reply({ content: `It appears to me that this interaciton has been deleted from the files!`, ephemeral: true });

	await command.run(d, Interaction).catch((err) => contactFunction(d.client, err));
};

export const RunButtonInteraction = async (d: D, Interaction: ButtonInteraction) => {
	const commands = d.commands.filter((c: Command) => c.type === "button");
	const command: Command = commands.find((s: Command) => s.name === Interaction.customId);

	if (!command) Interaction.reply({ content: `It appears to me that this interaction has been deleted from the files!`, ephemeral: true });

	await command.run(d, Interaction).catch((err) => contactFunction(d.client, err));
};
