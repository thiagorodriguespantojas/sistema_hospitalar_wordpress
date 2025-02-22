"use client"

import { useState, useEffect } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material"

const MedicalRecords = ({ patientId }) => {
  const [records, setRecords] = useState([])
  const [open, setOpen] = useState(false)
  const [newRecord, setNewRecord] = useState({ date: "", diagnosis: "", treatment: "", notes: "" })

  useEffect(() => {
    // Fetch medical records from the backend
    fetchMedicalRecords(patientId)
  }, [patientId])

  const fetchMedicalRecords = async (id) => {
    // This would be an API call in a real application
    const response = await fetch(`/api/medical-records/${id}`)
    const data = await response.json()
    setRecords(data)
  }

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleChange = (e) => {
    setNewRecord({ ...newRecord, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    // This would be an API call in a real application
    const response = await fetch("/api/medical-records", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ patientId, ...newRecord }),
    })
    if (response.ok) {
      fetchMedicalRecords(patientId)
      handleClose()
    }
  }

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Medical Records
      </Typography>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Add New Record
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Diagnosis</TableCell>
              <TableCell>Treatment</TableCell>
              <TableCell>Notes</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {records.map((record) => (
              <TableRow key={record.id}>
                <TableCell>{record.date}</TableCell>
                <TableCell>{record.diagnosis}</TableCell>
                <TableCell>{record.treatment}</TableCell>
                <TableCell>{record.notes}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Medical Record</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="date"
            label="Date"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={newRecord.date}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="diagnosis"
            label="Diagnosis"
            type="text"
            fullWidth
            value={newRecord.diagnosis}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="treatment"
            label="Treatment"
            type="text"
            fullWidth
            value={newRecord.treatment}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="notes"
            label="Notes"
            type="text"
            fullWidth
            multiline
            rows={4}
            value={newRecord.notes}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Add Record
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default MedicalRecords

