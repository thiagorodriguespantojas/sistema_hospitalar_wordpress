"use client"

import { useState } from "react"
import { Button, TextField, Paper, Typography, List, ListItem, ListItemText } from "@mui/material"

const AIDiagnosisSupport = () => {
  const [symptoms, setSymptoms] = useState("")
  const [diagnosis, setDiagnosis] = useState([])

  const handleDiagnosis = () => {
    // This is a mock AI diagnosis. In a real system, this would call an AI service.
    const mockDiagnosis = [
      { name: "Common Cold", probability: "60%" },
      { name: "Influenza", probability: "30%" },
      { name: "Allergic Rhinitis", probability: "10%" },
    ]
    setDiagnosis(mockDiagnosis)
  }

  return (
    <Paper style={{ padding: "16px" }}>
      <Typography variant="h6">AI Diagnosis Support</Typography>
      <TextField
        fullWidth
        multiline
        rows={4}
        variant="outlined"
        label="Enter patient symptoms"
        value={symptoms}
        onChange={(e) => setSymptoms(e.target.value)}
        style={{ marginTop: "16px" }}
      />
      <Button variant="contained" color="primary" onClick={handleDiagnosis} style={{ marginTop: "16px" }}>
        Get AI Diagnosis
      </Button>
      {diagnosis.length > 0 && (
        <List>
          {diagnosis.map((item, index) => (
            <ListItem key={index}>
              <ListItemText primary={item.name} secondary={`Probability: ${item.probability}`} />
            </ListItem>
          ))}
        </List>
      )}
    </Paper>
  )
}

export default AIDiagnosisSupport

