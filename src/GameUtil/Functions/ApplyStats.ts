import { Player, Stat } from "../Interfaces";
import * as AllStats from "../Stats";

export const ApplyStats = (Target: Player, Stats: Stat[]): Player => {
	Stats.map((stat: Stat) => {
		const st = AllStats[stat.name];
		Target.stats[stat.name] = stat.value === "max" ? st.MaxValue : stat.value > st.MaxValue ? st.MaxValue : stat.type === "upgrade" ? (Target.stats[stat.name] + stat.value > st.MaxValue ? st.MaxValue : Target.stats[stat.name] + stat.value) : stat.value;
	});

	return Target;
};
