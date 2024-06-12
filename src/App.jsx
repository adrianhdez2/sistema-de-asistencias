import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import HomeDashboard from "./pages/dashboard/HomeDashboard"
import Reports from "./pages/dashboard/Reports"
import Update from "./pages/dashboard/Update"
import Dashboard from "./pages/Dashboard"
import Alumnos from "./pages/dashboard/Students"
import { FilterProvider } from "./components/context/filters"
import { PrivateRoutes } from "./components/privates/PrivateRoutes"
import Admins from "./pages/dashboard/Admins"


export default function App() {
  return (
    <>
      <FilterProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<PrivateRoutes element={<Dashboard />} />} >
            <Route index element={<HomeDashboard />} />
            <Route path="students" element={<Alumnos />} />
            <Route path="admins" element={<Admins />} />
            <Route path="update" element={<Update />} />
            <Route path="reports" element={<Reports />} />
          </Route>
        </Routes>
      </FilterProvider>
    </>
  )
}
