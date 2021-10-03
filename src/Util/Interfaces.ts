import { Collection, GuildMember, Message, MessageEmbed, User } from "discord.js";
import { Bot } from "../Client/Bot";
import db from "quick.db";
import { Functions } from "../Client/Functions";

export interface Command {
	name: string;
	aliases?: string | string[];
	description?: string | Description;
	run: RunCommand;
}

export interface Event {
	name: string;
	run: RunEvent;
}

export interface Description {
	english: string;
	spanish?: string;
	portuguese?: string;
}

export interface RunCommand {
	(d: D): any;
}

export interface RunEvent {
	(d: D, ...args: any[]): any;
}

export interface D {
	client: Bot;
	message?: string | Message;
	command?: Command;
	db: typeof db | any;
	guild?: string | { id: string; data: any };
	user?: string | User | GuildMember;
	embed: MessageEmbed;
	args?: string[];
	interaction?: { request: object[] };
	f: typeof Functions;
	commands: Collection<string, any>;
}
