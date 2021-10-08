import { D } from "../Util/Interfaces";
import { reply } from "../Functions/reply";
import { setCD } from "../Functions/setCD";
import { findUser } from "../Functions/findUser";

export const Functions = {
	reply,
	findUser,
	setCD
};

export const reloadFunctions = (d: D) => {
	d.f = Functions;
};
