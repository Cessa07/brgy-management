import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import DashboardLayout from '../layout/DashboardLayout'
import ModalCard from '../components/ModalCard'

// Success Alert Component with blue theme for add
const AddSuccessAlert = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000); // Auto close after 3 seconds

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-4 right-4 z-50 animate-slide-in">
      <div className="flex items-center gap-3 rounded-lg bg-gradient-to-r from-[#1a3a8a] to-[#1b9ad4] px-4 py-3 shadow-lg">
        <div className="flex-shrink-0">
          <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium text-white">{message}</p>
        </div>
        <button
          onClick={onClose}
          className="flex-shrink-0 text-white/80 hover:text-white"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};

// Success Alert Component with red theme for removal
const RemoveSuccessAlert = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000); // Auto close after 3 seconds

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-4 right-4 z-50 animate-slide-in">
      <div className="flex items-center gap-3 rounded-lg bg-gradient-to-r from-red-500 to-red-600 px-4 py-3 shadow-lg">
        <div className="flex-shrink-0">
          <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium text-white">{message}</p>
        </div>
        <button
          onClick={onClose}
          className="flex-shrink-0 text-white/80 hover:text-white"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};

const initialBlacklistRows = [
  { id: '01', household: 'HN4820450670', name: 'Reyes, Timothy G.', reason: 'Repeated Case Violation' },
  { id: '02', household: 'HN4820450670', name: 'Reyes, Timothy G.', reason: 'Repeated Case Violation' },
  { id: '03', household: 'HN4820450670', name: 'Reyes, Timothy G.', reason: 'Repeated Case Violation' },
]

