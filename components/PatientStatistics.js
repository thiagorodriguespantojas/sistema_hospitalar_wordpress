"use client"

import { useState, useEffect } from "react"
import { Typography, Paper, Grid, Select, MenuItem, FormControl, InputLabel } from "@mui/material"
import { ResponsiveLine } from "@nivo/line"
import { ResponsivePie } from "@nivo/pie"
import { ResponsiveBar } from "@nivo/bar"

const PatientStatistics = () => {
  const [data, setData] = useState({})
  const [chartType, setChartType] = useState("line")
  const [timeRange, setTimeRange] = useState("month")

  useEffect(() => {
    fetchPatientStatistics()
  }, []) // Removed unnecessary dependency: timeRange

  const fetchPatientStatistics = async () => {
    try {
      const response = await fetch(`/api/patient-statistics?timeRange=${timeRange}`)
      const rawData = await response.json()
      setData(rawData)
    } catch (error) {
      console.error("Error fetching patient statistics:", error)
    }
  }

  const renderChart = () => {
    switch (chartType) {
      case "line":
        return (
          <ResponsiveLine
            data={[
              {
                id: "Admissions",
                data: data.admissions?.map((d) => ({ x: d.date, y: d.count })) || [],
              },
              {
                id: "Discharges",
                data: data.discharges?.map((d) => ({ x: d.date, y: d.count })) || [],
              },
            ]}
            margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
            xScale={{ type: "time", format: "%Y-%m-%d", useUTC: false }}
            xFormat="time:%Y-%m-%d"
            yScale={{ type: "linear", min: "auto", max: "auto", stacked: false, reverse: false }}
            axisBottom={{
              format: "%b %d",
              tickValues: "every 7 days",
              legend: "Date",
              legendOffset: 36,
              legendPosition: "middle",
            }}
            axisLeft={{
              legend: "Count",
              legendOffset: -40,
              legendPosition: "middle",
            }}
            pointSize={10}
            pointColor={{ theme: "background" }}
            pointBorderWidth={2}
            pointBorderColor={{ from: "serieColor" }}
            pointLabelYOffset={-12}
            useMesh={true}
            legends={[
              {
                anchor: "bottom-right",
                direction: "column",
                justify: false,
                translateX: 100,
                translateY: 0,
                itemsSpacing: 0,
                itemDirection: "left-to-right",
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: "circle",
                symbolBorderColor: "rgba(0, 0, 0, .5)",
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemBackground: "rgba(0, 0, 0, .03)",
                      itemOpacity: 1,
                    },
                  },
                ],
              },
            ]}
          />
        )
      case "pie":
        return (
          <ResponsivePie
            data={[
              { id: "Male", value: data.genderDistribution?.male || 0 },
              { id: "Female", value: data.genderDistribution?.female || 0 },
              { id: "Other", value: data.genderDistribution?.other || 0 },
            ]}
            margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
            innerRadius={0.5}
            padAngle={0.7}
            cornerRadius={3}
            activeOuterRadiusOffset={8}
            borderWidth={1}
            borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
            arcLinkLabelsSkipAngle={10}
            arcLinkLabelsTextColor="#333333"
            arcLinkLabelsThickness={2}
            arcLinkLabelsColor={{ from: "color" }}
            arcLabelsSkipAngle={10}
            arcLabelsTextColor={{ from: "color", modifiers: [["darker", 2]] }}
          />
        )
      case "bar":
        return (
          <ResponsiveBar
            data={data.ageDistribution || []}
            keys={["count"]}
            indexBy="ageGroup"
            margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
            padding={0.3}
            valueScale={{ type: "linear" }}
            indexScale={{ type: "band", round: true }}
            colors={{ scheme: "nivo" }}
            borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
            axisTop={null}
            axisRight={null}
            axisBottom={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: "Age Group",
              legendPosition: "middle",
              legendOffset: 32,
            }}
            axisLeft={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: "Count",
              legendPosition: "middle",
              legendOffset: -40,
            }}
            labelSkipWidth={12}
            labelSkipHeight={12}
            labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
          />
        )
      default:
        return null
    }
  }

  return (
    <Paper elevation={3} style={{ padding: "20px" }}>
      <Typography variant="h5" gutterBottom>
        Patient Statistics
      </Typography>
      <Grid container spacing={2} style={{ marginBottom: "20px" }}>
        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel>Chart Type</InputLabel>
            <Select value={chartType} onChange={(e) => setChartType(e.target.value)}>
              <MenuItem value="line">Line Chart</MenuItem>
              <MenuItem value="pie">Pie Chart</MenuItem>
              <MenuItem value="bar">Bar Chart</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel>Time Range</InputLabel>
            <Select value={timeRange} onChange={(e) => setTimeRange(e.target.value)}>
              <MenuItem value="week">Last Week</MenuItem>
              <MenuItem value="month">Last Month</MenuItem>
              <MenuItem value="year">Last Year</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <div style={{ height: "400px" }}>{renderChart()}</div>
    </Paper>
  )
}

export default PatientStatistics

