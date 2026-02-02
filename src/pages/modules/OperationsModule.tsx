import { motion } from 'framer-motion'
import { Trees, Plus, FileText, Shield } from 'lucide-react'
import QuickActions from '../../components/modules/QuickActions'
import KPITile from '../../components/modules/KPITile'
import ActivityTimeline from '../../components/modules/ActivityTimeline'
import TreeInventory from '../../components/forestry/TreeInventory'
import HarvestPruningPermits from '../../components/forestry/HarvestPruningPermits'
import ConservationAreas from '../../components/forestry/ConservationAreas'
import TimberFirewoodHandling from '../../components/forestry/TimberFirewoodHandling'
import ErosionDrainageProjects from '../../components/forestry/ErosionDrainageProjects'
import ForestryAccessRoles from '../../components/forestry/ForestryAccessRoles'
import { KPI, Activity as ActivityType } from '../../types'
import {
  mockTreeInventory,
  mockHarvestPruningPermits,
  mockConservationAreas,
  mockErosionDrainageProjects,
} from '../../mock/data'

const kpis: KPI[] = [
  {
    id: '1',
    label: 'Tree Species',
    value: String(mockTreeInventory.length),
    change: 0,
    trend: 'stable',
  },
  {
    id: '2',
    label: 'Active Permits',
    value: String(mockHarvestPruningPermits.filter((p) => p.status === 'pending' || p.status === 'approved').length),
    change: 1,
    trend: 'up',
  },
  {
    id: '3',
    label: 'Conservation Areas',
    value: String(mockConservationAreas.length),
    change: 0,
    trend: 'stable',
  },
]

const activities: ActivityType[] = [
  {
    id: '1',
    type: 'forestry',
    description: 'Harvest permit approved for Field 1',
    timestamp: new Date().toISOString(),
    user: 'Estate Manager',
  },
  {
    id: '2',
    type: 'forestry',
    description: 'Tree inventory updated for Field 2',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    user: 'Forestry Officer',
  },
  {
    id: '3',
    type: 'forestry',
    description: 'Erosion project completed in Field A1',
    timestamp: new Date(Date.now() - 7200000).toISOString(),
    user: 'Superintendent',
  },
]

export default function OperationsModule() {
  const quickActions = [
    { id: '1', label: 'New Permit', icon: FileText, onClick: () => console.log('New permit') },
    { id: '2', label: 'Add Inventory', icon: Trees, onClick: () => console.log('Add inventory') },
    { id: '3', label: 'View Roles', icon: Shield, onClick: () => console.log('View roles') },
  ]

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">Forestry</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Shade tree management + timber + conservation + compliance zones
        </p>
      </motion.div>

      <QuickActions actions={quickActions} />

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {kpis.map((kpi) => (
          <KPITile key={kpi.id} kpi={kpi} />
        ))}
      </div>

      {/* Tree Inventory */}
      <TreeInventory />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          <HarvestPruningPermits />
          <ConservationAreas />
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <TimberFirewoodHandling />
          <ForestryAccessRoles />
          <ActivityTimeline activities={activities} />
        </div>
      </div>

      {/* Erosion/Drainage Projects (Full Width) */}
      <ErosionDrainageProjects />
    </div>
  )
}
