import { motion } from 'framer-motion'
import { TrendingUp, DollarSign, Users, Package, AlertTriangle, CheckCircle, FileText } from 'lucide-react'
import KPITile from '../../components/modules/KPITile'
import QuickActions from '../../components/modules/QuickActions'
import ActivityTimeline from '../../components/modules/ActivityTimeline'
import DashboardSection from '../../components/modules/DashboardSection'
import AlertsSection from '../../components/modules/AlertsSection'
import ApprovalsSection from '../../components/modules/ApprovalsSection'
import ReportsSection from '../../components/modules/ReportsSection'
import AccessRolesSection from '../../components/modules/AccessRolesSection'
import { KPI, Activity } from '../../types'
import { mockWorkTickets, mockAttendance, mockAssets } from '../../mock/data'

const kpis: KPI[] = [
  { id: '1', label: 'Total Revenue', value: 'Rs 2.4M', change: 12.5, trend: 'up' },
  { id: '2', label: 'Active Workforce', value: '156', change: 5.2, trend: 'up' },
  { id: '3', label: 'Fields Monitored', value: '24', change: 0, trend: 'stable' },
  { id: '4', label: 'Inventory Items', value: '142', change: -2.1, trend: 'down' },
]

const kpiIcons = [DollarSign, Users, TrendingUp, Package]

const activities: Activity[] = [
  { id: '1', type: 'work', description: 'Work ticket completed for Field A1', timestamp: new Date().toISOString(), user: 'David Fernando', status: 'completed' },
  { id: '2', type: 'alert', description: 'Low stock alert: Urea Fertilizer', timestamp: new Date(Date.now() - 3600000).toISOString(), status: 'pending' },
  { id: '3', type: 'maintenance', description: 'Tractor T-101 maintenance scheduled', timestamp: new Date(Date.now() - 7200000).toISOString(), user: 'Mechanical Team', status: 'pending' },
  { id: '4', type: 'application', description: 'Fertilizer applied to Field B2', timestamp: new Date(Date.now() - 10800000).toISOString(), user: 'Sarah Jayawardena', status: 'completed' },
]

export default function HomeModule() {
  const quickActions = [
    { id: '1', label: 'New Work Ticket', icon: CheckCircle, onClick: () => console.log('New ticket') },
    { id: '2', label: 'View Alerts', icon: AlertTriangle, onClick: () => console.log('View alerts') },
    { id: '3', label: 'Generate Report', icon: FileText, onClick: () => console.log('Generate report') },
  ]

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">General Info</h1>
        <p className="text-gray-600 dark:text-gray-400">Executive + operational overview, alerts, daily approvals, KPIs</p>
      </motion.div>

      <QuickActions actions={quickActions} />

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, index) => (
          <KPITile key={kpi.id} kpi={kpi} icon={kpiIcons[index]} />
        ))}
      </div>

      {/* Dashboard Section */}
      <DashboardSection />

      {/* Alerts & Exceptions Section */}
      <AlertsSection />

      {/* Approvals Section */}
      <ApprovalsSection />

      {/* Reports Section */}
      <ReportsSection />

      {/* Access & Operation Roles Section */}
      <AccessRolesSection />

      {/* Activity Timeline - Sidebar */}
      <div className="mt-8">
        <ActivityTimeline activities={activities} />
      </div>
    </div>
  )
}
