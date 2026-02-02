import { motion } from 'framer-motion'
import { Droplet, Plus, Calendar, Package, ClipboardCheck, DollarSign } from 'lucide-react'
import QuickActions from '../../components/modules/QuickActions'
import KPITile from '../../components/modules/KPITile'
import ActivityTimeline from '../../components/modules/ActivityTimeline'
import FertilizerProgram from '../../components/fertilizer/FertilizerProgram'
import RequisitionsStock from '../../components/fertilizer/RequisitionsStock'
import ApplicationCapture from '../../components/fertilizer/ApplicationCapture'
import CostingAudit from '../../components/fertilizer/CostingAudit'
import FertilizerAccessRoles from '../../components/fertilizer/FertilizerAccessRoles'
import { KPI, Activity } from '../../types'
import {
  mockFertilizerPrograms,
  mockFertilizerRequisitions,
  mockFertilizerApplications,
  mockFertilizerCosting,
} from '../../mock/data'

const kpis: KPI[] = [
  {
    id: '1',
    label: 'Active Programs',
    value: String(mockFertilizerPrograms.filter(p => p.status === 'planned').length),
    change: 0,
    trend: 'stable',
  },
  {
    id: '2',
    label: 'Pending Requisitions',
    value: String(mockFertilizerRequisitions.filter(r => r.status === 'pending').length),
    change: 1,
    trend: 'up',
  },
  {
    id: '3',
    label: 'Total Applications',
    value: String(mockFertilizerApplications.length),
    change: 2,
    trend: 'up',
  },
]

const activities: Activity[] = [
  {
    id: '1',
    type: 'fertilizer',
    description: 'Fertilizer application completed: Field A1',
    timestamp: new Date().toISOString(),
    user: 'Supervisor A',
  },
  {
    id: '2',
    type: 'fertilizer',
    description: 'New requisition approved: NPK 15-15-15',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    user: 'Estate Manager',
  },
  {
    id: '3',
    type: 'fertilizer',
    description: 'Fertilizer program created: Round 2 for Field B2',
    timestamp: new Date(Date.now() - 7200000).toISOString(),
    user: 'Agronomy Officer',
  },
]

export default function FertilizerModule() {
  const quickActions = [
    { id: '1', label: 'New Program', icon: Plus, onClick: () => console.log('New program') },
    { id: '2', label: 'Request Stock', icon: Package, onClick: () => console.log('Request stock') },
    { id: '3', label: 'Record Application', icon: ClipboardCheck, onClick: () => console.log('Record application') },
  ]

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">Fertilizer</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Plan, issue, apply, and track fertilizer by field and cost
        </p>
      </motion.div>

      <QuickActions actions={quickActions} />

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {kpis.map((kpi) => (
          <KPITile key={kpi.id} kpi={kpi} />
        ))}
      </div>

      {/* Fertilizer Program */}
      <FertilizerProgram />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          <RequisitionsStock />
          <ApplicationCapture />
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <CostingAudit />
          <FertilizerAccessRoles />
          <ActivityTimeline activities={activities} />
        </div>
      </div>
    </div>
  )
}
