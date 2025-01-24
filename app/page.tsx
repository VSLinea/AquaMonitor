import { DashboardHeader } from "./components/dashboard-header"
import { FacilitySelector } from "./components/facility-selector"
import { PoolParameters } from "./components/pool-parameters"
import { PoolStatus } from "./components/pool-status"
import { ActiveAlarms } from "./components/active-alarms"
import { PoolTable } from "./components/pool-table"

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#001529]">
      <DashboardHeader />
      <main className="p-6">
        <div className="mb-6">
          <FacilitySelector />
        </div>
        <div className="grid grid-cols-3 gap-6 mb-6">
          <PoolParameters />
          <PoolStatus />
          <ActiveAlarms />
        </div>
        <PoolTable />
      </main>
    </div>
  )
}

