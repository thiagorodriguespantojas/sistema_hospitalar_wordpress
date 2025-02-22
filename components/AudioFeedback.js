"use client"

import { useEffect, useRef } from "react"
import { useAccessibility } from "./AccessibilityContext"

const AudioFeedback = ({ action }) => {
  const { audioFeedback } = useAccessibility()
  const audioRef = useRef(null)

  useEffect(() => {
    if (audioFeedback && action) {
      const audio = new Audio(`/audio/${action}.mp3`)
      audio.play()
    }
  }, [action, audioFeedback])

  return null
}

export default AudioFeedback

