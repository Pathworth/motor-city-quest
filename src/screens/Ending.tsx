import { useEffect } from 'react'
import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import type { Legend } from '../data/legends.ts'
import type { HeroClass } from '../engine/engine.ts'
import { Screen, BigButton, Keycap } from '../ui/bits.tsx'

export function Ending({ hero, collected, total, onRestart }: { hero: HeroClass; collected: Legend[]; total: number; onRestart: () => void }) {
  useEffect(() => {
    const end = Date.now() + 1500
    const tick = () => {
      confetti({ particleCount: 6, angle: 60, spread: 60, origin: { x: 0, y: 0.7 }, colors: ['#d4a63a', '#efcf7a', '#3f8f74'] })
      confetti({ particleCount: 6, angle: 120, spread: 60, origin: { x: 1, y: 0.7 }, colors: ['#d4a63a', '#efcf7a', '#3f8f74'] })
      if (Date.now() < end) requestAnimationFrame(tick)
    }
    tick()
  }, [])

  const perfect = collected.length === total

  return (
    <Screen className="justify-center-safe">
      <p className="text-center text-lg font-semibold uppercase tracking-[0.3em] text-patina-300 md:text-2xl">
        {hero.icon} {hero.name} · quest complete
      </p>
      <h2 className="font-display glow mt-2 text-center text-[clamp(2rem,6.5vh,4.5rem)] font-extrabold leading-none text-gold">The Book of Legends</h2>
      <p className="mt-2 text-center text-[clamp(1rem,2.6vh,1.5rem)] text-cream-300">
        {perfect ? `Every round won. ${collected.length} legends gathered across Detroit.` : `${collected.length} of ${total} legends gathered across Detroit.`}
      </p>

      <div className="mt-5 grid gap-3 md:grid-cols-3">
        {collected.map((l, i) => (
          <motion.div
            key={l.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 * i }}
            className="card flex flex-col rounded-2xl p-4"
          >
            <p className="font-display text-[clamp(0.9rem,2.2vh,1.4rem)] font-bold leading-snug text-cream">“{l.quote}”</p>
            <p className="mt-2 text-[clamp(0.8rem,1.9vh,1.1rem)] font-bold text-gold">{l.name}</p>
            {l.detroitTie && <p className="mt-1 text-sm text-patina-300">313 · {l.detroitTie}</p>}
          </motion.div>
        ))}
        {collected.length === 0 && (
          <p className="col-span-full text-center text-xl text-cream-300">The foes held every ground tonight. Detroit always gets back up. Play again.</p>
        )}
      </div>

      <div className="mt-6 flex items-center justify-center gap-4">
        <BigButton onClick={onRestart}>Play again</BigButton>
        <span className="text-cream-300/60">
          <Keycap k="Space" />
        </span>
      </div>
      <p className="mt-4 text-center text-sm font-semibold tracking-wide text-gold/80">Motor City Quest · Created by Anthony · October 6, 2026</p>
    </Screen>
  )
}
