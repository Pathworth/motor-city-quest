import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Landmark } from '../data/landmarks.ts'
import { STAT_LABEL, successChance, type HeroClass } from '../engine/engine.ts'
import { Screen, Hearts, StatChip, Keycap } from '../ui/bits.tsx'

type Props = {
  landmark: Landmark
  hero: HeroClass
  round: number
  total: number
  hearts: number
  tried: number[]
  rolling: boolean
  choice: number | null
  onChoose: (i: number) => void
  onRollDone: (roll: number) => void
  rollNow: () => number
}

export function Encounter({ landmark, hero, round, total, hearts, tried, rolling, choice, onChoose, onRollDone, rollNow }: Props) {
  const retry = tried.length > 0
  return (
    <Screen className="justify-between">
      <header className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="text-3xl md:text-4xl">{hero.icon}</span>
          <div>
            <div className="text-sm uppercase tracking-widest text-cream-300/70 md:text-base">{hero.name}</div>
            <div className="flex gap-1.5">
              {Array.from({ length: total }).map((_, i) => (
                <span key={i} className={`h-2 w-7 rounded-full md:w-9 ${i < round ? 'bg-gold' : i === round ? 'bg-patina-300' : 'bg-white/15'}`} />
              ))}
            </div>
          </div>
        </div>
        <div className="font-display text-xl text-gold md:text-3xl">
          Round {round + 1} <span className="text-cream-300/60">of {total}</span>
        </div>
        <Hearts count={hearts} />
      </header>

      <section className="my-4 flex-1 xl:my-6">
        <div className="card rounded-3xl p-6 md:p-8 xl:p-10">
          <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
            <span className="text-3xl xl:text-5xl">{landmark.icon}</span>
            <h2 className="font-display glow text-3xl font-extrabold text-gold md:text-4xl xl:text-5xl 2xl:text-6xl">{landmark.questName}</h2>
          </div>
          <p className="mt-1 text-base font-semibold text-patina-300 md:text-lg xl:text-2xl">
            {landmark.realName} <span className="text-cream-300/60">· {landmark.district}</span>
          </p>
          <p className="mt-4 text-[clamp(1rem,2.9vh,1.9rem)] leading-relaxed text-cream">{landmark.scene}</p>
          {retry && !rolling && (
            <p className="mt-4 text-lg font-semibold text-ember md:text-xl">You lost a heart. Try a different move.</p>
          )}
        </div>
      </section>

      <section className="relative">
        <AnimatePresence mode="wait">
          {!rolling ? (
            <motion.div key="choices" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid gap-4 md:grid-cols-3 md:gap-6">
              {landmark.choices.map((c, i) => {
                const used = tried.includes(i)
                const bonus = hero.stats[c.stat]
                const pct = Math.round(successChance(bonus, c.dc) * 100)
                return (
                  <motion.button
                    key={i}
                    disabled={used}
                    whileHover={used ? undefined : { y: -4 }}
                    whileTap={used ? undefined : { scale: 0.98 }}
                    onClick={() => onChoose(i)}
                    className={`card flex flex-col rounded-2xl p-4 text-left md:p-5 xl:p-6 ${used ? 'opacity-35 line-through' : 'hover:border-gold/70'}`}
                  >
                    <div className="flex items-center justify-between">
                      <StatChip stat={c.stat} bonus={bonus} />
                      <Keycap k={String(i + 1)} />
                    </div>
                    <p className="mt-2 text-base font-semibold leading-snug text-cream md:text-lg xl:text-xl 2xl:text-2xl">{c.label}</p>
                    <p className="mt-2 text-sm text-cream-300/70 xl:text-base">
                      Target {c.dc} · {pct}% chance
                    </p>
                  </motion.button>
                )
              })}
            </motion.div>
          ) : (
            choice !== null && (
              <Die key="die" bonus={hero.stats[landmark.choices[choice].stat]} statName={STAT_LABEL[landmark.choices[choice].stat]} dc={landmark.choices[choice].dc} rollNow={rollNow} onDone={onRollDone} />
            )
          )}
        </AnimatePresence>
      </section>
    </Screen>
  )
}

function Die({ bonus, statName, dc, rollNow, onDone }: { bonus: number; statName: string; dc: number; rollNow: () => number; onDone: (roll: number) => void }) {
  const [face, setFace] = useState(1)
  const [final, setFinal] = useState<number | null>(null)
  const done = useRef(false)

  useEffect(() => {
    const result = rollNow()
    const spin = setInterval(() => setFace(1 + Math.floor(Math.random() * 20)), 70)
    const stop = setTimeout(() => {
      clearInterval(spin)
      setFace(result)
      setFinal(result)
    }, 1500)
    const finish = setTimeout(() => {
      if (!done.current) {
        done.current = true
        onDone(result)
      }
    }, 3300)
    return () => {
      clearInterval(spin)
      clearTimeout(stop)
      clearTimeout(finish)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const total = final !== null ? final + bonus : null
  const success = total !== null && (total >= dc || final === 20)

  return (
    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center justify-center gap-6 py-4 md:flex-row md:gap-12">
      <motion.div
        animate={final === null ? { rotate: [0, 90, 180, 270, 360], scale: [1, 1.08, 1] } : { rotate: 0, scale: 1.1 }}
        transition={final === null ? { repeat: Infinity, duration: 0.6, ease: 'linear' } : { type: 'spring', stiffness: 300 }}
        className="relative grid h-36 w-36 place-items-center md:h-44 md:w-44"
      >
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full drop-shadow-[0_0_30px_rgba(212,166,58,0.5)]">
          <polygon points="50,3 95,27 95,73 50,97 5,73 5,27" fill="#182548" stroke="#d4a63a" strokeWidth="3" />
          <polygon points="50,3 95,27 50,40 5,27" fill="#22325c" opacity="0.8" />
        </svg>
        <span className={`font-display relative text-6xl font-extrabold md:text-7xl ${final === 20 ? 'text-gold-200' : 'text-gold'}`}>{face}</span>
      </motion.div>
      <div className="text-center md:text-left">
        <AnimatePresence>
          {final === null ? (
            <motion.p key="rolling" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-display text-3xl text-cream md:text-5xl">
              Rolling…
            </motion.p>
          ) : (
            <motion.div key="shown" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
              <p className="text-2xl text-cream-300 md:text-4xl">
                Roll <b className="text-cream">{final}</b> + {statName} <b className="text-cream">{bonus}</b> = <b className="text-gold">{total}</b>
                <span className="text-cream-300/60"> vs {dc}</span>
              </p>
              <p className={`font-display mt-2 text-4xl font-extrabold md:text-6xl ${success ? 'text-patina-300' : 'text-ember'}`}>
                {final === 20 ? 'Natural 20!' : success ? 'Success!' : 'Not enough…'}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
