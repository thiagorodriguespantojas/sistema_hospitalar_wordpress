"use client"

import { useState, useEffect } from "react"
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
} from "@mui/material"
import { Assignment, People, LocalHospital, Event, Alarm } from "@mui/icons-material"

const NurseDashboard = ({ nurseId }) => {
  const [nurseData, setNurseData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchNurseData()
  }, []) // Removed unnecessary dependency: nurseId

  const fetchNurseData = async () => {
    try {
      const response = await fetch(`/api/nurse-dashboard/${nurseId}`)
      const data = await response.json()
      setNurseData(data)
      setLoading(false)
    } catch (error) {
      console.error("Error fetching nurse data:", error)
      setLoading(false)
    }
  }

  if (loading) {
    return <CircularProgress />
  }

  if (!nurseData) {
    return <Typography>Error loading nurse data</Typography>
  }

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Welcome, Nurse {nurseData.name}
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Assignment />
              <Typography variant="h6">Assigned Patients</Typography>
              <Typography variant="h4">{nurseData.assignedPatients.length}</Typography>
              <Button variant="contained" color="primary">
                View Patients
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <People />
              <Typography variant="h6">Upcoming Rounds</Typography>
              <Typography variant="h4">{nurseData.upcomingRounds}</Typography>
              <Button variant="contained" color="primary">
                View Schedule
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <LocalHospital />
              <Typography variant="h6">Medication Due</Typography>
              <Typography variant="h4">{nurseData.medicationsDue}</Typography>
              <Button variant="contained" color="primary">
                Administer Medication
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Event />
              <Typography variant="h6">Shift Information</Typography>
              <Typography variant="body2">Next Shift: {nurseData.nextShift}</Typography>
              <Typography variant="body2">Hours Worked: {nurseData.hoursWorked}</Typography>
              <Button variant="contained" color="primary">
                View Full Schedule
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Grid container spacing={3} style={{ marginTop: "20px" }}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Recent Patient Updates</Typography>
              <List>
                {nurseData.recentUpdates.map((update, index) => (
                  <ListItem key={index}>
                    <ListItemText
                      primary={update.patientName}
                      secondary={`${update.updateType} - ${update.timestamp}`}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Upcoming Tasks</Typography>
              <List>
                {nurseData.upcomingTasks.map((task, index) => (
                  <ListItem key={index}>
                    <ListItemText primary={task.description} secondary={`Due: ${task.dueTime}`} />
                    <Alarm color="secondary" />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  )
}

export default NurseDashboard

