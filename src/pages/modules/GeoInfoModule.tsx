import { useState } from 'react'
import { motion } from 'framer-motion'
import { Map, Layers, TrendingUp } from 'lucide-react'
import QuickActions from '../../components/modules/QuickActions'
import KPITile from '../../components/modules/KPITile'
import ActivityTimeline from '../../components/modules/ActivityTimeline'
import EstateMapClient from '../../components/geo/EstateMapClient'
import LayerControl from '../../components/geo/LayerControl'
import FieldProfilePanel from '../../components/geo/FieldProfile'
import RoutePlanning from '../../components/geo/RoutePlanning'
import AccessRoles from '../../components/geo/AccessRoles'
import { KPI, Activity } from '../../types'
import { getAllFields, mockFieldBoundaries } from '../../mock/data'

const fields = getAllFields()
const totalArea = fields.reduce((sum, f) => sum + f.area, 0)

const kpis: KPI[] = [
  { id: '1', label: 'Total Fields', value: String(fields.length), change: 0, trend: 'stable' },
  { id: '2', label: 'Total Area', value: `${totalArea.toFixed(1)} ha`, change: 0, trend: 'stable' },
  { id: '3', label: 'GIS Layers', value: '6', change: 1, trend: 'up' },
]

const activities: Activity[] = [
  { id: '1', type: 'geo', description: 'Field boundary updated for Field A1', timestamp: new Date().toISOString(), user: 'GIS Officer' },
  { id: '2', type: 'geo', description: 'New route created: Spray Route A', timestamp: new Date(Date.now() - 3600000).toISOString(), user: 'Estate Manager' },
  { id: '3', type: 'geo', description: 'Soil zone mapped for Field B2', timestamp: new Date(Date.now() - 7200000).toISOString(), user: 'Field Officer' },
]

export default function GeoInfoModule() {
  const [selectedFieldId, setSelectedFieldId] = useState<string | null>(null)
  const [showLayers, setShowLayers] = useState({
    boundaries: true,
    roads: true,
    buildings: true,
    soil: false,
    forestry: false,
    restricted: false,
  })

  const quickActions = [
    { id: '1', label: 'Toggle Layers', icon: Layers, onClick: () => console.log('Toggle layers') },
    { id: '2', label: 'Export Map', icon: Map, onClick: () => console.log('Export map') },
    { id: '3', label: 'View Analytics', icon: TrendingUp, onClick: () => console.log('View analytics') },
  ]

  const handleLayerToggle = (layer: string) => {
    setShowLayers(prev => ({
      ...prev,
      [layer]: !prev[layer as keyof typeof prev],
    }))
  }

  const handleFieldClick = (fieldId: string) => {
    setSelectedFieldId(fieldId)
  }

  const handleCloseProfile = () => {
    setSelectedFieldId(null)
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">Geo Info</h1>
        <p className="text-gray-600 dark:text-gray-400">GIS-based plantation map + location-based decisions</p>
      </motion.div>

      <QuickActions actions={quickActions} />

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {kpis.map((kpi) => (
          <KPITile key={kpi.id} kpi={kpi} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Estate Map - Takes 3 columns */}
        <div className="lg:col-span-3">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-panel p-6"
          >
            <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Estate Map</h3>
            <EstateMapClient
              selectedFieldId={selectedFieldId}
              onFieldClick={handleFieldClick}
              showLayers={showLayers}
            />
            
            {/* Map Legend */}
            <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-500 rounded"></div>
                <span className="text-gray-600 dark:text-gray-400">Field Boundaries</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-orange-500 rounded"></div>
                <span className="text-gray-600 dark:text-gray-400">Roads</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
                <span className="text-gray-600 dark:text-gray-400">Buildings</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-red-500 rounded border-2 border-dashed"></div>
                <span className="text-gray-600 dark:text-gray-400">Restricted</span>
              </div>
            </div>
          </motion.div>

          {/* Route & Task Planning */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-6"
          >
            <RoutePlanning />
          </motion.div>
        </div>

        {/* Sidebar - Layer Control, Field Profile, Access Roles */}
        <div className="space-y-6">
          {/* Layer Control */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <LayerControl layers={showLayers} onToggle={handleLayerToggle} />
          </motion.div>

          {/* Field Profile (Click on map) */}
          {selectedFieldId && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <FieldProfilePanel fieldId={selectedFieldId} onClose={handleCloseProfile} />
            </motion.div>
          )}

          {/* Access & Operation Roles */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <AccessRoles />
          </motion.div>

          {/* Activity Timeline */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <ActivityTimeline activities={activities} />
          </motion.div>
        </div>
      </div>
    </div>
  )
}
