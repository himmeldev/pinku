import { Message, MessageOptions } from "discord.js";
import { D } from "../Util/Interfaces";
import { contactFunction } from "../Util/ContactDeveloper";
import { Bot } from "./Bot";

export const Functions = {
	reply: async (message: Message, data: MessageOptions, client: Bot): Promise<void | Message> => {
		const d = {
			content: data.content || null,
			reply: {
				messageReference: message.id
			},
			...data
		};

		return await message.channel.send(d).catch(async (err) => await message.channel.send({ ...data }).catch(async (err) => await contactFunction(client, err)));
	}
};

export const reloadFunctions = (d: D) => {
	d.f = Functions;
};
