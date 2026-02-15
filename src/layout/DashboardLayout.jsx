import PropTypes from 'prop-types'
import { useState } from 'react'
import Sidebar from '../components/Sidebar'
import TopBar from '../components/TopBar'

function DashboardLayout({ active, children }) {
  const [isSidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen bg-[#f0f5ff]">
      <Sidebar
        active={active}
        isOpen={isSidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <div className="flex h-screen flex-1 flex-col overflow-hidden">
        <TopBar onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 overflow-auto px-4 py-4 md:px-8 md:py-6">
          {children}
        </main>
      </div>
    </div>
  )
}

DashboardLayout.propTypes = {
  active: PropTypes.oneOf(['curfew', 'blacklisted', 'archived', '/curfew-logs', '/blacklisted', '/archived']),
  children: PropTypes.node.isRequired,
}

export default DashboardLayout

