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
  Button,
  TextField,
} from "@mui/material"

const InventoryManagement = () => {
  const [inventory, setInventory] = useState([])
  const [newItem, setNewItem] = useState({ name: "", quantity: "", reorderPoint: "" })

  useEffect(() => {
    // Mock data - in a real app, this would be fetched from an API
    setInventory([
      { id: 1, name: "Aspirin", quantity: 500, reorderPoint: 100 },
      { id: 2, name: "Bandages", quantity: 1000, reorderPoint: 200 },
      { id: 3, name: "Syringes", quantity: 750, reorderPoint: 150 },
    ])
  }, [])

  const handleAddItem = () => {
    setInventory([...inventory, { ...newItem, id: inventory.length + 1 }])
    setNewItem({ name: "", quantity: "", reorderPoint: "" })
  }

  return (
    <Paper style={{ padding: "16px" }}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Item Name</TableCell>
              <TableCell align="right">Quantity</TableCell>
              <TableCell align="right">Reorder Point</TableCell>
              <TableCell align="right">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {inventory.map((item) => (
              <TableRow key={item.id}>
                <TableCell component="th" scope="row">
                  {item.name}
                </TableCell>
                <TableCell align="right">{item.quantity}</TableCell>
                <TableCell align="right">{item.reorderPoint}</TableCell>
                <TableCell align="right">{item.quantity <= item.reorderPoint ? "Reorder" : "OK"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div style={{ marginTop: "16px" }}>
        <TextField
          label="Item Name"
          value={newItem.name}
          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
        />
        <TextField
          label="Quantity"
          type="number"
          value={newItem.quantity}
          onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
        />
        <TextField
          label="Reorder Point"
          type="number"
          value={newItem.reorderPoint}
          onChange={(e) => setNewItem({ ...newItem, reorderPoint: e.target.value })}
        />
        <Button variant="contained" color="primary" onClick={handleAddItem}>
          Add Item
        </Button>
      </div>
    </Paper>
  )
}

export default InventoryManagement

