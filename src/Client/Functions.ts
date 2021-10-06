import { Guild, Message, MessageOptions, User } from "discord.js";
import ms from "ms";
import { Command, D } from "../Util/Interfaces";
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
	},
	setCD: async (command: Command, target: string, d: D): Promise<boolean> => {
		const { cooldown } = command;
		const { client } = d;
		const { cds } = client;

		if (cooldown.time === "none") return false;

		const time = ms(cooldown.time);
		if (!cds.has(command.name)) cds.set(command.name, {});

		let t: User | Guild;

		switch (cooldown.type) {
			case "user":
				t = client.users.cache.get(target) || (await client.users.fetch(target).catch((err) => null));
				break;
			case "guild":
				t = client.guilds.cache.get(target);
				break;
		}

		if (!t) return false;

		const now = Date.now();
		const expiration = Math.floor((cds.get(command.name)[target] || 0) + Number(time));
		const all = cds.get(command.name);

		if (now < expiration && !command.testing) return true;

		if (now > expiration) {
			all[target] = 0;

			cds.set(command.name, all);

			return false;
		}

		all[target] = now + Number(time);

		cds.set(command.name, all);

		return true;
	}
};

export const reloadFunctions = (d: D) => {
	d.f = Functions;
};
