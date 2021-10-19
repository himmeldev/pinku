import { Collection, Message, MessageEmbed, User, CommandInteraction, ContextMenuInteraction, ButtonInteraction, SelectMenuInteraction, Guild } from "discord.js";
import { Bot } from "../Client/Bot";
import * as db from "quick.db";
import { Functions } from "../Client/Functions";

export interface Command {
	name: string;
	type: "slash" | "UIInteraction" | "button" | "basic" | "onMessage";
	cooldown: {
		type: "user" | "guild";
		time: "none" | string;
	};
	testing?: boolean;
	aliases?: string | string[];
	description?: string | Description;
	category: "general" | "developer";
	usage: string;
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
	(d: D, Interaction?: CommandInteraction | ContextMenuInteraction | ButtonInteraction | SelectMenuInteraction): any;
}

export interface RunEvent {
	(d: D, ...args: any[]): any;
}

export interface D {
	client: Bot;
	message?: Message;
	command?: Command;
	db: typeof db | any;
	guild?: Guild;
	user?: User;
	embed: MessageEmbed;
	args?: string[];
	interaction?: { request: object[] };
	Util: typeof Functions;
	commands: Collection<string, Command>;
	configuration: {
		prefix: string;
	};
}

export interface DData {
	message?: Message;
	command?: Command;
	guild?: Guild;
	user?: User;
	args?: string[];
}
