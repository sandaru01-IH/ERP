import { motion } from 'framer-motion'
import { Wrench, Plus, Calendar, AlertTriangle } from 'lucide-react'
import QuickActions from '../../components/modules/QuickActions'
import KPITile from '../../components/modules/KPITile'
import ActivityTimeline from '../../components/modules/ActivityTimeline'
import AssetRegistry from '../../components/machinery/AssetRegistry'
import AllocationScheduling from '../../components/machinery/AllocationScheduling'
import WorkLogs from '../../components/machinery/WorkLogs'
import Maintenance from '../../components/machinery/Maintenance'
import FuelManagement from '../../components/machinery/FuelManagement'
import MachineryAccessRoles from '../../components/machinery/MachineryAccessRoles'
import { KPI, Activity } from '../../types'
import { mockAssets, mockWorkLogs, mockBreakdownTickets, mockFuelIssues } from '../../mock/data'

const activeAssets = mockAssets.filter((a) => a.status === 'active').length
const maintenanceDue = mockAssets.filter((a) =>
  a.maintenanceHistory.some(
    (m) => m.nextDueDate && new Date(m.nextDueDate) <= new Date()
  )
).length

const kpis: KPI[] = [
  {
    id: '1',
    label: 'Total Assets',
    value: String(mockAssets.length),
    change: 0,
    trend: 'stable',
  },
  {
    id: '2',
    label: 'Active',
    value: String(activeAssets),
    change: 0,
    trend: 'stable',
  },
  {
    id: '3',
    label: 'Maintenance Due',
    value: String(maintenanceDue),
    change: 1,
    trend: 'up',
  },
]

const activities: Activity[] = [
  {
    id: '1',
    type: 'maintenance',
    description: 'Tractor T-101 service completed',
    timestamp: new Date().toISOString(),
    user: 'Mechanical Team',
  },
  {
    id: '2',
    type: 'assignment',
    description: 'Sprayer SP-205 assigned to Field B2',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    user: 'Superintendent',
  },
  {
    id: '3',
    type: 'fuel',
    description: 'Fuel issued to Tractor T-101',
    timestamp: new Date(Date.now() - 7200000).toISOString(),
    user: 'Storekeeper A',
  },
]

export default function AssetsMachineryModule() {
  const quickActions = [
    { id: '1', label: 'Add Asset', icon: Plus, onClick: () => console.log('Add asset') },
    {
      id: '2',
      label: 'Schedule Maintenance',
      icon: Calendar,
      onClick: () => console.log('Schedule maintenance'),
    },
    { id: '3', label: 'View Alerts', icon: AlertTriangle, onClick: () => console.log('View alerts') },
  ]

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">Assets & Machinery</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Asset register + allocation + maintenance + fuel + operator logs
        </p>
      </motion.div>

      <QuickActions actions={quickActions} />

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {kpis.map((kpi) => (
          <KPITile key={kpi.id} kpi={kpi} />
        ))}
      </div>

      {/* Asset Registry */}
      <AssetRegistry />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          <AllocationScheduling />
          <WorkLogs />
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <FuelManagement />
          <MachineryAccessRoles />
          <ActivityTimeline activities={activities} />
        </div>
      </div>

      {/* Maintenance Section (Full Width) */}
      <Maintenance />
    </div>
  )
}
