import { D, RunEvent } from "../Util/Interfaces";

export const name: string = "ready";
export const run: RunEvent = async (d: D) => {
	const { client } = d;

	client.owner = client.users.cache.get(client.data.owner()[0]) || (await client.users.fetch(client.data.owner()[0]));

	console.log("Ready on client " + client.user.tag);
};
