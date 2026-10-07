import assert from 'node:assert/strict'
import { resolveRoll, rollDie, shuffle, buildRun, buildLegendDeck, successChance, HERO_CLASSES, DIE_SIDES } from './engine.ts'
import { LANDMARKS } from '../data/landmarks.ts'
import { LEGENDS } from '../data/legends.ts'

let passed = 0
function test(name: string, fn: () => void) {
  fn()
  passed++
  console.log('ok  ' + name)
}

test('a roll plus bonus that meets the target succeeds', () => {
  const r = resolveRoll(7, 4, 11)
  assert.equal(r.total, 11)
  assert.equal(r.success, true)
})

test('a roll plus bonus under the target fails', () => {
  assert.equal(resolveRoll(6, 4, 11).success, false)
})

test('a natural 20 always succeeds', () => {
  assert.equal(resolveRoll(20, 0, 99).success, true)
  assert.equal(resolveRoll(20, 0, 99).natural20, true)
})

test('rolls outside 1..20 are rejected', () => {
  assert.throws(() => resolveRoll(0, 0, 10))
  assert.throws(() => resolveRoll(21, 0, 10))
})

test('rollDie stays inside 1..20 across the rng range', () => {
  assert.equal(rollDie(() => 0), 1)
  assert.equal(rollDie(() => 0.999999), DIE_SIDES)
  for (let i = 0; i < 1000; i++) {
    const v = rollDie()
    assert.ok(v >= 1 && v <= DIE_SIDES)
  }
})

test('shuffle keeps every item exactly once and does not mutate', () => {
  const src = [1, 2, 3, 4, 5]
  const out = shuffle(src, () => 0.42)
  assert.deepEqual(src, [1, 2, 3, 4, 5])
  assert.deepEqual(out.slice().sort(), [1, 2, 3, 4, 5])
})

test('buildRun returns the requested count of unique landmarks', () => {
  const run = buildRun(LANDMARKS, 6)
  assert.equal(run.length, 6)
  assert.equal(new Set(run.map((l) => l.id)).size, 6)
})

test('buildLegendDeck returns unique legends', () => {
  const deck = buildLegendDeck(LEGENDS, 6)
  assert.equal(deck.length, 6)
  assert.equal(new Set(deck.map((l) => l.id)).size, 6)
})

test('every hero class totals 7 stat points so no class is strictly better', () => {
  for (const h of HERO_CLASSES) {
    const total = h.stats.might + h.stats.mind + h.stats.heart
    assert.equal(total, 7, h.name)
  }
})

test('every landmark has 3 choices covering all three stats, with targets 10..13', () => {
  for (const l of LANDMARKS) {
    assert.equal(l.choices.length, 3, l.id)
    const stats = new Set(l.choices.map((c) => c.stat))
    assert.equal(stats.size, 3, l.id + ' must use might, mind and heart once each')
    for (const c of l.choices) assert.ok(c.dc >= 10 && c.dc <= 13, `${l.id} ${c.stat} dc ${c.dc}`)
  }
})

test('the best-matched hero wins at least 60% of the time on every choice', () => {
  for (const l of LANDMARKS) {
    for (const c of l.choices) {
      const best = Math.max(...HERO_CLASSES.map((h) => h.stats[c.stat]))
      const p = successChance(best, c.dc)
      assert.ok(p >= 0.6, `${l.id} ${c.stat}: ${Math.round(p * 100)}%`)
    }
  }
})

test('ids are unique across landmarks and legends', () => {
  assert.equal(new Set(LANDMARKS.map((l) => l.id)).size, LANDMARKS.length)
  assert.equal(new Set(LEGENDS.map((l) => l.id)).size, LEGENDS.length)
})

test('every legend has a quote and a source', () => {
  for (const l of LEGENDS) {
    assert.ok(l.quote.length > 10, l.id)
    assert.ok(l.source.length > 5, l.id + ' needs a source')
  }
})

console.log(`\n${passed} tests passed`)
