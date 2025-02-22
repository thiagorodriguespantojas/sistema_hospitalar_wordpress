"use client"

import { useState } from "react"
import { Button } from "@mui/material"
import MicIcon from "@mui/icons-material/Mic"
import { useAccessibility } from "./AccessibilityContext"
import { useNavigate } from "react-router-dom"

const VoiceNavigation = () => {
  const [listening, setListening] = useState(false)
  const { voiceNavigationEnabled } = useAccessibility()
  const navigate = useNavigate()

  const startListening = () => {
    if ("webkitSpeechRecognition" in window) {
      const recognition = new window.webkitSpeechRecognition()
      recognition.continuous = false
      recognition.interimResults = false

      recognition.onstart = () => {
        setListening(true)
      }

      recognition.onresult = (event) => {
        const command = event.results[0][0].transcript.toLowerCase()
        handleVoiceCommand(command)
      }

      recognition.onend = () => {
        setListening(false)
      }

      recognition.start()
    }
  }

  const handleVoiceCommand = (command) => {
    switch (command) {
      case "go to dashboard":
        navigate("/")
        break
      case "go to appointments":
        navigate("/appointments")
        break
      case "go to patients":
        navigate("/patients")
        break
      // Add more voice commands as needed
      default:
        console.log("Command not recognized")
    }
  }

  return (
    voiceNavigationEnabled && (
      <Button variant="contained" color="primary" startIcon={<MicIcon />} onClick={startListening} disabled={listening}>
        {listening ? "Listening..." : "Voice Navigation"}
      </Button>
    )
  )
}

export default VoiceNavigation

