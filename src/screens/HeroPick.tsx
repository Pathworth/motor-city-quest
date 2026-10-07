import { motion } from 'framer-motion'
import { HERO_CLASSES, type HeroClass, type Stat } from '../engine/engine.ts'
import { Screen, StatChip, Keycap } from '../ui/bits.tsx'

const ORDER: Stat[] = ['might', 'mind', 'heart']

export function HeroPick({ onPick }: { onPick: (h: HeroClass) => void }) {
  return (
    <Screen className="justify-center-safe">
      <h2 className="font-display glow text-center text-4xl font-extrabold text-gold md:text-6xl">Choose your hero</h2>
      <p className="mt-3 text-center text-lg text-cream-300 md:text-2xl">Every hero can win. Each one wins a different way.</p>
      <div className="mt-10 grid gap-5 md:grid-cols-3 md:gap-8">
        {HERO_CLASSES.map((h, i) => (
          <motion.button
            key={h.id}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12 * i }}
            whileHover={{ y: -6, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onPick(h)}
            className="card group flex flex-col items-start rounded-3xl p-7 text-left transition-colors hover:border-gold/70 md:p-9"
          >
            <div className="flex w-full items-center justify-between">
              <span className="text-6xl md:text-7xl">{h.icon}</span>
              <Keycap k={String(i + 1)} />
            </div>
            <h3 className="font-display mt-5 text-3xl font-bold text-cream md:text-4xl">{h.name}</h3>
            <p className="mt-2 text-lg text-cream-300 md:text-xl">{h.tagline}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {ORDER.map((st) => (
                <StatChip key={st} stat={st} bonus={h.stats[st]} />
              ))}
            </div>
          </motion.button>
        ))}
      </div>
      <p className="mt-8 text-center text-base text-cream-300/70 md:text-lg">
        Might moves things. Mind figures things out. Heart brings people with you.
      </p>
    </Screen>
  )
}
