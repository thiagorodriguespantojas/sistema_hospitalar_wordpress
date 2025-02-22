"use client"

import { useEffect } from "react"
import { useAccessibility } from "./AccessibilityContext"

const AutoDarkMode = () => {
  const { setHighContrast } = useAccessibility()

  useEffect(() => {
    const checkTime = () => {
      const currentHour = new Date().getHours()
      setHighContrast(currentHour >= 20 || currentHour < 6)
    }

    checkTime() // Check immediately on mount
    const interval = setInterval(checkTime, 60000) // Check every minute

    return () => clearInterval(interval)
  }, [setHighContrast])

  return null
}

export default AutoDarkMode

