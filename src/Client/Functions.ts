import { D } from "../Util/Interfaces";
import { reply } from "../Functions/reply";
import { setCD } from "../Functions/setCD";
import { findUser } from "../Functions/findUser";
import { ParseTime } from "../Functions/ParseTime";
import { getCooldown } from "../Functions/getCooldown";

export const Functions = {
	ParseTime,
	reply,
	findUser,
	setCD,
	getCooldown
};

export const reloadFunctions = (d: D) => {
	d.Util = Functions;
};
