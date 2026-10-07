// Pure rules. No React, no DOM. Tested by engine.test.ts.

export type Stat = 'might' | 'mind' | 'heart'

export type HeroClass = {
  id: string
  name: string
  tagline: string
  icon: string
  stats: Record<Stat, number>
}

export const HERO_CLASSES: HeroClass[] = [
  {
    id: 'builder',
    name: 'The Builder',
    tagline: 'Strong hands. Moves what others cannot.',
    icon: '🔨',
    stats: { might: 4, mind: 1, heart: 2 },
  },
  {
    id: 'scholar',
    name: 'The Scholar',
    tagline: 'Sharp mind. Reads the room and the record.',
    icon: '📖',
    stats: { might: 1, mind: 4, heart: 2 },
  },
  {
    id: 'spark',
    name: 'The Spark',
    tagline: 'Big heart. Brings everyone with them.',
    icon: '⚡',
    stats: { might: 2, mind: 1, heart: 4 },
  },
]

export const STAT_LABEL: Record<Stat, string> = { might: 'Might', mind: 'Mind', heart: 'Heart' }

export const MAX_HEARTS = 3
export const ROUNDS_PER_GAME = 6
export const DIE_SIDES = 20

export type RollOutcome = {
  roll: number
  bonus: number
  total: number
  dc: number
  success: boolean
  natural20: boolean
}

export function resolveRoll(roll: number, bonus: number, dc: number): RollOutcome {
  if (!Number.isInteger(roll) || roll < 1 || roll > DIE_SIDES) throw new Error(`roll out of range: ${roll}`)
  const total = roll + bonus
  const natural20 = roll === DIE_SIDES
  return { roll, bonus, total, dc, success: natural20 || total >= dc, natural20 }
}

export function rollDie(rng: () => number = Math.random): number {
  return 1 + Math.floor(rng() * DIE_SIDES)
}

/** Fisher-Yates shuffle, returns a new array. */
export function shuffle<T>(items: readonly T[], rng: () => number = Math.random): T[] {
  const out = items.slice()
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1))
    ;[out[i], out[j]] = [out[j], out[i]]
  }
  return out
}

/** Pick the landmarks for one game: a shuffled subset of `count`. */
export function buildRun<T extends { id: string }>(all: readonly T[], count: number, rng: () => number = Math.random): T[] {
  return shuffle(all, rng).slice(0, Math.min(count, all.length))
}

/** Pick the legends to award, one per round, no repeats within a game. */
export function buildLegendDeck<T extends { id: string }>(all: readonly T[], count: number, rng: () => number = Math.random): T[] {
  return shuffle(all, rng).slice(0, Math.min(count, all.length))
}

/** Chance to succeed, used for the on-screen odds hint. */
export function successChance(bonus: number, dc: number): number {
  let wins = 0
  for (let r = 1; r <= DIE_SIDES; r++) if (resolveRoll(r, bonus, dc).success) wins++
  return wins / DIE_SIDES
}
