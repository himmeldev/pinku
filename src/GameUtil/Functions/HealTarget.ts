import { D } from "../../Util/Interfaces";
import { HealingItem, Player, Effect } from "../Interfaces";
import { ApplyBuffs } from "./ApplyBuffs";

export const HealTarget = (d: D, player: Player, item: HealingItem): Player => {
	let { Buffs = [], Debuffs = [], HealAmount, Cooldown, HealType } = item;

	if (Buffs[0] || Debuffs[0]) {
		const BuffList = [Buffs, Debuffs];

		BuffList.map((List: Effect[]) => player = ApplyBuffs(d, player, List));
	}

	switch (HealType) {
		case "life":
			player.hp.current += HealAmount;
			break;
		case "special":
			const r = HealAmount - (player.hp.special.max - player.hp.special.value);

			if (r < 0) {
				player.hp.special.value += HealAmount;
				if (player.hp.special.value > player.hp.special.max) player.hp.special.value = player.hp.special.max;
				break;
			}

			player.hp.special.value = player.hp.special.max;
			player.hp.current += r;

			break;
	}

	// TODO: Cooldown implementation.

	if (player.hp.current > player.hp.max) player.hp.current = player.hp.max;

	return player;
};
