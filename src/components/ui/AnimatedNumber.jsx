import { useEffect } from 'react'
import { useCountUp } from '../../hooks/useCountUp'
import { useInView } from '../../hooks/useInView'

export default function AnimatedNumber({ value, suffix = '', prefix = '', decimals = 0, className = '' }) {
  const { count, trigger } = useCountUp(parseFloat(value), 1800, decimals)
  const { ref, inView } = useInView(0.3)

  useEffect(() => {
    if (inView) trigger()
  }, [inView])

  const display = decimals > 0 ? count.toFixed(decimals) : Math.floor(count)

  return (
    <span ref={ref} className={className}>
      {prefix}{display}{suffix}
    </span>
  )
}
