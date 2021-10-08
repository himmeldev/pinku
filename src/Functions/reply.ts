import { Message, MessageOptions } from "discord.js";
import { contactFunction } from "../Util/ContactDeveloper";
import { D } from "../Util/Interfaces";

export const reply = async (d: D, data: MessageOptions): Promise<Message | void> => {
	const { message } = d;
	const messageData = {
		content: data.content || null,
		reply: {
			messageReference: message.id
		},
		...data
	};

	return await message.channel.send(messageData).catch(async (err) => await message.channel.send({ ...data }).catch(async (err) => await contactFunction(d.client, err)));
};
