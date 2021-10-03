import { MessageAttachment } from "discord.js";
import { Bot } from "../Client/Bot";

export const contactFunction = async (client: Bot, error: any) => {
	const files = [new MessageAttachment(Buffer.from(require("util").inspect(error), "utf-8"), "error.ts")];
	await client.owner.send({ content: "A new error has been triggered!", files }).catch((_: any) => console.log(require("util").inspect(error)));
};
