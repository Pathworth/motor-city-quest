import { motion } from 'framer-motion'
import { Screen, BigButton, Keycap } from '../ui/bits.tsx'
import { LANDMARKS } from '../data/landmarks.ts'
import { LEGENDS } from '../data/legends.ts'

export function Title({ onStart }: { onStart: () => void }) {
  return (
    <Screen className="items-center justify-center-safe text-center">
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mb-4 text-base font-semibold uppercase tracking-[0.35em] text-patina-300 md:text-xl"
      >
        A Detroit legend in six rounds
      </motion.p>
      <motion.h1
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="font-display glow text-6xl font-extrabold leading-none text-gold md:text-8xl lg:text-9xl"
      >
        Motor City
        <br />
        Quest
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-8 max-w-3xl text-xl leading-relaxed text-cream-300 md:text-2xl"
      >
        Real Detroit places. Fantasy foes. Pick a hero, make your move, roll the die.
        Win a round and meet a legend.
      </motion.p>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="mt-12">
        <BigButton onClick={onStart}>Begin the Quest</BigButton>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1 }}
        className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-sm text-cream-300/80 md:text-base"
      >
        <span>
          <Keycap k="Space" /> start and continue
        </span>
        <span>
          <Keycap k="1" /> <Keycap k="2" /> <Keycap k="3" /> choose
        </span>
        <span>
          <Keycap k="F" /> fullscreen
        </span>
      </motion.div>
      <p className="mt-6 text-xs tracking-wide text-cream-300/50 md:text-sm">
        {LANDMARKS.length} Detroit places · {LEGENDS.length} legends · every fact and quote is real
      </p>
      <p className="mt-3 text-sm font-semibold tracking-wide text-gold/80 md:text-base">Created by Anthony · October 6, 2026</p>
    </Screen>
  )
}
