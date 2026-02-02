import { motion } from 'framer-motion'
import { Eye, Plus, Search, Map, TestTube, Lightbulb, AlertCircle } from 'lucide-react'
import QuickActions from '../../components/modules/QuickActions'
import KPITile from '../../components/modules/KPITile'
import ActivityTimeline from '../../components/modules/ActivityTimeline'
import ScoutingInspection from '../../components/monitoring/ScoutingInspection'
import NDVIDroneSatellite from '../../components/monitoring/NDVIDroneSatellite'
import SoilLeafTests from '../../components/monitoring/SoilLeafTests'
import Recommendations from '../../components/monitoring/Recommendations'
import IssueTracking from '../../components/monitoring/IssueTracking'
import CropMonitoringAccessRoles from '../../components/monitoring/CropMonitoringAccessRoles'
import { KPI, Activity } from '../../types'
import {
  mockScoutingObservations,
  mockHealthIndexMaps,
  mockSoilLeafTests,
  mockMonitoringRecommendations,
  mockMonitoringIssues,
} from '../../mock/data'

const kpis: KPI[] = [
  {
    id: '1',
    label: 'Active Observations',
    value: String(mockScoutingObservations.length),
    change: 2,
    trend: 'up',
  },
  {
    id: '2',
    label: 'Pending Recommendations',
    value: String(mockMonitoringRecommendations.filter(r => r.status === 'pending').length),
    change: 1,
    trend: 'up',
  },
  {
    id: '3',
    label: 'Open Issues',
    value: String(mockMonitoringIssues.filter(i => i.status !== 'verified' && i.status !== 'completed').length),
    change: -1,
    trend: 'down',
  },
]

const activities: Activity[] = [
  {
    id: '1',
    type: 'monitoring',
    description: 'New scouting observation: Weed pressure in Field A1',
    timestamp: new Date().toISOString(),
    user: 'Field Officer A',
  },
  {
    id: '2',
    type: 'monitoring',
    description: 'Health index map updated: Field B2 (NDVI)',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    user: 'GIS Officer',
  },
  {
    id: '3',
    type: 'monitoring',
    description: 'Recommendation approved: Spray application for Field C3',
    timestamp: new Date(Date.now() - 7200000).toISOString(),
    user: 'Estate Manager',
  },
]

export default function CropMonitoringModule() {
  const quickActions = [
    { id: '1', label: 'New Observation', icon: Plus, onClick: () => console.log('New observation') },
    { id: '2', label: 'View Health Maps', icon: Map, onClick: () => console.log('View maps') },
    { id: '3', label: 'Schedule Test', icon: TestTube, onClick: () => console.log('Schedule test') },
  ]

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">Crop Monitoring Info</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Scouting + sensors + inspection + recommendations (early warning)
        </p>
      </motion.div>

      <QuickActions actions={quickActions} />

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {kpis.map((kpi) => (
          <KPITile key={kpi.id} kpi={kpi} />
        ))}
      </div>

      {/* Scouting & Inspection */}
      <ScoutingInspection />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          <NDVIDroneSatellite />
          <SoilLeafTests />
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <Recommendations />
          <IssueTracking />
          <CropMonitoringAccessRoles />
          <ActivityTimeline activities={activities} />
        </div>
      </div>
    </div>
  )
}
