export default function SectionLabel({ number, text, light = false }) {
  return (
    <p className={`font-mono text-xs tracking-widest uppercase mb-4 ${light ? 'text-gold' : 'text-muted'}`}>
      {number} — {text}
    </p>
  )
}
