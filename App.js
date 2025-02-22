import { Suspense, lazy } from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import { CircularProgress } from "@mui/material"
import Layout from "./components/Layout"
import ErrorBoundary from "./components/ErrorBoundary"
import { AccessibilityProvider } from "./components/AccessibilityContext"
import "./styles/accessibility.css"

// Lazy load all main components
const Dashboard = lazy(() => import("./components/dashboards/Dashboard"))
const PatientDashboard = lazy(() => import("./components/dashboards/PatientDashboard"))
const DoctorDashboard = lazy(() => import("./components/dashboards/DoctorDashboard"))
const NurseDashboard = lazy(() => import("./components/dashboards/NurseDashboard"))
const AdminDashboard = lazy(() => import("./components/dashboards/AdminDashboard"))
const Appointments = lazy(() => import("./components/Appointments"))
const AppointmentCalendar = lazy(() => import("./components/AppointmentCalendar"))
const AppointmentScheduler = lazy(() => import("./components/AppointmentScheduler"))
const Patients = lazy(() => import("./components/Patients"))
const Doctors = lazy(() => import("./components/Doctors"))
const Billing = lazy(() => import("./components/Billing"))
const MedicalRecords = lazy(() => import("./components/MedicalRecords"))
const MedicalImageUploader = lazy(() => import("./components/MedicalImageUploader"))
const MedicalImageViewer = lazy(() => import("./components/MedicalImageViewer"))
const PharmacyIntegration = lazy(() => import("./components/PharmacyIntegration"))
const PatientStatistics = lazy(() => import("./components/PatientStatistics"))
const MedicalReportGenerator = lazy(() => import("./components/MedicalReportGenerator"))
const TwoFactorAuth = lazy(() => import("./components/TwoFactorAuth"))

const App = () => {
  return (
    <ErrorBoundary>
      <AccessibilityProvider>
        <Router>
          <Layout>
            <Suspense fallback={<CircularProgress />}>
              <Switch>
                <Route exact path="/" component={Dashboard} />
                <Route path="/patient-dashboard" component={PatientDashboard} />
                <Route path="/doctor-dashboard" component={DoctorDashboard} />
                <Route path="/nurse-dashboard" component={NurseDashboard} />
                <Route path="/admin-dashboard" component={AdminDashboard} />
                <Route path="/appointments" component={Appointments} />
                <Route path="/appointment-calendar" component={AppointmentCalendar} />
                <Route path="/schedule-appointment" component={AppointmentScheduler} />
                <Route path="/patients" component={Patients} />
                <Route path="/doctors" component={Doctors} />
                <Route path="/billing" component={Billing} />
                <Route path="/medical-records" component={MedicalRecords} />
                <Route path="/medical-image-upload" component={MedicalImageUploader} />
                <Route path="/medical-image-viewer" component={MedicalImageViewer} />
                <Route path="/pharmacy" component={PharmacyIntegration} />
                <Route path="/patient-statistics" component={PatientStatistics} />
                <Route path="/generate-report" component={MedicalReportGenerator} />
                <Route path="/two-factor-auth" component={TwoFactorAuth} />
              </Switch>
            </Suspense>
          </Layout>
        </Router>
      </AccessibilityProvider>
    </ErrorBoundary>
  )
}

export default App

