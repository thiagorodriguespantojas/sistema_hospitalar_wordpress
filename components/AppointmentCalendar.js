"use client"

import { useState, useEffect } from "react"
import { Calendar, momentLocalizer } from "react-big-calendar"
import moment from "moment"
import "react-big-calendar/lib/css/react-big-calendar.css"
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from "@mui/material"

const localizer = momentLocalizer(moment)

const AppointmentCalendar = ({ doctorId }) => {
  const [appointments, setAppointments] = useState([])
  const [selectedAppointment, setSelectedAppointment] = useState(null)

  useEffect(() => {
    fetchAppointments()
  }, []) // Removed doctorId from dependencies

  const fetchAppointments = async () => {
    try {
      const response = await fetch(`/api/appointments?doctorId=${doctorId}`)
      const data = await response.json()
      const formattedAppointments = data.map((appointment) => ({
        ...appointment,
        start: new Date(appointment.start),
        end: new Date(appointment.end),
      }))
      setAppointments(formattedAppointments)
    } catch (error) {
      console.error("Error fetching appointments:", error)
    }
  }

  const handleSelectAppointment = (appointment) => {
    setSelectedAppointment(appointment)
  }

  const handleCloseDialog = () => {
    setSelectedAppointment(null)
  }

  return (
    <div style={{ height: "500px" }}>
      <Calendar
        localizer={localizer}
        events={appointments}
        startAccessor="start"
        endAccessor="end"
        onSelectEvent={handleSelectAppointment}
        views={["month", "week", "day"]}
      />
      <Dialog open={!!selectedAppointment} onClose={handleCloseDialog}>
        <DialogTitle>Appointment Details</DialogTitle>
        <DialogContent>
          {selectedAppointment && (
            <div>
              <Typography>
                <strong>Patient:</strong> {selectedAppointment.patientName}
              </Typography>
              <Typography>
                <strong>Date:</strong> {moment(selectedAppointment.start).format("MMMM D, YYYY")}
              </Typography>
              <Typography>
                <strong>Time:</strong> {moment(selectedAppointment.start).format("h:mm A")} -{" "}
                {moment(selectedAppointment.end).format("h:mm A")}
              </Typography>
              <Typography>
                <strong>Reason:</strong> {selectedAppointment.reason}
              </Typography>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default AppointmentCalendar

