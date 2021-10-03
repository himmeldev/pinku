import { Bot } from "./Client/Bot";
import { D } from "./Util/Interfaces";
import { configuration } from "./Private/Data";
import { MessageEmbed } from "discord.js";
import { Functions } from "./Client/Functions";

const bot = new Bot();
const client = bot;

const d: D = {
	client,
	commands: bot.cmds,
	db: bot.db,
	embed: new MessageEmbed(),
	args: [],
	f: Functions
};

export default {
	client,
	d
};

bot.start(configuration);
