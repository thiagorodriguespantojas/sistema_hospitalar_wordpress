"use client"

import { useState } from "react"
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Grid, Typography, Snackbar } from "@mui/material"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import { TimePicker } from "@mui/x-date-pickers/TimePicker"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { useDataFetching } from "../hooks/useDataFetching"

const AppointmentScheduler = () => {
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedTime, setSelectedTime] = useState(null)
  const [selectedDoctor, setSelectedDoctor] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState("")
  const [reason, setReason] = useState("")
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState("")

  const { data: departments } = useDataFetching("/api/departments")
  const { data: doctors } = useDataFetching("/api/doctors")
  const { data: availableSlots, loading: slotsLoading } = useDataFetching(
    selectedDoctor && selectedDate
      ? `/api/available-slots?doctor=${selectedDoctor}&date=${selectedDate.toISOString().split("T")[0]}`
      : null,
  )

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date: selectedDate,
          time: selectedTime,
          doctor: selectedDoctor,
          department: selectedDepartment,
          reason,
        }),
      })

      if (response.ok) {
        setSnackbarMessage("Appointment scheduled successfully!")
        setSnackbarOpen(true)
        // Reset form
        setSelectedDate(null)
        setSelectedTime(null)
        setSelectedDoctor("")
        setSelectedDepartment("")
        setReason("")
      } else {
        throw new Error("Failed to schedule appointment")
      }
    } catch (error) {
      setSnackbarMessage("Error scheduling appointment. Please try again.")
      setSnackbarOpen(true)
    }
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <form onSubmit={handleSubmit}>
        <Typography variant="h5" gutterBottom>
          Schedule an Appointment
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Department</InputLabel>
              <Select value={selectedDepartment} onChange={(e) => setSelectedDepartment(e.target.value)} required>
                {departments?.map((dept) => (
                  <MenuItem key={dept.id} value={dept.id}>
                    {dept.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Doctor</InputLabel>
              <Select value={selectedDoctor} onChange={(e) => setSelectedDoctor(e.target.value)} required>
                {doctors?.map((doctor) => (
                  <MenuItem key={doctor.id} value={doctor.id}>
                    Dr. {doctor.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <DatePicker
              label="Date"
              value={selectedDate}
              onChange={(newValue) => setSelectedDate(newValue)}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TimePicker
              label="Time"
              value={selectedTime}
              onChange={(newValue) => setSelectedTime(newValue)}
              renderInput={(params) => <TextField {...params} fullWidth />}
              disabled={!selectedDate || !selectedDoctor || slotsLoading}
              shouldDisableTime={(timeValue, clockType) => {
                if (!availableSlots) return false
                const time = `${timeValue.getHours()}:${timeValue.getMinutes()}`
                return !availableSlots.includes(time)
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Reason for Visit"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Schedule Appointment
            </Button>
          </Grid>
        </Grid>
      </form>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
      />
    </LocalizationProvider>
  )
}

export default AppointmentScheduler

