import { motion } from 'framer-motion'
import { Sprout, Calendar, TrendingUp, Plus, Filter } from 'lucide-react'
import QuickActions from '../../components/modules/QuickActions'
import KPITile from '../../components/modules/KPITile'
import ActivityTimeline from '../../components/modules/ActivityTimeline'
import CropRegistry from '../../components/crop/CropRegistry'
import CropCalendar from '../../components/crop/CropCalendar'
import YieldQuality from '../../components/crop/YieldQuality'
import FieldActivitiesLog from '../../components/crop/FieldActivitiesLog'
import PestDisease from '../../components/crop/PestDisease'
import CropAccessRoles from '../../components/crop/CropAccessRoles'
import { KPI, Activity } from '../../types'
import { mockCrops, mockCropTypes } from '../../mock/data'

const kpis: KPI[] = [
  { id: '1', label: 'Active Crops', value: String(mockCrops.length), change: 2, trend: 'up' },
  { id: '2', label: 'Crop Types', value: String(mockCropTypes.length), change: 0, trend: 'stable' },
  { id: '3', label: 'Avg Age', value: '4.2 years', change: 0.3, trend: 'up' },
]

const activities: Activity[] = [
  { id: '1', type: 'crop', description: 'New crop planted: Field A3', timestamp: new Date().toISOString(), user: 'Field Officer' },
  { id: '2', type: 'crop', description: 'Crop monitoring completed for Field B1', timestamp: new Date(Date.now() - 3600000).toISOString(), user: 'Superintendent' },
  { id: '3', type: 'crop', description: 'Yield recorded for Field A1', timestamp: new Date(Date.now() - 7200000).toISOString(), user: 'Field Officer' },
]

export default function CropModule() {
  const quickActions = [
    { id: '1', label: 'Add Crop', icon: Plus, onClick: () => console.log('Add crop') },
    { id: '2', label: 'View Calendar', icon: Calendar, onClick: () => console.log('View calendar') },
    { id: '3', label: 'Filter', icon: Filter, onClick: () => console.log('Filter') },
  ]

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">Crop Info</h1>
        <p className="text-gray-600 dark:text-gray-400">Crop lifecycle and agronomy records (the "agronomy master module")</p>
      </motion.div>

      <QuickActions actions={quickActions} />

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {kpis.map((kpi) => (
          <KPITile key={kpi.id} kpi={kpi} />
        ))}
      </div>

      {/* Crop Registry */}
      <CropRegistry />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Crop Calendar & Yield & Quality */}
        <div className="lg:col-span-2 space-y-6">
          <CropCalendar />
          <YieldQuality />
        </div>

        {/* Right Column - Field Activities, Pest/Disease, Access Roles, Activity Timeline */}
        <div className="space-y-6">
          <FieldActivitiesLog />
          <PestDisease />
          <CropAccessRoles />
          <ActivityTimeline activities={activities} />
        </div>
      </div>
    </div>
  )
}
