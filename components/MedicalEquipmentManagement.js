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

const MedicalEquipmentManagement = () => {
  const [equipment, setEquipment] = useState([])
  const [openDialog, setOpenDialog] = useState(false)
  const [newEquipment, setNewEquipment] = useState({
    name: "",
    status: "Operational",
    lastMaintenance: "",
    nextMaintenance: "",
  })

  useEffect(() => {
    // Mock data - in a real app, this would be fetched from an API
    setEquipment([
      {
        id: 1,
        name: "MRI Machine",
        status: "Operational",
        lastMaintenance: "2023-05-15",
        nextMaintenance: "2023-11-15",
      },
      {
        id: 2,
        name: "X-Ray Machine",
        status: "Under Maintenance",
        lastMaintenance: "2023-06-01",
        nextMaintenance: "2023-06-15",
      },
      {
        id: 3,
        name: "Ultrasound Machine",
        status: "Operational",
        lastMaintenance: "2023-04-30",
        nextMaintenance: "2023-10-30",
      },
    ])
  }, [])

  const handleOpenDialog = () => setOpenDialog(true)
  const handleCloseDialog = () => setOpenDialog(false)

  const handleAddEquipment = () => {
    setEquipment([...equipment, { ...newEquipment, id: equipment.length + 1 }])
    setNewEquipment({ name: "", status: "Operational", lastMaintenance: "", nextMaintenance: "" })
    handleCloseDialog()
  }

  return (
    <Paper style={{ padding: "16px" }}>
      <Typography variant="h6" gutterBottom>
        Medical Equipment Management
      </Typography>
      <Button variant="contained" color="primary" onClick={handleOpenDialog} style={{ marginBottom: "16px" }}>
        Add New Equipment
      </Button>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Equipment Name</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Last Maintenance</TableCell>
              <TableCell>Next Maintenance</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {equipment.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.status}</TableCell>
                <TableCell>{item.lastMaintenance}</TableCell>
                <TableCell>{item.nextMaintenance}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Add New Equipment</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Equipment Name"
            fullWidth
            value={newEquipment.name}
            onChange={(e) => setNewEquipment({ ...newEquipment, name: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Status"
            fullWidth
            value={newEquipment.status}
            onChange={(e) => setNewEquipment({ ...newEquipment, status: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Last Maintenance"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={newEquipment.lastMaintenance}
            onChange={(e) => setNewEquipment({ ...newEquipment, lastMaintenance: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Next Maintenance"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={newEquipment.nextMaintenance}
            onChange={(e) => setNewEquipment({ ...newEquipment, nextMaintenance: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleAddEquipment} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  )
}

export default MedicalEquipmentManagement

