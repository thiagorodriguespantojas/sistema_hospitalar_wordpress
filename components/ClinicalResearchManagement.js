"use client"

import { useState } from "react"
import { Paper, Typography, TextField, Button, List, ListItem, ListItemText } from "@mui/material"

const ClinicalResearchManagement = () => {
  const [studies, setStudies] = useState([])
  const [newStudy, setNewStudy] = useState({ name: "", description: "", status: "Recruiting" })

  const handleAddStudy = () => {
    setStudies([...studies, { ...newStudy, id: studies.length + 1 }])
    setNewStudy({ name: "", description: "", status: "Recruiting" })
  }

  return (
    <Paper style={{ padding: "16px" }}>
      <Typography variant="h6" gutterBottom>
        Clinical Research Management
      </Typography>
      <TextField
        fullWidth
        label="Study Name"
        value={newStudy.name}
        onChange={(e) => setNewStudy({ ...newStudy, name: e.target.value })}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Description"
        value={newStudy.description}
        onChange={(e) => setNewStudy({ ...newStudy, description: e.target.value })}
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handleAddStudy}>
        Add New Study
      </Button>
      <List>
        {studies.map((study) => (
          <ListItem key={study.id}>
            <ListItemText primary={study.name} secondary={`${study.description} - Status: ${study.status}`} />
          </ListItem>
        ))}
      </List>
    </Paper>
  )
}

export default ClinicalResearchManagement

