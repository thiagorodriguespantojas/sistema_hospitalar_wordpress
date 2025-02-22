"use client"

import { useState, useEffect } from "react"
import { Snackbar, IconButton } from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import { useAccessibility } from "./AccessibilityContext"

const AccessibleNotifications = ({ message, severity, duration = 5000 }) => {
  const [open, setOpen] = useState(false)
  const { screenReader, audioFeedback } = useAccessibility()

  useEffect(() => {
    setOpen(true)
    if (audioFeedback) {
      const audio = new Audio(`/audio/${severity}.mp3`)
      audio.play()
    }
  }, [severity, audioFeedback])

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return
    }
    setOpen(false)
  }

  return (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      open={open}
      autoHideDuration={duration}
      onClose={handleClose}
      message={message}
      action={
        <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
          <CloseIcon fontSize="small" />
        </IconButton>
      }
      ContentProps={{
        "aria-live": "polite",
        role: screenReader ? "alert" : "status",
      }}
    />
  )
}

export default AccessibleNotifications

