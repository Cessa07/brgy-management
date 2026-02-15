import { Routes, Route, Navigate } from 'react-router-dom'
import CurfewLogsPage from './pages/CurfewLogsPage'
import CurfewFoldersPage from './pages/CurfewFoldersPage'
import CurfewOverviewPage from './pages/CurfewOverviewPage'
import BlacklistedPage from './pages/BlacklistedPage'
import BlacklistedDetailsPage from './pages/BlacklistedDetailsPage'
import ArchivedPage from './pages/ArchivedPage'
import ArchivedCaseDetailsPage from './pages/ArchivedCaseDetailsPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/curfew-logs" replace />} />
      <Route path="/curfew-logs" element={<CurfewLogsPage />} />
      <Route path="/curfew-logs/:curfewNo/folders" element={<CurfewFoldersPage />} />
      <Route path="/curfew-logs/:curfewNo/folders/:folderId/overview" element={<CurfewOverviewPage />} />
      <Route path="/blacklisted" element={<BlacklistedPage />} />
      <Route path="/blacklisted/:id" element={<BlacklistedDetailsPage />} />
      <Route path="/archived" element={<ArchivedPage />} />
      <Route path="/archived/:id" element={<ArchivedCaseDetailsPage />} />
    </Routes>
  )
}

export default App
