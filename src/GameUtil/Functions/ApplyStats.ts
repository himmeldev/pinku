import { D } from "../../Util/Interfaces";
import { Player, Stat } from "../Interfaces";
import { lifeStat } from "../Stats";

export const ApplyStats = (d: D, Target: Player, Stats: Stat[]): Player => {
	Stats.map((stat: Stat, i: number) => {
		const st = findValue(stat);
		Target.stats[stat.name] = stat.value === "max" ? st.MaxValue : stat.value > st.MaxValue ? st.MaxValue : stat.type === "upgrade" ? (Target.stats[stat.name] + stat.value > st.MaxValue ? st.MaxValue : Target.stats[stat.name] + stat.value) : stat.value;
	});

    return Target
};

const findValue = (stat: Stat) => {
	switch (stat.name) {
		case "life":
			return lifeStat;

		default:
			return { MinimumValue: 0, MaxValue: 0, DefaultValue: 0 };
	}
};
