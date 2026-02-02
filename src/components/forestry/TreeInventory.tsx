import { motion } from 'framer-motion'
import { Trees, MapPin, TrendingUp } from 'lucide-react'
import { TreeInventory as TreeInventoryType } from '../../types'
import { mockTreeInventory, getAllFields } from '../../mock/data'
import { format } from 'date-fns'

export default function TreeInventory() {
  const fields = getAllFields()

  const getFieldName = (fieldId: string) => {
    const field = fields.find((f) => f.id === fieldId)
    return field?.name || `Field ${fieldId}`
  }

  return (
    <div className="glass-panel p-6">
      <div className="flex items-center gap-3 mb-4">
        <Trees className="w-6 h-6 text-primary-600 dark:text-primary-400" />
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">Tree Inventory</h3>
      </div>

      <div className="space-y-4">
        {mockTreeInventory.map((inventory) => (
          <motion.div
            key={inventory.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-700 transition-colors"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">{inventory.species}</p>
                <div className="flex items-center gap-2 mt-1 text-sm text-gray-600 dark:text-gray-400">
                  <MapPin className="w-4 h-4" />
                  <span>{getFieldName(inventory.fieldId)}</span>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                  <p className="text-lg font-bold text-primary-600 dark:text-primary-400">
                    {inventory.density}
                  </p>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400">{inventory.unit}</p>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">
                Last updated: {format(new Date(inventory.lastUpdated), 'MMM d, yyyy')}
              </span>
            </div>

            {inventory.notes && (
              <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-700 dark:text-gray-300">{inventory.notes}</p>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  )
}
