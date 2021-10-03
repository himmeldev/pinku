import { D, RunEvent } from "../Util/Interfaces";

export const name: string = "ready";
export const run: RunEvent = async (d: D) => {
	d.client.owner = d.client.users.cache.get(d.client.d.owner()[0]) || (await d.client.users.fetch(d.client.d.owner()[0]));

	console.log("Ready on client " + d.client.user.tag);
};
