import { User } from "discord.js";

export interface Player {
	user: User;
	hp: {
		max: number;
		current: number;
	};
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
	Cooldown: string;
    /**
     * Cooldown format example: "12s"
     */
    Buffs?: Effect[];
    Debuffs?: Effect[];
}

export interface Effect {
    Type: "buff" | "debuff";
    EffectType: "player" | "party";
    Description: string;
    Stats: Stat[];
}

export interface Stat {
    name: "defense" | "life" | "TestingGodMode";
    value: number | "max";
    /**
     * Example value: +5 | -20 | 1
     * Value will be used to 'set' the value within the player data.
     * Practical Explanation in "Stats Explanation."
     */
}