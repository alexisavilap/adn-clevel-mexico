import { useState, useEffect, useRef } from 'react'

export const useCountUp = (end, duration = 2000, decimals = 0) => {
  const [count, setCount] = useState(0)
  const [triggered, setTriggered] = useState(false)
  const frameRef = useRef()
  const startRef = useRef()

  const trigger = () => setTriggered(true)

  useEffect(() => {
    if (!triggered) return
    startRef.current = null

    const animate = (ts) => {
      if (!startRef.current) startRef.current = ts
      const progress = Math.min((ts - startRef.current) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = end * eased
      setCount(decimals > 0 ? parseFloat(current.toFixed(decimals)) : Math.floor(current))
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate)
      } else {
        setCount(end)
      }
    }

    frameRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frameRef.current)
  }, [triggered, end, duration, decimals])

  return { count, trigger }
}
