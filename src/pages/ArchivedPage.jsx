import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DashboardLayout from '../layout/DashboardLayout'
import ModalCard from '../components/ModalCard'

const REPORT_TYPE_STYLES = {
  BLOTTER: 'bg-amber-400 text-slate-900',
  COMPLAIN: 'bg-emerald-500 text-white',
  LUPON: 'bg-blue-600 text-white',
  VAWC: 'bg-red-500 text-white',
}

const initialArchivedRows = [
  { id: 1, type: 'BLOTTER', caseNo: '01-166-05-2026', name: 'Reyes, Timothy G.' },
  { id: 2, type: 'COMPLAIN', caseNo: '01-166-05-2026', name: 'Reyes, Timothy G.' },
  { id: 3, type: 'LUPON', caseNo: '01-166-05-2026', name: 'Reyes, Timothy G.' },
  { id: 4, type: 'VAWC', caseNo: '01-166-05-2026', name: 'Reyes, Timothy G.' },
]

function ArchivedPage() {
  const navigate = useNavigate()
  const [rows, setRows] = useState(initialArchivedRows)
  const [selected, setSelected] = useState(null)
  const [mode, setMode] = useState(null)
  const [search, setSearch] = useState('')

  const totalCount = rows.length

  const openModal = (row, action) => {
    setSelected(row)
    setMode(action)
  }

  const closeModal = () => {
    setSelected(null)
    setMode(null)
  }

  const handleRestore = () => {
    closeModal()
  }

  const handleDelete = () => {
    if (!selected) return
    setRows(rows.filter((r) => r.id !== selected.id))
    closeModal()
  }

  return (
    <DashboardLayout active="archived">
      <div className="min-h-full bg-gray-100 pt-1">
        <section className="overflow-hidden rounded-2xl bg-white shadow-lg">
          {/* Blue gradient header: from top-left darker to bottom-right lighter */}
          <div className="rounded-t-2xl bg-gradient-to-br from-blue-800 to-blue-500 px-6 py-8 shadow-md">
            <h1 className="text-3xl font-bold uppercase tracking-wide text-white md:text-4xl">
              Archived Cases
            </h1>
            <p className="mt-2 text-base font-normal text-white/95">
              Manage previously closed cases. re-store, re-view, or permanently remove records.
            </p>
          </div>

          {/* Content: Total count + search */}
          <div className="border-b border-gray-200 bg-white px-6 py-6 md:px-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm font-semibold text-gray-800">
                Total Archived Cases: {totalCount}
              </p>
              <div className="relative w-full sm:max-w-xs">
                <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-gray-400">
                  <img
                    src="/src/assets/search-interface-symbol.svg"
                    alt=""
                    className="h-5 w-5"
                  />
                </span>
                <input
                  type="text"
                  placeholder="Search case number or resident..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-10 pr-4 text-sm outline-none focus:border-blue-600"
                />
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto px-6 pb-8 pt-6 md:px-8">
            <table className="min-w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-white">
                  <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wide text-gray-800">
                    Report Type
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wide text-gray-800">
                    Case Number
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wide text-gray-800">
                    Resident Name
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wide text-gray-800">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr
                    key={row.id}
                    className="border-b border-gray-100 bg-white hover:bg-gray-50/80"
                  >
                    <td className="px-4 py-3">
                      <span
                        className={`inline-block rounded px-3 py-1 text-xs font-semibold uppercase ${
                          REPORT_TYPE_STYLES[row.type] || 'bg-gray-200 text-gray-800'
                        }`}
                      >
                        {row.type}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-800">
                      {row.caseNo}
                    </td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-800">
                      {row.name}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button
                          type="button"
                          className="rounded-md bg-green-500 px-3 py-1.5 text-xs font-semibold text-white hover:bg-green-600"
                          onClick={() => openModal(row, 'restore')}
                        >
                          Restore
                        </button>
                        <button
                          type="button"
                          className="rounded-md bg-blue-500 px-3 py-1.5 text-xs font-semibold text-white hover:bg-blue-600"
                          onClick={() => navigate(`/archived/${row.id}`)}
                        >
                          View
                        </button>
                        <button
                          type="button"
                          className="rounded-md bg-red-500 px-3 py-1.5 text-xs font-semibold text-white hover:bg-red-600"
                          onClick={() => openModal(row, 'delete')}
                        >
                          Remove
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                <tr>
                  <td colSpan={4} className="bg-white">
                    <div className="flex items-center justify-center gap-4 border-t border-gray-200 py-8">
                      <span className="h-px flex-1 max-w-[120px] bg-gray-300" aria-hidden />
                      <p className="text-center text-sm font-semibold uppercase tracking-wide text-gray-600">
                        NOTHING FOLLOWS
                      </p>
                      <span className="h-px flex-1 max-w-[120px] bg-gray-300" aria-hidden />
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {selected && mode === 'view' && (
          <ModalCard title="Archived Case Details" onClose={closeModal}>
            <div className="space-y-3 text-sm">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-xs font-semibold text-gray-500">Report Type</div>
                  <div className="text-sm font-semibold text-gray-800">{selected.type}</div>
                </div>
                <div>
                  <div className="text-xs font-semibold text-gray-500">Case Number</div>
                  <div className="text-sm font-semibold text-gray-800">{selected.caseNo}</div>
                </div>
              </div>
              <div>
                <div className="text-xs font-semibold text-gray-500">Resident Name</div>
                <div className="text-sm font-semibold text-gray-800">{selected.name}</div>
              </div>
              <div className="mt-4 flex justify-end">
                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded-md bg-blue-600 px-5 py-2 text-xs font-semibold text-white shadow hover:bg-blue-700"
                >
                  Close
                </button>
              </div>
            </div>
          </ModalCard>
        )}

        {selected && mode === 'restore' && (
          <ModalCard title="Restore Archived Case" onClose={closeModal}>
            <div className="space-y-4 text-sm">
              <p className="text-gray-700">
                Are you sure you want to restore the case{' '}
                <span className="font-semibold">{selected.caseNo}</span> for{' '}
                <span className="font-semibold">{selected.name}</span>?
              </p>
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
                  onClick={handleRestore}
                  className="rounded-md bg-emerald-500 px-5 py-2 text-xs font-semibold text-white shadow hover:bg-emerald-600"
                >
                  Confirm Restore
                </button>
              </div>
            </div>
          </ModalCard>
        )}

        {selected && mode === 'delete' && (
          <ModalCard title="Delete Archived Case" onClose={closeModal}>
            <div className="space-y-4 text-sm">
              <p className="text-gray-700">
                This will permanently remove the archived case{' '}
                <span className="font-semibold">{selected.caseNo}</span> for{' '}
                <span className="font-semibold">{selected.name}</span>.
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
                  onClick={handleDelete}
                  className="rounded-md bg-red-600 px-5 py-2 text-xs font-semibold text-white hover:bg-red-700"
                >
                  Confirm Delete
                </button>
              </div>
            </div>
          </ModalCard>
        )}
      </div>
    </DashboardLayout>
  )
}

export default ArchivedPage
