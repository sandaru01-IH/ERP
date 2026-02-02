import { motion } from 'framer-motion'
import { Package, TrendingUp, DollarSign, ArrowRight, ShoppingCart } from 'lucide-react'
import { TimberFirewoodStock, TimberFirewoodIssue, TimberFirewoodSale } from '../../types'
import {
  mockTimberFirewoodStock,
  mockTimberFirewoodIssues,
  mockTimberFirewoodSales,
} from '../../mock/data'
import { format } from 'date-fns'

export default function TimberFirewoodHandling() {
  const getStockItem = (stockId: string) => {
    return mockTimberFirewoodStock.find((s) => s.id === stockId)
  }

  const getTypeColor = (type: string) => {
    return type === 'timber'
      ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
      : 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400'
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in_stock':
        return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
      case 'issued':
        return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400'
      case 'sold':
        return 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
      default:
        return 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400'
    }
  }

  return (
    <div className="space-y-6">
      {/* Stock */}
      <div className="glass-panel p-6">
        <div className="flex items-center gap-3 mb-4">
          <Package className="w-6 h-6 text-primary-600 dark:text-primary-400" />
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">Stock</h3>
        </div>
        <div className="space-y-4">
          {mockTimberFirewoodStock.map((stock) => (
            <motion.div
              key={stock.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-700 transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className={`px-2 py-1 rounded-lg text-xs font-medium capitalize ${getTypeColor(stock.type)}`}
                    >
                      {stock.type}
                    </span>
                  </div>
                  <p className="font-semibold text-gray-900 dark:text-white">{stock.species}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{stock.location}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-primary-600 dark:text-primary-400">
                    {stock.quantity} {stock.unit}
                  </p>
                  <span
                    className={`px-2 py-1 rounded-lg text-xs font-medium capitalize ${getStatusColor(stock.status)}`}
                  >
                    {stock.status.replace('_', ' ')}
                  </span>
                </div>
              </div>
              {stock.source && (
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Source: {stock.source} • {format(new Date(stock.dateReceived), 'MMM d, yyyy')}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Issues */}
      <div className="glass-panel p-6">
        <div className="flex items-center gap-3 mb-4">
          <ArrowRight className="w-6 h-6 text-primary-600 dark:text-primary-400" />
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">Issues</h3>
        </div>
        <div className="space-y-4">
          {mockTimberFirewoodIssues.map((issue) => {
            const stock = getStockItem(issue.stockId)
            return (
              <motion.div
                key={issue.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-700 transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {stock?.species || `Stock ${issue.stockId}`}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Issued to: {issue.issuedTo}
                    </p>
                  </div>
                  <p className="text-lg font-bold text-primary-600 dark:text-primary-400">
                    {issue.quantity} {issue.unit}
                  </p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
                  <div>
                    <div className="text-gray-600 dark:text-gray-400 mb-1 text-xs">Purpose</div>
                    <p className="font-medium text-gray-900 dark:text-white">{issue.purpose}</p>
                  </div>
                  <div>
                    <div className="text-gray-600 dark:text-gray-400 mb-1 text-xs">Issued Date</div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {format(new Date(issue.issuedDate), 'MMM d, yyyy')}
                    </p>
                  </div>
                  <div>
                    <div className="text-gray-600 dark:text-gray-400 mb-1 text-xs">Issued By</div>
                    <p className="font-medium text-gray-900 dark:text-white">{issue.issuedBy}</p>
                  </div>
                </div>
                {issue.notes && (
                  <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-sm text-gray-700 dark:text-gray-300">{issue.notes}</p>
                  </div>
                )}
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Sales */}
      {mockTimberFirewoodSales.length > 0 && (
        <div className="glass-panel p-6">
          <div className="flex items-center gap-3 mb-4">
            <ShoppingCart className="w-6 h-6 text-primary-600 dark:text-primary-400" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Sales</h3>
          </div>
          <div className="space-y-4">
            {mockTimberFirewoodSales.map((sale) => {
              const stock = getStockItem(sale.stockId)
              return (
                <motion.div
                  key={sale.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-700 transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {stock?.species || `Stock ${sale.stockId}`}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Buyer: {sale.buyer}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-green-600 dark:text-green-400" />
                        <p className="text-lg font-bold text-green-600 dark:text-green-400">
                          LKR {sale.price.toLocaleString()}
                        </p>
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {sale.quantity} {sale.unit}
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
                    <div>
                      <div className="text-gray-600 dark:text-gray-400 mb-1 text-xs">Sale Date</div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {format(new Date(sale.saleDate), 'MMM d, yyyy')}
                      </p>
                    </div>
                    {sale.invoiceNumber && (
                      <div>
                        <div className="text-gray-600 dark:text-gray-400 mb-1 text-xs">Invoice</div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {sale.invoiceNumber}
                        </p>
                      </div>
                    )}
                  </div>
                  {sale.notes && (
                    <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                      <p className="text-sm text-gray-700 dark:text-gray-300">{sale.notes}</p>
                    </div>
                  )}
                </motion.div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
