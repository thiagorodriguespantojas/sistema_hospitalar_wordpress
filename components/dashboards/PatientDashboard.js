import { Card, CardContent, Typography, Button, Grid } from "@mui/material"
import { CalendarToday, Assignment, LocalHospital, AttachMoney } from "@mui/icons-material"

const PatientDashboard = ({ patient }) => {
  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Welcome, {patient.name}
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <CalendarToday />
              <Typography variant="h6">Upcoming Appointments</Typography>
              <Typography variant="h4">{patient.upcomingAppointments}</Typography>
              <Button variant="contained" color="primary">
                Schedule Appointment
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Assignment />
              <Typography variant="h6">Medical Records</Typography>
              <Button variant="contained" color="primary">
                View Records
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <LocalHospital />
              <Typography variant="h6">Prescriptions</Typography>
              <Typography variant="h4">{patient.activePrescriptions}</Typography>
              <Button variant="contained" color="primary">
                View Prescriptions
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <AttachMoney />
              <Typography variant="h6">Billing</Typography>
              <Typography variant="h4">${patient.outstandingBalance}</Typography>
              <Button variant="contained" color="primary">
                Pay Bill
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  )
}

export default PatientDashboard

