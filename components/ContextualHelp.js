"use client"

import { useState } from "react"
import { IconButton, Popover, Typography } from "@mui/material"
import HelpOutlineIcon from "@mui/icons-material/HelpOutline"
import { useAccessibility } from "./AccessibilityContext"

const ContextualHelp = ({ content }) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const { tooltipsEnabled } = useAccessibility()

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const id = open ? "contextual-help-popover" : undefined

  if (!tooltipsEnabled) return null

  return (
    <>
      <IconButton aria-label="help" onClick={handleClick}>
        <HelpOutlineIcon />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Typography sx={{ p: 2 }}>{content}</Typography>
      </Popover>
    </>
  )
}

export default ContextualHelp

