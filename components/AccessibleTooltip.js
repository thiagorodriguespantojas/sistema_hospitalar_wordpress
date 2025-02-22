"use client"

import { useState } from "react"
import { Tooltip } from "@mui/material"
import { useAccessibility } from "./AccessibilityContext"

const AccessibleTooltip = ({ children, title }) => {
  const [open, setOpen] = useState(false)
  const { tooltipsEnabled } = useAccessibility()

  const handleToggle = () => {
    if (tooltipsEnabled) {
      setOpen(!open)
    }
  }

  return (
    <Tooltip
      title={title}
      open={tooltipsEnabled && open}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      enterTouchDelay={0}
      leaveTouchDelay={5000}
    >
      <span
        onClick={handleToggle}
        onKeyPress={(e) => e.key === "Enter" && handleToggle()}
        tabIndex={0}
        role="button"
        aria-label={`${title} (tooltip)`}
      >
        {children}
      </span>
    </Tooltip>
  )
}

export default AccessibleTooltip

