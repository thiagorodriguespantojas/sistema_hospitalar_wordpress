"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from "@mui/material"

const SecurityAuditLog = () => {
  const [auditLogs, setAuditLogs] = useState([])

  useEffect(() => {
    // Mock data - in a real app, this would be fetched from a secure API
    setAuditLogs([
      {
        id: 1,
        timestamp: "2023-06-10 10:30:00",
        user: "Dr. Smith",
        action: "Accessed patient record",
        details: "Patient ID: 12345",
      },
      {
        id: 2,
        timestamp: "2023-06-10 11:15:00",
        user: "Nurse Johnson",
        action: "Updated medication",
        details: "Patient ID: 67890",
      },
      {
        id: 3,
        timestamp: "2023-06-10 13:45:00",
        user: "Admin User",
        action: "Created new user account",
        details: "Username: newdoctor1",
      },
    ])
  }, [])

  return (
    <Paper style={{ padding: "16px" }}>
      <Typography variant="h6" gutterBottom>
        Security Audit Log
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Timestamp</TableCell>
              <TableCell>User</TableCell>
              <TableCell>Action</TableCell>
              <TableCell>Details</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {auditLogs.map((log) => (
              <TableRow key={log.id}>
                <TableCell>{log.timestamp}</TableCell>
                <TableCell>{log.user}</TableCell>
                <TableCell>{log.action}</TableCell>
                <TableCell>{log.details}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  )
}

export default SecurityAuditLog

