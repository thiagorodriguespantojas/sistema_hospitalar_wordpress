import { Grid, Paper, Typography } from "@mui/material"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

const data = [
  { name: "Jan", patients: 4000, revenue: 2400 },
  { name: "Feb", patients: 3000, revenue: 1398 },
  { name: "Mar", patients: 2000, revenue: 9800 },
  { name: "Apr", patients: 2780, revenue: 3908 },
  { name: "May", patients: 1890, revenue: 4800 },
  { name: "Jun", patients: 2390, revenue: 3800 },
]

const DataAnalyticsDashboard = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Paper style={{ padding: "16px" }}>
          <Typography variant="h6" gutterBottom>
            Hospital Performance Dashboard
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
              <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
              <Tooltip />
              <Legend />
              <Bar yAxisId="left" dataKey="patients" fill="#8884d8" name="Patients" />
              <Bar yAxisId="right" dataKey="revenue" fill="#82ca9d" name="Revenue" />
            </BarChart>
          </ResponsiveContainer>
        </Paper>
      </Grid>
    </Grid>
  )
}

export default DataAnalyticsDashboard

