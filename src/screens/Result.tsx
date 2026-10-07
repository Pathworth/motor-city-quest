import { useEffect } from 'react'
import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import type { Choice, Landmark } from '../data/landmarks.ts'
import type { Legend } from '../data/legends.ts'
import type { HeroClass, RollOutcome } from '../engine/engine.ts'
import { Screen, Hearts, BigButton, Keycap } from '../ui/bits.tsx'

type Props = {
  landmark: Landmark
  hero: HeroClass
  choice: Choice
  outcome: RollOutcome
  legend: Legend | null
  rescued: boolean
  hearts: number
  isLast: boolean
  onContinue: () => void
}

export function Result({ landmark, choice, outcome, legend, rescued, hearts, isLast, onContinue }: Props) {
  useEffect(() => {
    if (!outcome.success) return
    const burst = (x: number) => confetti({ particleCount: 120, spread: 80, origin: { x, y: 0.6 }, colors: ['#d4a63a', '#efcf7a', '#3f8f74', '#f4ede0'] })
    burst(0.25)
    const t = setTimeout(() => burst(0.75), 250)
    return () => clearTimeout(t)
  }, [outcome.success])

  if (outcome.success && legend) {
    return (
      <Screen className="justify-center-safe">
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center text-lg font-semibold uppercase tracking-[0.3em] text-patina-300 md:text-2xl">
          Round won · {landmark.realName}
        </motion.p>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="mx-auto mt-2 max-w-5xl text-center text-lg text-cream-300 xl:text-2xl">
          {choice.win}
        </motion.p>

        <motion.figure
          initial={{ opacity: 0, y: 30, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.35, duration: 0.5 }}
          className="card relative mx-auto mt-6 w-full max-w-6xl rounded-3xl p-7 md:p-9 xl:p-12"
        >
          <span className="font-display absolute -top-6 left-8 text-8xl leading-none text-gold/40 md:-top-8 md:text-9xl">“</span>
          <blockquote className="font-display relative text-[clamp(1.25rem,3.4vh,3rem)] font-bold leading-snug text-cream">
            {legend.quote}
          </blockquote>
          <figcaption className="mt-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="font-display text-2xl font-extrabold text-gold 2xl:text-4xl">{legend.name}</div>
              <div className="mt-1 text-base text-cream-300 xl:text-xl">
                {legend.who} <span className="text-cream-300/50">({legend.years})</span>
              </div>
              {legend.detroitTie && (
                <div className="mt-2 inline-flex items-center gap-2 rounded-full border border-patina/60 bg-patina/15 px-3 py-1 text-base font-semibold text-patina-300 md:text-lg">
                  <span>313</span> {legend.detroitTie}
                </div>
              )}
            </div>
            <div className="text-right text-sm text-cream-300/50 md:text-base">{legend.source}</div>
          </figcaption>
        </motion.figure>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }} className="mx-auto mt-4 w-full max-w-6xl rounded-2xl border border-gold/25 bg-gold/8 px-6 py-3 xl:px-8 xl:py-5">
          <div className="text-sm font-bold uppercase tracking-widest text-gold">Detroit truth</div>
          <p className="mt-1 text-base leading-relaxed text-cream md:text-lg 2xl:text-2xl">{landmark.fact}</p>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} className="mt-5 flex items-center justify-center gap-4 xl:mt-8">
          <BigButton onClick={onContinue}>{isLast ? 'Open the Book of Legends' : 'Next place'}</BigButton>
          <span className="text-cream-300/60">
            <Keycap k="Space" />
          </span>
        </motion.div>
      </Screen>
    )
  }

  return (
    <Screen className="items-center justify-center-safe text-center">
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-lg font-semibold uppercase tracking-[0.3em] text-ember md:text-2xl">
        {rescued ? 'Knocked down' : 'Pushed back'}
      </motion.p>
      <motion.h2 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="font-display mt-3 max-w-5xl text-[clamp(1.5rem,4.5vh,3.75rem)] font-extrabold leading-tight text-cream">
        {choice.lose}
      </motion.h2>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mt-5">
        <Hearts count={rescued ? 0 : hearts} />
      </motion.div>
      {rescued ? (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="card mt-5 max-w-4xl rounded-3xl p-6 xl:p-10">
          <div className="text-5xl xl:text-6xl">🗿</div>
          <p className="font-display mt-2 text-2xl font-bold text-gold xl:text-4xl">The Spirit of Detroit lifts you up.</p>
          <p className="mt-2 text-lg text-cream-300 xl:text-2xl">
            Your hearts are restored. {landmark.foe.charAt(0).toUpperCase() + landmark.foe.slice(1)} keeps this ground for now. The quest moves on.
          </p>
        </motion.div>
      ) : (
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mt-5 text-xl text-cream-300 xl:text-3xl">
          You lost a heart. Go back and try a different move.
        </motion.p>
      )}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="mt-7 flex items-center gap-4 xl:mt-10">
        <BigButton onClick={onContinue} tone={rescued ? 'gold' : 'ghost'}>
          {rescued ? (isLast ? 'Open the Book of Legends' : 'Next place') : 'Try another move'}
        </BigButton>
        <span className="text-cream-300/60">
          <Keycap k="Space" />
        </span>
      </motion.div>
    </Screen>
  )
}
