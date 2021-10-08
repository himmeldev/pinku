import { Guild, User } from "discord.js";
import { Command, D } from "../Util/Interfaces";
import ms from "ms";

export const setCD = async (command: Command, query: string, d: D): Promise<boolean> => {
	const { cooldown, testing } = command;
	const { client } = d;
	const { cds } = client;

	if (cooldown.time === "none") return false;

	const time = ms(cooldown.time);
	if (!cds.has(command.name)) cds.set(command.name, {});

	let t: User | Guild;

	switch (cooldown.type) {
		case "user":
			t = client.users.cache.get(query) || (await client.users.fetch(query).catch((err) => null));
			break;
		case "guild":
			t = client.guilds.cache.get(query);
			break;
	}

	if (!t) return false;

	const now = Date.now();
	const expiration = Math.floor((cds.get(command.name)[query] || 0) + Number(time));
	const CommandCooldowns = cds.get(command.name);

	if (testing) return false;

	if (now < expiration) return true;

	if (!CommandCooldowns[query] || now > expiration) CommandCooldowns[query] = now + Number(time);

	cds.set(command.name, CommandCooldowns);

	return false;
};
