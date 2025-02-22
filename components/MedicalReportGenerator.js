"use client"

import { useState } from "react"
import { Button, TextField, Grid, Typography, Paper } from "@mui/material"
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer"

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#E4E4E4",
    padding: 30,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 20,
  },
  text: {
    fontSize: 12,
    marginBottom: 10,
  },
})

const MedicalReport = ({ patientName, doctorName, diagnosis, treatment, date }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.title}>Medical Report</Text>
        <Text style={styles.text}>Patient Name: {patientName}</Text>
        <Text style={styles.text}>Doctor: {doctorName}</Text>
        <Text style={styles.text}>Date: {date}</Text>
        <Text style={styles.text}>Diagnosis: {diagnosis}</Text>
        <Text style={styles.text}>Treatment: {treatment}</Text>
      </View>
    </Page>
  </Document>
)

const MedicalReportGenerator = ({ patientId }) => {
  const [reportData, setReportData] = useState({
    patientName: "",
    doctorName: "",
    diagnosis: "",
    treatment: "",
    date: new Date().toISOString().split("T")[0],
  })

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setReportData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const generateReport = () => {
    // In a real application, you might want to save this report to the backend
    console.log("Report generated:", reportData)
  }

  return (
    <Paper elevation={3} style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <Typography variant="h5" gutterBottom>
        Generate Medical Report
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Patient Name"
            name="patientName"
            value={reportData.patientName}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Doctor Name"
            name="doctorName"
            value={reportData.doctorName}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Diagnosis"
            name="diagnosis"
            multiline
            rows={4}
            value={reportData.diagnosis}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Treatment"
            name="treatment"
            multiline
            rows={4}
            value={reportData.treatment}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Date"
            name="date"
            type="date"
            value={reportData.date}
            onChange={handleInputChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={generateReport}>
            Generate Report
          </Button>
          <PDFDownloadLink
            document={<MedicalReport {...reportData} />}
            fileName="medical_report.pdf"
            style={{
              textDecoration: "none",
              padding: "10px",
              color: "#4a4a4a",
              backgroundColor: "#f2f2f2",
              border: "1px solid #4a4a4a",
              borderRadius: "4px",
              marginLeft: "10px",
            }}
          >
            {({ blob, url, loading, error }) => (loading ? "Loading document..." : "Download PDF")}
          </PDFDownloadLink>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default MedicalReportGenerator

