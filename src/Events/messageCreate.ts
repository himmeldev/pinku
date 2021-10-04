import { Message } from "discord.js";
import { CreateInstance } from "../Util/CreateInstance";
import { D, RunEvent } from "../Util/Interfaces";
import { onMessage } from "../Util/onMessageHandler";

export const name = "messageCreate";
export const run: RunEvent = async (d: D, message: Message) => {
	if (message.author.bot || !message.guild) return;

	// TODO: Finish the event

	onMessage(message, d);
};
