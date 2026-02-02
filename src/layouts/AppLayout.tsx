import { Outlet } from 'react-router-dom'
import { AppProvider } from '../contexts/AppContext'
import SideDock from '../components/layout/SideDock'
import TopBar from '../components/layout/TopBar'

export default function AppLayout() {
  return (
    <AppProvider>
      <div className="flex h-screen overflow-hidden bg-bg-secondary">
        <SideDock />
        <div className="flex-1 flex flex-col overflow-hidden">
          <TopBar />
          <main className="flex-1 overflow-y-auto p-6 pb-20 md:pb-6">
            <Outlet />
          </main>
        </div>
      </div>
    </AppProvider>
  )
}
