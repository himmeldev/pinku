import { D } from "../../Util/Interfaces";
import { Effect, Player } from "../Interfaces";

export const ApplyBuffs = (d: D, Target: Player, BuffList: Effect[]): Player => {
	for (let i = 0; i < BuffList.length; i++) {
		const CurrentEffect: Effect = BuffList[i];

		const _i = Target[CurrentEffect.Type + "s"].findIndex((f: Effect, i: number) => f.Name === CurrentEffect.Name);
		if (_i < 0) {
			Target[CurrentEffect.Type + "s"].push(CurrentEffect);
			continue;
		}

		Target[CurrentEffect.Type + "s"][_i] = CurrentEffect;
	}

	// TODO: Finish the Stats improvements *included in the CurrentEffect.Stats property* function.
	// // This is going to be hell.

	return Target;
};
