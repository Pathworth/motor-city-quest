import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { STAT_LABEL, type Stat } from '../engine/engine.ts'

export function Screen({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <motion.main
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className={`relative z-10 mx-auto flex h-full w-full max-w-7xl flex-col overflow-y-auto px-6 py-5 md:px-10 md:py-6 ${className}`}
    >
      {children}
    </motion.main>
  )
}

export function Hearts({ count, max = 3 }: { count: number; max?: number }) {
  return (
    <div className="flex items-center gap-1.5" aria-label={`${count} of ${max} hearts`}>
      {Array.from({ length: max }).map((_, i) => (
        <motion.span
          key={i}
          animate={{ scale: i < count ? 1 : 0.85, opacity: i < count ? 1 : 0.3 }}
          className={`text-3xl md:text-4xl ${i < count ? 'text-ember drop-shadow-[0_0_10px_rgba(226,88,58,0.7)]' : 'text-cream-300 grayscale'}`}
        >
          ♥
        </motion.span>
      ))}
    </div>
  )
}

const statClass: Record<Stat, string> = {
  might: 'bg-might/20 text-might border-might/50',
  mind: 'bg-mind/20 text-mind border-mind/50',
  heart: 'bg-heart/20 text-heart border-heart/50',
}

export function StatChip({ stat, bonus, className = '' }: { stat: Stat; bonus?: number; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-sm font-bold uppercase tracking-wider md:text-base ${statClass[stat]} ${className}`}>
      {STAT_LABEL[stat]}
      {bonus !== undefined && <span className="opacity-90">+{bonus}</span>}
    </span>
  )
}

export function Keycap({ k }: { k: string }) {
  return <span className="key">{k}</span>
}

export function BigButton({ children, onClick, tone = 'gold', className = '' }: { children: ReactNode; onClick: () => void; tone?: 'gold' | 'ghost'; className?: string }) {
  const tones = {
    gold: 'bg-gold text-night hover:bg-gold-300 shadow-[0_10px_40px_rgba(212,166,58,0.35)]',
    ghost: 'bg-white/5 text-cream border border-cream/25 hover:bg-white/10',
  }
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`rounded-2xl px-8 py-4 text-xl font-extrabold tracking-wide md:px-10 md:py-5 md:text-2xl ${tones[tone]} ${className}`}
    >
      {children}
    </motion.button>
  )
}
