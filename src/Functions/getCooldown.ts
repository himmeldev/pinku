import { Command, D } from "../Util/Interfaces";
import { ParseTime } from "./ParseTime";

export const getCooldown = (command: Command, query: string, d: D) => {
	const cooldowns = d.client.cds;
	const all = cooldowns.get(command.name);

	if (!all) return "No cooldown!";

	const cd = all[query] ? ParseTime(all[query]) : "No cooldown!";
};
