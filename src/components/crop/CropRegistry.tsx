import { motion } from 'framer-motion'
import { Sprout, Calendar, Users, RefreshCw } from 'lucide-react'
import { Crop } from '../../types'
import { mockCrops } from '../../mock/data'
import { format } from 'date-fns'

export default function CropRegistry() {
  return (
    <div className="glass-panel p-6">
      <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Crop Registry</h3>
      <div className="space-y-4">
        {mockCrops.map((crop) => (
          <motion.div
            key={crop.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-700 transition-colors"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <Sprout className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">{crop.type}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {crop.variety} {crop.clone && `(${crop.clone})`}
                  </p>
                </div>
              </div>
              <span className={`px-2 py-1 rounded-lg text-xs font-medium ${
                crop.ageClass === 'Young' 
                  ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                  : 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
              }`}>
                {crop.ageClass || 'N/A'}
              </span>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
              <div>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-1">
                  <Calendar className="w-4 h-4" />
                  <span className="text-xs">Planting Date</span>
                </div>
                <p className="font-medium text-gray-900 dark:text-white">
                  {format(new Date(crop.plantingDate), 'MMM d, yyyy')}
                </p>
              </div>
              <div>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-1">
                  <span className="text-xs">Age</span>
                </div>
                <p className="font-medium text-gray-900 dark:text-white">{crop.age} years</p>
              </div>
              <div>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-1">
                  <Users className="w-4 h-4" />
                  <span className="text-xs">Population</span>
                </div>
                <p className="font-medium text-gray-900 dark:text-white">
                  {crop.plantPopulation?.toLocaleString() || 'N/A'}
                </p>
              </div>
              <div>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-1">
                  <RefreshCw className="w-4 h-4" />
                  <span className="text-xs">Cycle</span>
                </div>
                <p className="font-medium text-gray-900 dark:text-white">{crop.plantingCycle}</p>
              </div>
            </div>

            {/* Infill & Replant History */}
            {(crop.infillHistory && crop.infillHistory.length > 0) || (crop.replantHistory && crop.replantHistory.length > 0) ? (
              <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                <div className="grid grid-cols-2 gap-3 text-xs">
                  {crop.infillHistory && crop.infillHistory.length > 0 && (
                    <div>
                      <p className="text-gray-600 dark:text-gray-400 mb-1">Infill History</p>
                      {crop.infillHistory.map((infill) => (
                        <p key={infill.id} className="text-gray-900 dark:text-white">
                          {infill.quantity} plants • {format(new Date(infill.date), 'MMM d, yyyy')}
                        </p>
                      ))}
                    </div>
                  )}
                  {crop.replantHistory && crop.replantHistory.length > 0 && (
                    <div>
                      <p className="text-gray-600 dark:text-gray-400 mb-1">Replant History</p>
                      {crop.replantHistory.map((replant) => (
                        <p key={replant.id} className="text-gray-900 dark:text-white">
                          {replant.area} ha • {format(new Date(replant.date), 'MMM d, yyyy')}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ) : null}
          </motion.div>
        ))}
      </div>
    </div>
  )
}
