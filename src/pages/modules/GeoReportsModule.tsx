import { motion } from 'framer-motion'
import { Droplet, Plus, Shield, FileText } from 'lucide-react'
import QuickActions from '../../components/modules/QuickActions'
import KPITile from '../../components/modules/KPITile'
import ActivityTimeline from '../../components/modules/ActivityTimeline'
import SprayProgram from '../../components/spraying/SprayProgram'
import WeedingProgram from '../../components/spraying/WeedingProgram'
import ChemicalStore from '../../components/spraying/ChemicalStore'
import ApplicationCapture from '../../components/spraying/ApplicationCapture'
import SafetyCompliance from '../../components/spraying/SafetyCompliance'
import SprayingWeedingAccessRoles from '../../components/spraying/SprayingWeedingAccessRoles'
import { KPI, Activity as ActivityType } from '../../types'
import {
  mockSprayPrograms,
  mockWeedingPrograms,
  mockChemicalStoreItems,
  mockApplicationCaptures,
  mockIncidentReports,
} from '../../mock/data'

const kpis: KPI[] = [
  {
    id: '1',
    label: 'Active Spray Programs',
    value: String(mockSprayPrograms.filter((p) => p.status === 'planned').length),
    change: 1,
    trend: 'up',
  },
  {
    id: '2',
    label: 'Chemical Items',
    value: String(mockChemicalStoreItems.length),
    change: 0,
    trend: 'stable',
  },
  {
    id: '3',
    label: 'Active Incidents',
    value: String(mockIncidentReports.filter((i) => i.status !== 'resolved' && i.status !== 'closed').length),
    change: 0,
    trend: 'stable',
  },
]

const activities: ActivityType[] = [
  {
    id: '1',
    type: 'spray',
    description: 'Spray application completed in Field 1',
    timestamp: new Date().toISOString(),
    user: 'Spray Officer A',
  },
  {
    id: '2',
    type: 'weeding',
    description: 'Weeding program started in Field 2',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    user: 'Superintendent B',
  },
  {
    id: '3',
    type: 'safety',
    description: 'Incident report submitted',
    timestamp: new Date(Date.now() - 7200000).toISOString(),
    user: 'Operator C',
  },
]

export default function GeoReportsModule() {
  const quickActions = [
    { id: '1', label: 'New Program', icon: Plus, onClick: () => console.log('New program') },
    { id: '2', label: 'Safety Check', icon: Shield, onClick: () => console.log('Safety check') },
    { id: '3', label: 'View Reports', icon: FileText, onClick: () => console.log('View reports') },
  ]

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">Spraying / Weeding</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Chemical safety + spray program + weeding program + compliance
        </p>
      </motion.div>

      <QuickActions actions={quickActions} />

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {kpis.map((kpi) => (
          <KPITile key={kpi.id} kpi={kpi} />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          <SprayProgram />
          <WeedingProgram />
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <ChemicalStore />
          <SprayingWeedingAccessRoles />
          <ActivityTimeline activities={activities} />
        </div>
      </div>

      {/* Application Capture (Full Width) */}
      <ApplicationCapture />

      {/* Safety & Compliance (Full Width) */}
      <SafetyCompliance />
    </div>
  )
}
