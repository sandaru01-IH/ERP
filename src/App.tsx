import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeContext'
import LandingPage from './pages/LandingPage'
import AppLayout from './layouts/AppLayout'
import HomeModule from './pages/modules/HomeModule'
import GeoInfoModule from './pages/modules/GeoInfoModule'
import CropModule from './pages/modules/CropModule'
import FertilizerModule from './pages/modules/FertilizerModule'
import CropMonitoringModule from './pages/modules/CropMonitoringModule'
import AssetsMachineryModule from './pages/modules/AssetsMachineryModule'
import OperationsModule from './pages/modules/OperationsModule'
import GeoReportsModule from './pages/modules/GeoReportsModule'

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/app" element={<AppLayout />}>
            <Route index element={<HomeModule />} />
            <Route path="geo-info" element={<GeoInfoModule />} />
            <Route path="crop" element={<CropModule />} />
            <Route path="fertilizer" element={<FertilizerModule />} />
            <Route path="crop-monitoring" element={<CropMonitoringModule />} />
            <Route path="assets-machinery" element={<AssetsMachineryModule />} />
            <Route path="operations" element={<OperationsModule />} />
            <Route path="geo-reports" element={<GeoReportsModule />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
