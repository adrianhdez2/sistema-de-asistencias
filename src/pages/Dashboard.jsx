import { Outlet } from "react-router-dom"
import HeaderDashboard from "../components/HeaderDashboard"


function Dashboard() {
  return (
    <div className="min-h-full">
        <HeaderDashboard/>
        <Outlet />
    </div>
  )
}

export default Dashboard