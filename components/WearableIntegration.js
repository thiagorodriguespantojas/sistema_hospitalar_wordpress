"use client"

import { useState, useEffect, useCallback } from "react"
import { Paper, Typography, List, ListItem, ListItemText, Button } from "@mui/material"

const WearableIntegration = () => {
  const [wearableData, setWearableData] = useState(null)

  const fetchWearableData = useCallback(() => {
    // Mock data - in a real app, this would fetch data from a wearable device API
    const mockData = {
      heartRate: 72,
      steps: 8500,
      calories: 2100,
      sleepHours: 7.5,
      lastSync: new Date().toLocaleString(),
    }
    setWearableData(mockData)
  }, [])

  useEffect(() => {
    fetchWearableData()
    // In a real app, you might set up a periodic fetch here
  }, [fetchWearableData])

  return (
    <Paper style={{ padding: "16px" }}>
      <Typography variant="h6" gutterBottom>
        Wearable Device Integration
      </Typography>
      {wearableData ? (
        <List>
          <ListItem>
            <ListItemText primary="Heart Rate" secondary={`${wearableData.heartRate} bpm`} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Steps" secondary={wearableData.steps} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Calories Burned" secondary={`${wearableData.calories} cal`} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Sleep Duration" secondary={`${wearableData.sleepHours} hours`} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Last Synced" secondary={wearableData.lastSync} />
          </ListItem>
        </List>
      ) : (
        <Typography>No wearable data available</Typography>
      )}
      <Button variant="contained" color="primary" onClick={fetchWearableData}>
        Sync Wearable Data
      </Button>
    </Paper>
  )
}

export default WearableIntegration

