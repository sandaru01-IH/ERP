import { Droplet, Package, Wrench } from 'lucide-react'
import { mockRoutes } from '../../mock/data'

const routeIcons = {
  spray: Droplet,
  harvest: Package,
  plucking: Package,
}

const accessColors = {
  suitable: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400',
  limited: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400',
  unsuitable: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400',
}

export default function RoutePlanning() {
  return (
    <div className="glass-panel p-6">
      <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Route & Task Planning</h3>
      <div className="space-y-4">
        {/* Spray Routes */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Droplet className="w-5 h-5 text-primary-600 dark:text-primary-400" />
            <h4 className="font-semibold text-gray-900 dark:text-white">Spray Routes</h4>
          </div>
          <div className="space-y-2">
            {mockRoutes.filter(r => r.type === 'spray').map((route) => {
              const Icon = routeIcons[route.type]
              return (
                <div
                  key={route.id}
                  className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-700 transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Icon className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                      <span className="font-medium text-gray-900 dark:text-white">{route.name}</span>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-lg ${accessColors[route.machineryAccess]}`}>
                      {route.machineryAccess}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Fields: {route.fields.join(', ')}
                  </p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Harvest/Plucking Routes */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Package className="w-5 h-5 text-primary-600 dark:text-primary-400" />
            <h4 className="font-semibold text-gray-900 dark:text-white">Harvest / Plucking Route Grouping</h4>
          </div>
          <div className="space-y-2">
            {mockRoutes.filter(r => r.type === 'harvest' || r.type === 'plucking').map((route) => {
              const Icon = routeIcons[route.type]
              return (
                <div
                  key={route.id}
                  className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-700 transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Icon className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                      <span className="font-medium text-gray-900 dark:text-white">{route.name}</span>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-lg ${accessColors[route.machineryAccess]}`}>
                      {route.machineryAccess}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Fields: {route.fields.join(', ')}
                  </p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Machinery Access Suitability */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Wrench className="w-5 h-5 text-primary-600 dark:text-primary-400" />
            <h4 className="font-semibold text-gray-900 dark:text-white">Machinery Access Suitability</h4>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div className="p-3 rounded-xl bg-green-50 dark:bg-green-900/20 text-center">
              <p className="text-2xl font-bold text-green-700 dark:text-green-400">
                {mockRoutes.filter(r => r.machineryAccess === 'suitable').length}
              </p>
              <p className="text-xs text-green-700 dark:text-green-400 mt-1">Suitable</p>
            </div>
            <div className="p-3 rounded-xl bg-yellow-50 dark:bg-yellow-900/20 text-center">
              <p className="text-2xl font-bold text-yellow-700 dark:text-yellow-400">
                {mockRoutes.filter(r => r.machineryAccess === 'limited').length}
              </p>
              <p className="text-xs text-yellow-700 dark:text-yellow-400 mt-1">Limited</p>
            </div>
            <div className="p-3 rounded-xl bg-red-50 dark:bg-red-900/20 text-center">
              <p className="text-2xl font-bold text-red-700 dark:text-red-400">
                {mockRoutes.filter(r => r.machineryAccess === 'unsuitable').length}
              </p>
              <p className="text-xs text-red-700 dark:text-red-400 mt-1">Unsuitable</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
