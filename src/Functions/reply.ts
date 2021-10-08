import { Message, MessageOptions } from "discord.js";
import { contactFunction } from "../Util/ContactDeveloper";
import { D } from "../Util/Interfaces";

export const reply = async (message: Message, data: MessageOptions, d: D): Promise<Message | void> => {
	const messageData = {
		content: data.content || null,
		reply: {
			messageReference: message.id
		},
		...data
	};

	return await message.channel.send(messageData).catch(async (err) => await message.channel.send({ ...data }).catch(async (err) => await contactFunction(d.client, err)));
};
