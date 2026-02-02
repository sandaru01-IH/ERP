import { motion } from 'framer-motion'
import { Wrench, Tractor, Droplet, Hammer, Car, Package } from 'lucide-react'
import { Asset } from '../../types'
import { mockAssets } from '../../mock/data'

export default function AssetRegistry() {
  const getCategoryIcon = (category: string) => {
    const categoryLower = category.toLowerCase()
    if (categoryLower.includes('tractor')) return Tractor
    if (categoryLower.includes('sprayer')) return Droplet
    if (categoryLower.includes('excavator')) return Hammer
    if (categoryLower.includes('vehicle')) return Car
    if (categoryLower.includes('tool')) return Package
    return Wrench
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
      case 'maintenance':
        return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400'
      case 'retired':
        return 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400'
      default:
        return 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400'
    }
  }

  // Group assets by category
  const groupedAssets: { [key: string]: Asset[] } = {}
  mockAssets.forEach((asset) => {
    if (!groupedAssets[asset.category]) {
      groupedAssets[asset.category] = []
    }
    groupedAssets[asset.category].push(asset)
  })

  return (
    <div className="glass-panel p-6">
      <div className="flex items-center gap-3 mb-4">
        <Wrench className="w-6 h-6 text-primary-600 dark:text-primary-400" />
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">Asset Registry</h3>
      </div>

      <div className="space-y-6">
        {Object.entries(groupedAssets).map(([category, assets]) => {
          const CategoryIcon = getCategoryIcon(category)
          return (
            <div key={category}>
              <div className="flex items-center gap-2 mb-3">
                <CategoryIcon className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                <h4 className="font-semibold text-gray-900 dark:text-white">{category}</h4>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  ({assets.length})
                </span>
              </div>
              <div className="space-y-2">
                {assets.map((asset) => (
                  <motion.div
                    key={asset.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-700 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{asset.name}</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400 capitalize">
                          {asset.type}
                        </p>
                      </div>
                      <span className={`px-2 py-1 rounded-lg text-xs font-medium capitalize ${getStatusColor(asset.status)}`}>
                        {asset.status}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
