import glob from "glob";
import { promisify } from "util";
import { D } from "../Util/Interfaces";

const pGlob = promisify(glob);

export const loadEvents = async (d: D) => {
	const events = await pGlob(`${__dirname}/../events/**/*{.ts,.js}`);

	await Promise.all(
		events.map(async (file) => {
			let event = await import(file);
			if (event.default) event = event.default;

			if (!event.name) return console.error(`Error! Missing name to ${file}`);

			d.client.on(event.name, event.run.bind(null, d));
		})
	);
};
