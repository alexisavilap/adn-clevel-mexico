import { motion } from 'framer-motion'

const variants = {
  enter: { opacity: 0, x: 40 },
  center: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -40 },
}

export default function QuestionStep({ question, current, total, children }) {
  return (
    <motion.div
      key={question}
      variants={variants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ duration: 0.35, ease: 'easeInOut' }}
      className="w-full"
    >
      {/* Progress */}
      <div className="flex gap-1 mb-8">
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            className={`h-0.5 flex-1 transition-colors duration-300 ${
              i < current ? 'bg-gold' : 'bg-muted/30'
            }`}
          />
        ))}
      </div>

      <p className="font-mono text-gold text-xs tracking-widest uppercase mb-4">
        Pregunta {current} de {total}
      </p>
      <h3 className="font-display text-2xl md:text-3xl font-bold text-off-white mb-8 leading-tight">
        {question}
      </h3>
      {children}
    </motion.div>
  )
}
