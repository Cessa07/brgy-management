import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'

const navItems = [
  {
    label: 'Analytics',
    icon: <img src="/src/assets/analysis.svg" alt="logo" className="h-7 w-7" />,
    to: '/analytics'
  },
  {
    label: 'Case Logs',
    icon: <img src="/src/assets/log-file.svg" alt="logo" className="h-7 w-7" />,
    to: '/case-logs'
  },
  {
    label: 'Summons',
    icon: <img src="/src/assets/summons.svg" alt="logo" className="h-7 w-7" />,
    to: '/summons'
  },
  {
    label: 'Curfew Logs',
    icon: <img src="/src/assets/curfew.svg" alt="logo" className="h-7 w-7" />,
    to: '/curfew-logs'
  },
  {
    label: 'Blacklisted',
    icon: <img src="/src/assets/blacklisted.svg" alt="logo" className="h-7 w-7" />,
    to: '/blacklisted'
  },
  {
    label: 'Archived',
    icon: <img src="/src/assets/folder.svg" alt="logo" className="h-7 w-7" />,
    to: '/archived'
  }
]

function Sidebar({ active, isOpen, onClose }) {
  return (
    <>
      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 z-20 bg-black/50 transition-opacity md:hidden ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}
        onClick={onClose}
      />

      {/* Sidebar Content */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-30 flex h-screen w-64 flex-col overflow-y-auto border-r border-slate-200 bg-white/95 shadow-xl transition-transform duration-300 ease-in-out md:static md:translate-x-0 md:bg-white/90 md:shadow-md
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="flex items-center justify-center px-6 py-4">
          <img src="/src/assets/caybiga Logo.svg" alt="logo" className="h-32 w-32 object-contain" />
        </div>

        <nav className="mt-4 flex-1 space-y-1 px-3">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.to}
              end={!['/curfew-logs', '/blacklisted', '/archived'].includes(item.to)}
              onClick={() => onClose()}
              className={({ isActive }) =>
                `flex w-full items-center gap-3 rounded-r-full px-4 py-2 text-sm font-semibold transition-colors ${isActive || active === item.to
                  ? 'bg-[#e9f1ff] text-[#2552c4] shadow-inner'
                  : 'text-slate-700 hover:bg-slate-100'
                }`
              }
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-base">
                {item.icon}
              </span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  )
}

Sidebar.propTypes = {
  active: PropTypes.string,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
}

export default Sidebar

