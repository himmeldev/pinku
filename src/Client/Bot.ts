import { Client, Collection, Intents, MessageEmbed, MessageEmbedOptions, User } from "discord.js";
import glob from "glob";
import * as db from "quick.db";
import { promisify } from "util";
import { Command } from "../Util/Interfaces";

const exampleTable = new db.table("ExampleTable");

const pGlob = promisify(glob);

class Bot extends Client {
	public cmds: Collection<string, Command> = new Collection();
	public aliases: Collection<string, string> = new Collection();
	public db: typeof db = db;
	public cds: typeof exampleTable = new db.table("cooldowns");

	public owner: User; // Defined in 'ready.ts' event.

	constructor() {
		super({
			partials: ["GUILD_MEMBER", "MESSAGE", "USER", "CHANNEL"],
			intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
		});
	}

	public d = {
		color: (query?: string): string => {
			if (!query) return "292841";

			let result: string;
			switch (query) {
				case "green":
					result = "379558";
					break;
				case "blue":
					result = "292841";
					break;
				default:
					result = "292841";
					break;
			}

			return result;
		},
		embed: (data?: MessageEmbedOptions): MessageEmbed => {
			return new MessageEmbed({ ...data, description: data.description || "Default description." });
		},
		owner: (id?: string): string[] | boolean => {
			const d = ["278342221202194434"];
			if (!id) return d;

			return d.includes(id);
		}
	};

	public async start(config: { token: string; [key: string]: any }) {
		const commands = await pGlob(`${__dirname}/../commands/**/*{.ts,.js}`);

		commands.map(async (file) => {
			let cmd = await import(file);
			if (cmd.default?.name) cmd = cmd.default;
			if (cmd.data?.name) cmd = cmd.data;

			if (!cmd.name) return console.error(`Error! Missing name to ${file}`);
			if (this.cmds.get(cmd.name)) return console.error(`Error! Found duplicated command: ${cmd.name} (${file})`);

			this.cmds.set(cmd.name, cmd);

			if (cmd.name && cmd.aliases) {
				typeof cmd.aliases === "string" ? (this.aliases.get(cmd.aliases) ? null : this.aliases.set(cmd.aliases, cmd.name)) : null;

				if (Array.isArray(cmd.aliases)) {
					cmd.aliases.map((aliase: string) => {
						if (this.aliases.get(aliase)) return console.error(`Error! Found duplicated aliase ${aliase} (${cmd.name})`);

						this.aliases.set(aliase, cmd.name);
					});
				}
			}
		});

		this.login(config.token);
	}
}

export { Bot };
