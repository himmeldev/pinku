import { User } from "discord.js";

export interface Player {
	user: User;
	hp: {
		max: number;
		current: number;
		special: {
			value: number;
			max: number;
		};
	};
	stats: {
		life: number;
		strength: number;
		speed: number;
		TestingGodMode: 0 | 1;
	};
	buffs: Effect[];
	debuffs: Effect[];
}

export interface HealingItem {
	HealAmount: number;
	/**
	 * HealAmount property can be negative, this will allow the possibility of items like:
	 * "Consumes 20 life and gives buff <SomeRandomBuff> which gives +20 defense."
	 */
	HealType: "life" | "special";
	/**
	 * Type "life": Default current/MaxLife.
	 * Type "special": SpecialBuff + Default current/MaxLife.
	 */
	Cooldown: string | "none";
	/**
	 * Cooldown format example: "12s"
	 */
	Buffs?: Effect[];
	Debuffs?: Effect[];
}

export interface Effect {
	Name: string;
	Type: "buff" | "debuff";
	EffectType: "player" | "party";
	Description: string;
	Stats: Stat[];
	Duration: string;
}

export interface Stat {
	name: "life" | "strength" | "speed";
	value: number | "max";
	/**
	 * Example value: +5 | -20 | 1
	 * Value will be used to 'set' the value within the player data.
	 * Practical Explanation in "Stats Explanation."
	 */
}
