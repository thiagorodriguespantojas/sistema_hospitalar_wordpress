"use client"

import { useState } from "react"
import { Button, Paper, Typography, List, ListItem, ListItemText } from "@mui/material"

const ExternalSystemsIntegration = () => {
  const [labResults, setLabResults] = useState([])
  const [prescriptions, setPrescriptions] = useState([])

  const fetchLabResults = () => {
    // Mock fetching lab results
    setLabResults([
      { id: 1, test: "Blood Test", result: "Normal" },
      { id: 2, test: "X-Ray", result: "No abnormalities detected" },
    ])
  }

  const sendPrescriptionToPharmacy = () => {
    // Mock sending prescription to pharmacy
    setPrescriptions([{ id: 1, medication: "Amoxicillin", dosage: "500mg", frequency: "Every 8 hours" }])
  }

  return (
    <Paper style={{ padding: '16px' }}>
      <Typography variant="h6" gutterBottom>External Systems Integration</Typography>
      <Button variant="contained" color="primary" onClick={fetchLabResults}>
        Fetch Lab Results
      </Button>
      <Button variant="contained" color="secondary" onClick={sendPrescriptionToPharmacy}>
        Send Prescription to Pharmacy
      </Button>
      {labResults.length > 0 && (
        <div>
          <Typography variant="subtitle1">Lab Results:</Typography>
          <List>
            {labResults.map((result) => (
              <ListItem key={result.id}>
                <ListItemText primary={result.test} secondary={result.result} />
              </ListItem>
            ))}
          </List>
        </div>
      )}
      {prescriptions.length > 0 && (
        <div>
          <Typography variant="subtitle1">Prescriptions Sent to Pharmacy:</Typography>
          <List>
            {prescriptions.map((prescription) => (
              <ListItem key={prescription.id}>
                <ListItemText 
                  primary={prescription.medication} 
                  secondary={`${prescription.dosage}, ${prescription.frequency}`} 
                />
              </ListItem>
            ))}
          </List>
        </div>
      )}
    </Paper
  \
                />
              </ListItem>
            ))
}
</List>
        </div>
      )}
    </Paper>
  )
}

export default ExternalSystemsIntegration

