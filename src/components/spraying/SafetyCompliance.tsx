import { motion } from 'framer-motion'
import { Shield, AlertTriangle, Calendar, MapPin, CheckCircle, Clock, FileText, Link as LinkIcon } from 'lucide-react'
import { REIPHITracking, IncidentReport, NoSprayZone } from '../../types'
import { mockREIPHITracking, mockIncidentReports, mockNoSprayZones, getAllFields } from '../../mock/data'
import { format } from 'date-fns'

export default function SafetyCompliance() {
  const fields = getAllFields()

  const getFieldName = (fieldId?: string) => {
    if (!fieldId) return 'N/A'
    const field = fields.find((f) => f.id === fieldId)
    return field?.name || `Field ${fieldId}`
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800'
      case 'high':
        return 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 border-orange-200 dark:border-orange-800'
      case 'medium':
        return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800'
      case 'low':
        return 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800'
      default:
        return 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'resolved':
      case 'closed':
        return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
      case 'under_investigation':
        return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400'
      case 'reported':
        return 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
      case 'active':
        return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
      case 'expired':
        return 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400'
      default:
        return 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400'
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'water_body':
        return 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
      case 'residential':
        return 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400'
      case 'protected_area':
        return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
      default:
        return 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400'
    }
  }

  return (
    <div className="space-y-6">
      {/* REI/PHI Tracking */}
      <div className="glass-panel p-6">
        <div className="flex items-center gap-3 mb-4">
          <Calendar className="w-6 h-6 text-primary-600 dark:text-primary-400" />
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">REI / PHI Tracking</h3>
        </div>
        <div className="space-y-4">
          {mockREIPHITracking.map((tracking) => (
            <motion.div
              key={tracking.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-700 transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">{tracking.chemical}</p>
                  <div className="flex items-center gap-2 mt-1 text-sm text-gray-600 dark:text-gray-400">
                    <MapPin className="w-4 h-4" />
                    <span>{getFieldName(tracking.fieldId)}</span>
                  </div>
                </div>
                <span
                  className={`px-2 py-1 rounded-lg text-xs font-medium capitalize ${getStatusColor(tracking.status)}`}
                >
                  {tracking.status}
                </span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm mb-3">
                <div>
                  <div className="text-gray-600 dark:text-gray-400 mb-1 text-xs">Application Date</div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {format(new Date(tracking.applicationDate), 'MMM d, yyyy')}
                  </p>
                </div>
                <div>
                  <div className="text-gray-600 dark:text-gray-400 mb-1 text-xs">Re-entry Interval</div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {tracking.reEntryInterval} {tracking.reEntryIntervalUnit}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500">
                    Allowed: {format(new Date(tracking.reEntryAllowedDate), 'MMM d, yyyy')}
                  </p>
                </div>
                <div>
                  <div className="text-gray-600 dark:text-gray-400 mb-1 text-xs">Pre-harvest Interval</div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {tracking.preHarvestInterval} {tracking.preHarvestIntervalUnit}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500">
                    Allowed: {format(new Date(tracking.harvestAllowedDate), 'MMM d, yyyy')}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* No-Spray Zones */}
      <div className="glass-panel p-6">
        <div className="flex items-center gap-3 mb-4">
          <MapPin className="w-6 h-6 text-primary-600 dark:text-primary-400" />
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">No-Spray Zones (from Geo)</h3>
        </div>
        <div className="space-y-4">
          {mockNoSprayZones.map((zone) => (
            <motion.div
              key={zone.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-700 transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className={`px-2 py-1 rounded-lg text-xs font-medium capitalize ${getTypeColor(zone.type)}`}
                    >
                      {zone.type.replace('_', ' ')}
                    </span>
                    {zone.geoLinked && (
                      <div className="flex items-center gap-1 text-xs text-primary-600 dark:text-primary-400">
                        <LinkIcon className="w-3 h-3" />
                        <span>Geo Linked</span>
                      </div>
                    )}
                  </div>
                  <p className="font-semibold text-gray-900 dark:text-white">{zone.name}</p>
                  {zone.fieldId && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {getFieldName(zone.fieldId)}
                    </p>
                  )}
                </div>
              </div>
              <div className="text-sm">
                <span className="text-gray-600 dark:text-gray-400">Buffer: </span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {zone.bufferDistance} {zone.bufferUnit}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Incident Reporting */}
      <div className="glass-panel p-6">
        <div className="flex items-center gap-3 mb-4">
          <AlertTriangle className="w-6 h-6 text-primary-600 dark:text-primary-400" />
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">Incident Reporting</h3>
        </div>
        <div className="space-y-4">
          {mockIncidentReports.map((incident) => (
            <motion.div
              key={incident.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-4 rounded-xl border ${getSeverityColor(incident.severity)}`}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className={`px-2 py-1 rounded-lg text-xs font-medium capitalize ${getSeverityColor(incident.severity)}`}
                    >
                      {incident.severity}
                    </span>
                    <span className="text-xs text-gray-600 dark:text-gray-400 capitalize">
                      {incident.type.replace('_', ' ')}
                    </span>
                  </div>
                  <p className="font-semibold text-gray-900 dark:text-white">{incident.description}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Location: {incident.location}
                    {incident.fieldId && ` • ${getFieldName(incident.fieldId)}`}
                  </p>
                </div>
                <span
                  className={`px-2 py-1 rounded-lg text-xs font-medium capitalize ${getStatusColor(incident.status)}`}
                >
                  {incident.status.replace('_', ' ')}
                </span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm mb-3">
                <div>
                  <div className="text-gray-600 dark:text-gray-400 mb-1 text-xs">Date</div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {format(new Date(incident.date), 'MMM d, yyyy')}
                  </p>
                </div>
                <div>
                  <div className="text-gray-600 dark:text-gray-400 mb-1 text-xs">Reported By</div>
                  <p className="font-medium text-gray-900 dark:text-white">{incident.reportedBy}</p>
                </div>
              </div>

              {incident.actionsTaken && (
                <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Actions Taken:</p>
                  <p className="text-sm text-gray-900 dark:text-white">{incident.actionsTaken}</p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
