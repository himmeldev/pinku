import { GuildMember, Message, User } from "discord.js";
import { D } from "../Util/Interfaces";
import { findMentions } from "../Util/Regex";

export const findUser = async (d: D, query: string, message: Message, returnAuthor = true) => {
	const { client } = d;

	if (!query) return message.author;

	if (findMentions(query, "ids")[0]) return client.users.cache.get(findMentions(query, "ids")[0]) || (await client.users.fetch(findMentions(query, "ids")[0]).catch((err) => null));

	query = query?.trim()?.toLowerCase();

	const MemberQuery = message.guild.members.cache.filter((m: GuildMember) => c(m.displayName) === query || c(m.displayName).includes(query)).first()?.user;
	const GlobalQuery = client.users.cache.filter((u: User) => c(u.username) === query || c(u.username).includes(query)).first();

	return MemberQuery || GlobalQuery || returnAuthor ? message.author : null;
};

const c = (t: string) => t.trim().toLowerCase();
