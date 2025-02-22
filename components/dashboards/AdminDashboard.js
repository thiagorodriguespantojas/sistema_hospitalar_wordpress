"use client"

import { useState, useEffect } from "react"
import { Grid, Card, CardContent, Typography, Button } from "@mui/material"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

const AdminDashboard = () => {
  const [patientStats, setPatientStats] = useState([])
  const [appointmentStats, setAppointmentStats] = useState([])

  useEffect(() => {
    // Fetch patient and appointment statistics
    fetchPatientStats()
    fetchAppointmentStats()
  }, [])

  const fetchPatientStats = async () => {
    // This would be an API call in a real application
    const response = await fetch("/api/admin/patient-stats")
    const data = await response.json()
    setPatientStats(data)
  }

  const fetchAppointmentStats = async () => {
    // This would be an API call in a real application
    const response = await fetch("/api/admin/appointment-stats")
    const data = await response.json()
    setAppointmentStats(data)
  }

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Patient Statistics
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={patientStats}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="newPatients" fill="#8884d8" name="New Patients" />
                  <Bar dataKey="activePatients" fill="#82ca9d" name="Active Patients" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Appointment Statistics
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={appointmentStats}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="department" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="scheduled" fill="#8884d8" name="Scheduled" />
                  <Bar dataKey="completed" fill="#82ca9d" name="Completed" />
                  <Bar dataKey="cancelled" fill="#ff7300" name="Cancelled" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Button variant="contained" color="primary" style={{ marginTop: "20px" }}>
        Generate Detailed Report
      </Button>
    </div>
  )
}

export default AdminDashboard

