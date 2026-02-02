import { motion } from 'framer-motion'
import { Package, ShoppingCart, Warehouse, Clipboard, CheckCircle, Clock, XCircle } from 'lucide-react'
import { FertilizerRequisition } from '../../types'
import { mockFertilizerRequisitions } from '../../mock/data'
import { format } from 'date-fns'

export default function RequisitionsStock() {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'central_store':
        return Warehouse
      case 'supplier':
        return ShoppingCart
      case 'division_store':
        return Package
      case 'field':
        return Clipboard
      default:
        return Package
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'central_store':
        return 'Central Store'
      case 'supplier':
        return 'Supplier'
      case 'division_store':
        return 'Division Store'
      case 'field':
        return 'Field (Job Ticket)'
      default:
        return type
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
      case 'issued':
        return CheckCircle
      case 'pending':
        return Clock
      case 'rejected':
        return XCircle
      default:
        return Clock
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
      case 'issued':
        return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
      case 'pending':
        return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400'
      case 'rejected':
        return 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
      default:
        return 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400'
    }
  }

  return (
    <div className="glass-panel p-6">
      <div className="flex items-center gap-3 mb-4">
        <Package className="w-6 h-6 text-primary-600 dark:text-primary-400" />
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">Requisitions & Stock</h3>
      </div>

      <div className="space-y-4">
        {mockFertilizerRequisitions.map((req) => {
          const TypeIcon = getTypeIcon(req.type)
          const StatusIcon = getStatusIcon(req.status)
          return (
            <motion.div
              key={req.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-700 transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <TypeIcon className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">{req.product}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {getTypeLabel(req.type)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <StatusIcon className={`w-4 h-4 ${getStatusColor(req.status).split(' ')[1]}`} />
                  <span className={`px-2 py-1 rounded-lg text-xs font-medium ${getStatusColor(req.status)}`}>
                    {req.status}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm mb-3">
                <div>
                  <div className="text-gray-600 dark:text-gray-400 mb-1 text-xs">Quantity</div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {req.quantity} {req.unit}
                  </p>
                </div>
                <div>
                  <div className="text-gray-600 dark:text-gray-400 mb-1 text-xs">Requested By</div>
                  <p className="font-medium text-gray-900 dark:text-white">{req.requestedBy}</p>
                </div>
                <div>
                  <div className="text-gray-600 dark:text-gray-400 mb-1 text-xs">Requested Date</div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {format(new Date(req.requestedDate), 'MMM d, yyyy')}
                  </p>
                </div>
                {req.issuedDate && (
                  <div>
                    <div className="text-gray-600 dark:text-gray-400 mb-1 text-xs">Issued Date</div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {format(new Date(req.issuedDate), 'MMM d, yyyy')}
                    </p>
                  </div>
                )}
              </div>

              {(req.issuedTo || req.batchNumber || req.jobTicketId) && (
                <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
                    {req.issuedTo && (
                      <div>
                        <span className="text-gray-600 dark:text-gray-400 text-xs">Issued To: </span>
                        <span className="font-medium text-gray-900 dark:text-white">{req.issuedTo}</span>
                      </div>
                    )}
                    {req.batchNumber && (
                      <div>
                        <span className="text-gray-600 dark:text-gray-400 text-xs">Batch: </span>
                        <span className="font-medium text-gray-900 dark:text-white">{req.batchNumber}</span>
                      </div>
                    )}
                    {req.jobTicketId && (
                      <div>
                        <span className="text-gray-600 dark:text-gray-400 text-xs">Job Ticket: </span>
                        <span className="font-medium text-gray-900 dark:text-white">{req.jobTicketId}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
