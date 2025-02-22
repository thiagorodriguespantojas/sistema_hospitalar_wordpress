"use client"

import { useEffect, useRef } from "react"
import { useAccessibility } from "./AccessibilityContext"

const TextToSpeech = ({ children }) => {
  const { textToSpeech } = useAccessibility()
  const speechSynthesis = useRef(window.speechSynthesis)
  const utterance = useRef(new SpeechSynthesisUtterance())

  useEffect(() => {
    if (textToSpeech) {
      utterance.current.text = children
      speechSynthesis.current.speak(utterance.current)
    } else {
      speechSynthesis.current.cancel()
    }

    return () => {
      speechSynthesis.current.cancel()
    }
  }, [children, textToSpeech])

  return <>{children}</>
}

export default TextToSpeech

