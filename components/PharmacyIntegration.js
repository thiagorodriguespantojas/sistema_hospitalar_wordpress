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
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material"
import { Add, Edit, Delete } from "@mui/icons-material"

const PharmacyIntegration = () => {
  const [medications, setMedications] = useState([])
  const [openDialog, setOpenDialog] = useState(false)
  const [selectedMedication, setSelectedMedication] = useState(null)
  const [formData, setFormData] = useState({ name: "", dosage: "", inStock: true })

  useEffect(() => {
    fetchMedications()
  }, [])

  const fetchMedications = async () => {
    try {
      const response = await fetch("/api/pharmacy/medications")
      const data = await response.json()
      setMedications(data)
    } catch (error) {
      console.error("Error fetching medications:", error)
    }
  }

  const handleOpenDialog = (medication = null) => {
    setSelectedMedication(medication)
    setFormData(medication || { name: "", dosage: "", inStock: true })
    setOpenDialog(true)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
    setSelectedMedication(null)
    setFormData({ name: "", dosage: "", inStock: true })
  }

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const url = selectedMedication
        ? `/api/pharmacy/medications/${selectedMedication.id}`
        : "/api/pharmacy/medications"
      const method = selectedMedication ? "PUT" : "POST"
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      if (response.ok) {
        fetchMedications()
        handleCloseDialog()
      } else {
        throw new Error("Failed to save medication")
      }
    } catch (error) {
      console.error("Error saving medication:", error)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this medication?")) {
      try {
        const response = await fetch(`/api/pharmacy/medications/${id}`, {
          method: "DELETE",
        })
        if (response.ok) {
          fetchMedications()
        } else {
          throw new Error("Failed to delete medication")
        }
      } catch (error) {
        console.error("Error deleting medication:", error)
      }
    }
  }

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Pharmacy Integration
      </Typography>
      <Button
        variant="contained"
        color="primary"
        startIcon={<Add />}
        onClick={() => handleOpenDialog()}
        style={{ marginBottom: "20px" }}
      >
        Add New Medication
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Medication Name</TableCell>
              <TableCell>Dosage</TableCell>
              <TableCell>In Stock</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {medications.map((medication) => (
              <TableRow key={medication.id}>
                <TableCell>{medication.name}</TableCell>
                <TableCell>{medication.dosage}</TableCell>
                <TableCell>{medication.inStock ? "Yes" : "No"}</TableCell>
                <TableCell>
                  <Button startIcon={<Edit />} onClick={() => handleOpenDialog(medication)}>
                    Edit
                  </Button>
                  <Button startIcon={<Delete />} onClick={() => handleDelete(medication.id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{selectedMedication ? "Edit Medication" : "Add New Medication"}</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              name="name"
              label="Medication Name"
              value={formData.name}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              name="dosage"
              label="Dosage"
              value={formData.dosage}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              name="inStock"
              label="In Stock"
              type="checkbox"
              checked={formData.inStock}
              onChange={handleInputChange}
              margin="normal"
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSubmit} color="primary">
            {selectedMedication ? "Save Changes" : "Add Medication"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default PharmacyIntegration

