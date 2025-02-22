"use client"

import { useState } from "react"
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from "@mui/material"

const AccessibilityFeedback = () => {
  const [open, setOpen] = useState(false)
  const [feedback, setFeedback] = useState("")

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const handleSubmit = () => {
    // Aqui você implementaria a lógica para enviar o feedback
    console.log("Feedback enviado:", feedback)
    handleClose()
  }

  return (
    <>
      <Button onClick={handleOpen}>Enviar Feedback de Acessibilidade</Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Feedback de Acessibilidade</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="feedback"
            label="Seu feedback"
            type="text"
            fullWidth
            multiline
            rows={4}
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleSubmit}>Enviar</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default AccessibilityFeedback

