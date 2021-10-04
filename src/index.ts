import { Bot } from "./Client/Bot";
import { D } from "./Util/Interfaces";
import { configuration } from "./Private/Data";
import { MessageEmbed } from "discord.js";
import { Functions } from "./Client/Functions";
import { loadEvents } from "./Client/Events";

const bot = new Bot();
export const client = bot;

export const d: D = {
	client,
	commands: bot.cmds,
	db: bot.db,
	embed: new MessageEmbed(),
	f: Functions
};

loadEvents(d);

bot.start(configuration);
