import { D } from "../Util/Interfaces";
import { CommandInteraction } from "discord.js";
import { RunEvent } from "../Util/Interfaces";
import { RunCommand, RunUICommand } from "../Util/SlashHandler";
import { CreateInstance } from "../Util/CreateInstance";

export const name = "interactionCreate";
export const run: RunEvent = async (d: D, interaction: CommandInteraction) => {
	if (interaction.isCommand()) await RunCommand(CreateInstance(d, {}), interaction);

	if (interaction.isContextMenu()) await RunUICommand(CreateInstance(d, {}), interaction);
};
