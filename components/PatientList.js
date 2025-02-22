"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from "@mui/material"
import { cacheData, getCachedData } from "../utils/cacheManager"

const PatientList = () => {
  const [patients, setPatients] = useState([])

  useEffect(() => {
    const fetchPatients = async () => {
      const cachedPatients = getCachedData("patientList")
      if (cachedPatients) {
        setPatients(cachedPatients)
      } else {
        // In a real app, this would be an API call
        const response = await fetch("/api/patients")
        const data = await response.json()
        setPatients(data)
        cacheData("patientList", data, 300000) // Cache for 5 minutes
      }
    }

    fetchPatients()
  }, [])

  return (
    <Paper style={{ padding: "16px" }}>
      <Typography variant="h6" gutterBottom>
        Patient List
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Last Visit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {patients.map((patient) => (
              <TableRow key={patient.id}>
                <TableCell>{patient.name}</TableCell>
                <TableCell>{patient.age}</TableCell>
                <TableCell>{patient.gender}</TableCell>
                <TableCell>{patient.lastVisit}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  )
}

export default PatientList

