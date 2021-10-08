import { D } from "../Util/Interfaces";
import { reply } from "../Functions/reply";
import { setCD } from "../Functions/setCD";

export const Functions = {
	reply,
	setCD
};

export const reloadFunctions = (d: D) => {
	d.f = Functions;
};
