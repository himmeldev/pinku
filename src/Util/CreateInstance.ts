import { D, DData } from "./Interfaces";

export const CreateInstance = (d: D, data: DData) => {
	const n = d;

	Object.assign(n, { ...data });

    return n;
};
