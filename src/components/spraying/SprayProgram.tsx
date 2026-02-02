import { motion } from 'framer-motion'
import { Droplet, Bug, Calendar, CheckCircle, Clock, XCircle, MapPin } from 'lucide-react'
import { SprayProgram } from '../../types'
import { mockSprayPrograms, getAllFields } from '../../mock/data'
import { format } from 'date-fns'

export default function SprayProgramComponent() {
  const fields = getAllFields()

  const getFieldName = (fieldId: string) => {
    const field = fields.find((f) => f.id === fieldId)
    return field?.name || `Field ${fieldId}`
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'applied':
        return CheckCircle
      case 'planned':
        return Clock
      case 'skipped':
        return XCircle
      default:
        return Clock
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'applied':
        return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
      case 'planned':
        return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400'
      case 'skipped':
        return 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
      default:
        return 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400'
    }
  }

  return (
    <div className="glass-panel p-6">
      <div className="flex items-center gap-3 mb-4">
        <Droplet className="w-6 h-6 text-primary-600 dark:text-primary-400" />
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">Spray Program</h3>
      </div>

      <div className="space-y-4">
        {mockSprayPrograms.map((program) => {
          const StatusIcon = getStatusIcon(program.status)
          return (
            <motion.div
              key={program.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-700 transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Bug className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {program.targetPestWeed}
                    </p>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{program.chemical}</p>
                  <div className="flex items-center gap-2 mt-1 text-sm text-gray-600 dark:text-gray-400">
                    <MapPin className="w-4 h-4" />
                    <span>{getFieldName(program.fieldId)}</span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <StatusIcon className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                  <span
                    className={`px-2 py-1 rounded-lg text-xs font-medium capitalize ${getStatusColor(program.status)}`}
                  >
                    {program.status}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm mb-3">
                <div>
                  <div className="text-gray-600 dark:text-gray-400 mb-1 text-xs">Dose</div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {program.dose} {program.doseUnit}
                  </p>
                </div>
                <div>
                  <div className="text-gray-600 dark:text-gray-400 mb-1 text-xs">Frequency</div>
                  <p className="font-medium text-gray-900 dark:text-white">{program.frequency}</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-1 text-xs">
                    <Calendar className="w-4 h-4" />
                    <span>Scheduled</span>
                  </div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {format(new Date(program.scheduledDate), 'MMM d, yyyy')}
                  </p>
                </div>
                {program.appliedDate && (
                  <div>
                    <div className="text-gray-600 dark:text-gray-400 mb-1 text-xs">Applied</div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {format(new Date(program.appliedDate), 'MMM d, yyyy')}
                    </p>
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                <div className="text-xs text-gray-600 dark:text-gray-400 mb-2">Compliance:</div>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs px-2 py-1 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400">
                    REI: {program.compliance.reEntryInterval}h
                  </span>
                  <span className="text-xs px-2 py-1 rounded-lg bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400">
                    PHI: {program.compliance.preHarvestInterval} days
                  </span>
                  <span className="text-xs px-2 py-1 rounded-lg bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400">
                    PPE: {program.compliance.ppeRequired.join(', ')}
                  </span>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
