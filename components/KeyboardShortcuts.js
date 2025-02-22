"use client"

import { useEffect } from "react"
import { useAccessibility } from "./AccessibilityContext"

const KeyboardShortcuts = () => {
  const { keyboardShortcuts, keyboardNavigationEnabled } = useAccessibility()

  useEffect(() => {
    if (!keyboardNavigationEnabled) return

    const handleKeyDown = (event) => {
      const shortcut = keyboardShortcuts.find(
        (s) => s.key === event.key && s.ctrlKey === event.ctrlKey && s.altKey === event.altKey,
      )

      if (shortcut) {
        event.preventDefault()
        shortcut.action()
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [keyboardShortcuts, keyboardNavigationEnabled])

  return null
}

export default KeyboardShortcuts

