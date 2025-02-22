import { Card, CardContent, Typography, Button, Grid } from "@mui/material"
import { CalendarToday, People, Assignment, Notifications } from "@mui/icons-material"

const DoctorDashboard = ({ doctor }) => {
  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Welcome, Dr. {doctor.name}
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <CalendarToday />
              <Typography variant="h6">Today's Appointments</Typography>
              <Typography variant="h4">{doctor.todayAppointments}</Typography>
              <Button variant="contained" color="primary">
                View Schedule
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <People />
              <Typography variant="h6">Patients</Typography>
              <Typography variant="h4">{doctor.totalPatients}</Typography>
              <Button variant="contained" color="primary">
                Patient List
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Assignment />
              <Typography variant="h6">Pending Reports</Typography>
              <Typography variant="h4">{doctor.pendingReports}</Typography>
              <Button variant="contained" color="primary">
                View Reports
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Notifications />
              <Typography variant="h6">Notifications</Typography>
              <Typography variant="h4">{doctor.unreadNotifications}</Typography>
              <Button variant="contained" color="primary">
                View All
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  )
}

export default DoctorDashboard

