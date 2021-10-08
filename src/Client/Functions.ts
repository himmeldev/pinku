import { D } from "../Util/Interfaces";
import { reply } from "../Functions/reply";
import { setCD } from "../Functions/setCD";
import { findUser } from "../Functions/findUser";
import { ParseTime } from "../Functions/ParseTime";

export const Functions = {
	ParseTime,
	reply,
	findUser,
	setCD
};

export const reloadFunctions = (d: D) => {
	d.f = Functions;
};