function BlacklistedPage() {
  const navigate = useNavigate()
  const [rows, setRows] = useState(initialBlacklistRows)
  const [showAddModal, setShowAddModal] = useState(false)
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState(null)
  const [mode, setMode] = useState(null)
  const [form, setForm] = useState({
    name: '',
    household: '',
  })
  // Success alert states
  const [showAddSuccessAlert, setShowAddSuccessAlert] = useState(false)
  const [showRemoveSuccessAlert, setShowRemoveSuccessAlert] = useState(false)
  const [addedName, setAddedName] = useState('')
  const [removedName, setRemovedName] = useState('')

  const openModal = (row, action) => {
    setSelected(row)
    setMode(action)
  }

  const closeModal = () => {
    setSelected(null)
    setMode(null)
  }

  const handleAddSubmit = (e) => {
    e.preventDefault()
    if (!form.name || !form.household) return

    const nextId = String(rows.length + 1).padStart(2, '0')
    setRows([
      ...rows,
      {
        id: nextId,
        household: form.household,
        name: form.name,
        reason: 'Repeated Case Violation',
      },
    ])
    setAddedName(form.name)
    setForm({ name: '', household: '' })
    setShowAddModal(false)
    // Show add success alert
    setShowAddSuccessAlert(true)
  }

  const handleRemove = () => {
    if (!selected) return
    setRemovedName(selected.name)
    setRows(rows.filter((r) => r.id !== selected.id))
    closeModal()
    // Show remove success alert
    setShowRemoveSuccessAlert(true)
  }

  // Filter rows based on search input
  const filteredRows = rows.filter((row) => {
    const searchLower = search.toLowerCase()
    return (
      row.name.toLowerCase().includes(searchLower) ||
      row.household.toLowerCase().includes(searchLower)
    )
  })

  return (
    <DashboardLayout active="blacklisted">
      {/* Animation Styles */}
      <style>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        .animate-slide-in {
          animation: slideIn 0.3s ease-out;
        }
      `}</style>

      {/* Add Success Alert with blue theme */}
      {showAddSuccessAlert && (
        <AddSuccessAlert 
          message={`${addedName} has been added to blacklist successfully`}
          onClose={() => setShowAddSuccessAlert(false)}
        />
      )}

      {/* Remove Success Alert with red theme */}
      {showRemoveSuccessAlert && (
        <RemoveSuccessAlert 
          message={`${removedName} has been removed from blacklist`}
          onClose={() => setShowRemoveSuccessAlert(false)}
        />
      )}

      <div className="min-h-full bg-gray-100 pt-1">
        <section className="overflow-hidden rounded-2xl bg-white shadow-lg">
          {/* Blue header: solid dark blue, left-aligned */}
          <div className="rounded-t-2xl bg-[#2552c4] px-6 py-8 shadow-sm md:px-8">
            <h1 className="text-xl font-bold uppercase tracking-wide text-white md:text-2xl">
              BLACKLISTED CASE RECORDS
            </h1>
            <p className="mt-2 text-sm font-normal text-white/95">
              Residents restricted due to repeated violations and escalated cases.
            </p>
          </div>

          {/* Action bar: search (left) + Add Blacklisted (right) */}
          <div className="flex flex-col gap-4 border-b border-gray-200 bg-white px-6 py-4 sm:flex-row sm:items-center sm:justify-between md:px-8">
            <div className="relative flex-1 sm:max-w-xs">
              <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-gray-400">
                <img
                  src="/src/assets/search-interface-symbol.svg"
                  alt=""
                  className="h-5 w-5"
                />
              </span>
              <input
                type="text"
                placeholder="Search resident....."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-md border border-gray-300 bg-white py-2.5 pl-10 pr-4 text-sm outline-none focus:border-blue-600"
              />
            </div>
            <button
              type="button"
              className="flex items-center justify-center gap-2 rounded-md bg-gradient-to-r from-[#1a3a8a] to-[#1b9ad4] px-5 py-2 text-sm font-semibold text-white shadow hover:from-[#142c6a] hover:to-[#1478a4]"
              onClick={() => setShowAddModal(true)}
            >
              <img src="/src/assets/curcur.svg" alt="add" className="h-5 w-5" />
              <span>Add Blacklisted</span>
            </button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto px-6 py-4 md:px-8">
            <table className="min-w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-white">
                  <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wide text-gray-800">
                    No.
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wide text-gray-800">
                    Resident
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wide text-gray-800">
                    Household no.
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wide text-gray-800">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wide text-gray-800">
                    Reason
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wide text-gray-800">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredRows.map((row, index) => (
                  <tr
                    key={row.id}
                    className={`border-b border-gray-100 ${
                      index === 1 ? 'bg-gray-50/80' : 'bg-white hover:bg-gray-50/50'
                    }`}
                  >
                    <td className="px-4 py-3 text-sm font-semibold text-blue-600">{row.id}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="h-9 w-9 flex-shrink-0 rounded-full bg-gray-300" />
                        <span className="text-sm font-medium text-gray-800">{row.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">{row.household}</td>
                    <td className="px-4 py-3">
                      <span className="inline-block rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold uppercase text-white">
                        BLACKLISTED
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">{row.reason}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button
                          type="button"
                          className="rounded-md bg-blue-500 px-3 py-1.5 text-xs font-semibold text-white hover:bg-blue-600"
                          onClick={() => navigate(`/blacklisted/${row.id}`)}
                        >
                          View
                        </button>
                        <button
                          type="button"
                          className="rounded-md bg-red-500 px-3 py-1.5 text-xs font-semibold text-white hover:bg-red-600"
                          onClick={() => openModal(row, 'remove')}
                        >
                          Remove
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredRows.length > 0 ? (
                  <tr>
                    <td colSpan={6} className="bg-white">
                      <div className="flex items-center justify-center gap-4 border-t border-gray-200 py-6">
                        <span className="h-px flex-1 max-w-[120px] bg-gray-300" aria-hidden />
                        <p className="text-center text-sm font-semibold uppercase tracking-wide text-gray-600">
                          NOTHING FOLLOWS
                        </p>
                        <span className="h-px flex-1 max-w-[120px] bg-gray-300" aria-hidden />
                      </div>
                    </td>
                  </tr>
                ) : (
                  <tr>
                    <td colSpan={6} className="bg-white">
                      <div className="flex items-center justify-center py-12">
                        <p className="text-sm text-gray-500">
                          No residents found matching "{search}"
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        {showAddModal && (
          <ModalCard
            title="Add Blacklisted Resident"
            onClose={() => setShowAddModal(false)}
            headerClass="bg-[#2552c4] "
            darkHeader
          >
            <form onSubmit={handleAddSubmit} className="space-y-4 text-sm">
              <div className="grid grid-cols-2 gap-4">
                <label className="flex flex-col gap-1">
                  <span className="text-xs font-semibold text-gray-600">Resident Name</span>
                  <input
                    type="text"
                    className="rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-600"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Last name, First name"
                  />
                </label>
                <label className="flex flex-col gap-1">
                  <span className="text-xs font-semibold text-gray-600">Household Number</span>
                  <input
                    type="text"
                    className="rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-600"
                    value={form.household}
                    onChange={(e) => setForm({ ...form, household: e.target.value })}
                    placeholder="HNXXXXXXXXX"
                  />
                </label>
              </div>
              <div className="mt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="rounded-md border border-gray-300 px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-md bg-blue-600 px-5 py-2 text-xs font-semibold text-white shadow hover:bg-blue-700"
                >
                  Save
                </button>
              </div>
            </form>
          </ModalCard>
        )}

        {selected && mode === 'remove' && (
          <ModalCard title="Remove from Blacklist" onClose={closeModal}>
            <div className="space-y-4 text-sm">
              <p className="text-gray-700">
                Are you sure you want to remove{' '}
                <span className="font-semibold">{selected.name}</span> from the blacklist?
              </p>
              <p className="text-xs text-red-500">This action cannot be undone in this demo.</p>
              <div className="mt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded-md border border-gray-300 px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleRemove}
                  className="rounded-md bg-red-600 px-5 py-2 text-xs font-semibold text-white hover:bg-red-700"
                >
                  Confirm Remove
                </button>
              </div>
            </div>
          </ModalCard>
        )}
      </div>
    </DashboardLayout>
  )
}

export default BlacklistedPage