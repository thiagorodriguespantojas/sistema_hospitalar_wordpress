"use client"

import { useState } from "react"
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from "@mui/material"

const OnboardingTutorial = () => {
  const [open, setOpen] = useState(true)
  const [step, setStep] = useState(0)

  const steps = [
    { title: "Welcome", content: "Welcome to the Hospital Management System. Let's get you started!" },
    {
      title: "Dashboard",
      content: "This is your dashboard. You can see an overview of your tasks and appointments here.",
    },
    { title: "Patient Records", content: "Access and manage patient records easily from the sidebar." },
    { title: "Appointments", content: "Schedule and manage appointments using our calendar feature." },
  ]

  const handleClose = () => {
    setOpen(false)
  }

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1)
    } else {
      handleClose()
    }
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{steps[step].title}</DialogTitle>
      <DialogContent>
        <Typography>{steps[step].content}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Skip</Button>
        <Button onClick={handleNext}>{step === steps.length - 1 ? "Finish" : "Next"}</Button>
      </DialogActions>
    </Dialog>
  )
}

export default OnboardingTutorial

