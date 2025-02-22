"use client"

import { useState } from "react"
import { Tabs, Tab, Paper, Typography, Button } from "@mui/material"
import { CalendarToday, Description, Message } from "@mui/icons-material"

const PatientPortal = () => {
  const [activeTab, setActiveTab] = useState(0)

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue)
  }

  return (
    <Paper style={{ padding: "16px" }}>
      <Typography variant="h6" gutterBottom>
        Patient Portal
      </Typography>
      <Tabs value={activeTab} onChange={handleTabChange}>
        <Tab icon={<CalendarToday />} label="Appointments" />
        <Tab icon={<Description />} label="Medical Records" />
        <Tab icon={<Message />} label="Messages" />
      </Tabs>
      {activeTab === 0 && (
        <div>
          <Typography variant="subtitle1" gutterBottom>
            Upcoming Appointments
          </Typography>
          <Button variant="contained" color="primary">
            Schedule New Appointment
          </Button>
        </div>
      )}
      {activeTab === 1 && (
        <div>
          <Typography variant="subtitle1" gutterBottom>
            Your Medical Records
          </Typography>
          <Button variant="contained" color="primary">
            View Full Records
          </Button>
        </div>
      )}
      {activeTab === 2 && (
        <div>
          <Typography variant="subtitle1" gutterBottom>
            Messages
          </Typography>
          <Button variant="contained" color="primary">
            New Message
          </Button>
        </div>
      )}
    </Paper>
  )
}

export default PatientPortal

