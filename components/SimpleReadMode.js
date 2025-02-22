import React from "react"
import { Typography, Paper } from "@mui/material"
import { useAccessibility } from "./AccessibilityContext"

const SimpleReadMode = ({ children }) => {
  const { simpleReadModeEnabled } = useAccessibility()

  if (!simpleReadModeEnabled) {
    return children
  }

  return (
    <Paper elevation={0} style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <Typography variant="body1" component="div" style={{ lineHeight: 1.8 }}>
        {React.Children.map(children, (child) => {
          if (typeof child === "string") {
            return child
          }
          if (React.isValidElement(child)) {
            return React.cloneElement(child, { style: { marginBottom: "20px" } })
          }
          return child
        })}
      </Typography>
    </Paper>
  )
}

export default SimpleReadMode

