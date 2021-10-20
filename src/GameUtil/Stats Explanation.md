# Stats Explanation.

To make a stat object you'll first have to make an object like the one in `./Interfaces.ts`

```ts
interface Stat {
	name: "name of the stats, these will be available in the Stats.ts file.";
	value: number | "max";
    type: "upgrade" | "buff"
}
```

If the value is set to `max`, the function (`ApplyStats(d: D, Target: Player, stat: Stat)`) would automatically set the `PlayerStatValue` ot its `StatMaxValue` available in the `Stats.ts` file.

Some examples would be:

```ts
const MaxStat: Stat = {
    name: "life",
    value: "max",
    type: "upgrade"
}

const TemporalReducedStat: Stat = {
    name: "life",
    value: -50,
    type: "buff"
}

const LifeUpgrade: Stat = {
    name: "life",
    value: +20,
    type: "upgrade"
}
```

## Note: If the stat value is higher than the MaxValue previously configurated, it will just be set to the max value instead, example:

```ts
const StupidStat: Stat = {
    name: "life",
    value: Infinity,
    type: "buff"
}

/**
 * Would end in the PlayerLifeStat being set to '500', which is the max.
 **/
```