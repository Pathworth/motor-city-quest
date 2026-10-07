import { useEffect, useReducer, useCallback } from 'react'
import { AnimatePresence } from 'framer-motion'
import { LANDMARKS, type Landmark } from './data/landmarks.ts'
import { LEGENDS, type Legend } from './data/legends.ts'
import {
  HERO_CLASSES,
  MAX_HEARTS,
  ROUNDS_PER_GAME,
  buildLegendDeck,
  buildRun,
  resolveRoll,
  rollDie,
  type HeroClass,
  type RollOutcome,
} from './engine/engine.ts'
import { Title } from './screens/Title.tsx'
import { HeroPick } from './screens/HeroPick.tsx'
import { Encounter } from './screens/Encounter.tsx'
import { Result } from './screens/Result.tsx'
import { Ending } from './screens/Ending.tsx'
import { Skyline } from './ui/Skyline.tsx'

export type Phase = 'title' | 'hero' | 'encounter' | 'rolling' | 'result' | 'ending'

export type GameState = {
  phase: Phase
  hero: HeroClass | null
  run: Landmark[]
  deck: Legend[]
  round: number
  hearts: number
  tried: number[]
  choice: number | null
  outcome: RollOutcome | null
  collected: Legend[]
  rescued: boolean
  forceWin: boolean
}

type Action =
  | { type: 'START' }
  | { type: 'PICK_HERO'; hero: HeroClass }
  | { type: 'CHOOSE'; index: number }
  | { type: 'ROLL_DONE'; roll: number }
  | { type: 'CONTINUE' }
  | { type: 'TOGGLE_FORCE' }
  | { type: 'RESTART' }

const initial: GameState = {
  phase: 'title',
  hero: null,
  run: [],
  deck: [],
  round: 0,
  hearts: MAX_HEARTS,
  tried: [],
  choice: null,
  outcome: null,
  collected: [],
  rescued: false,
  forceWin: false,
}

function reducer(s: GameState, a: Action): GameState {
  switch (a.type) {
    case 'START':
      return { ...initial, forceWin: s.forceWin, phase: 'hero' }
    case 'PICK_HERO':
      return {
        ...s,
        hero: a.hero,
        run: buildRun(LANDMARKS, ROUNDS_PER_GAME),
        deck: buildLegendDeck(LEGENDS, ROUNDS_PER_GAME),
        round: 0,
        hearts: MAX_HEARTS,
        tried: [],
        collected: [],
        phase: 'encounter',
      }
    case 'CHOOSE':
      if (s.phase !== 'encounter' || s.tried.includes(a.index)) return s
      return { ...s, choice: a.index, outcome: null, phase: 'rolling' }
    case 'ROLL_DONE': {
      if (s.phase !== 'rolling' || s.choice === null || !s.hero) return s
      const landmark = s.run[s.round]
      const c = landmark.choices[s.choice]
      const outcome = resolveRoll(a.roll, s.hero.stats[c.stat], c.dc)
      if (outcome.success) {
        const legend = s.deck[s.round]
        return { ...s, outcome, collected: [...s.collected, legend], phase: 'result', rescued: false }
      }
      const hearts = s.hearts - 1
      if (hearts <= 0) {
        return { ...s, outcome, hearts: MAX_HEARTS, rescued: true, phase: 'result' }
      }
      return { ...s, outcome, hearts, tried: [...s.tried, s.choice], rescued: false, phase: 'result' }
    }
    case 'CONTINUE': {
      if (s.phase !== 'result' || !s.outcome) return s
      const advance = s.outcome.success || s.rescued
      if (!advance) return { ...s, phase: 'encounter', choice: null, outcome: null }
      const next = s.round + 1
      if (next >= s.run.length) return { ...s, phase: 'ending', choice: null, outcome: null }
      return { ...s, round: next, tried: [], choice: null, outcome: null, rescued: false, phase: 'encounter' }
    }
    case 'TOGGLE_FORCE':
      return { ...s, forceWin: !s.forceWin }
    case 'RESTART':
      return { ...initial, forceWin: s.forceWin }
    default:
      return s
  }
}

export default function App() {
  const [s, dispatch] = useReducer(reducer, initial)

  const rollNow = useCallback(() => (s.forceWin ? 20 : rollDie()), [s.forceWin])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase()
      if (key === 'f' && !e.shiftKey) {
        toggleFullscreen()
        return
      }
      if (key === 'w' && e.shiftKey) {
        dispatch({ type: 'TOGGLE_FORCE' })
        return
      }
      const go = e.key === ' ' || e.key === 'Enter'
      if (go) e.preventDefault()
      switch (s.phase) {
        case 'title':
          if (go) dispatch({ type: 'START' })
          break
        case 'hero':
          if (['1', '2', '3'].includes(e.key)) dispatch({ type: 'PICK_HERO', hero: HERO_CLASSES[Number(e.key) - 1] })
          break
        case 'encounter':
          if (['1', '2', '3'].includes(e.key)) dispatch({ type: 'CHOOSE', index: Number(e.key) - 1 })
          break
        case 'result':
          if (go) dispatch({ type: 'CONTINUE' })
          break
        case 'ending':
          if (go || e.key === 'r' || e.key === 'R') dispatch({ type: 'RESTART' })
          break
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [s.phase])

  const landmark = s.run[s.round]

  return (
    <div className="relative h-full w-full overflow-hidden">
      <div className="stars" />
      <Skyline />
      {s.forceWin && <div title="Sure-win on (Shift+W)" className="fixed top-3 right-3 z-50 h-2.5 w-2.5 rounded-full bg-gold shadow-[0_0_12px_#d4a63a]" />}
      <AnimatePresence mode="wait">
        {s.phase === 'title' && <Title key="title" onStart={() => dispatch({ type: 'START' })} />}
        {s.phase === 'hero' && <HeroPick key="hero" onPick={(hero) => dispatch({ type: 'PICK_HERO', hero })} />}
        {(s.phase === 'encounter' || s.phase === 'rolling') && landmark && s.hero && (
          <Encounter
            key={`enc-${s.round}`}
            landmark={landmark}
            hero={s.hero}
            round={s.round}
            total={s.run.length}
            hearts={s.hearts}
            tried={s.tried}
            rolling={s.phase === 'rolling'}
            choice={s.choice}
            onChoose={(i) => dispatch({ type: 'CHOOSE', index: i })}
            onRollDone={(roll) => dispatch({ type: 'ROLL_DONE', roll })}
            rollNow={rollNow}
          />
        )}
        {s.phase === 'result' && landmark && s.hero && s.outcome && s.choice !== null && (
          <Result
            key={`res-${s.round}-${s.tried.length}-${s.rescued}`}
            landmark={landmark}
            hero={s.hero}
            choice={landmark.choices[s.choice]}
            outcome={s.outcome}
            legend={s.outcome.success ? s.deck[s.round] : null}
            rescued={s.rescued}
            hearts={s.hearts}
            isLast={s.round + 1 >= s.run.length}
            onContinue={() => dispatch({ type: 'CONTINUE' })}
          />
        )}
        {s.phase === 'ending' && s.hero && (
          <Ending key="ending" hero={s.hero} collected={s.collected} total={s.run.length} onRestart={() => dispatch({ type: 'RESTART' })} />
        )}
      </AnimatePresence>
    </div>
  )
}

function toggleFullscreen() {
  if (document.fullscreenElement) void document.exitFullscreen()
  else void document.documentElement.requestFullscreen().catch(() => {})
}
