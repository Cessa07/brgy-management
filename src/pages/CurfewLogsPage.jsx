import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import DashboardLayout from '../layout/DashboardLayout'
import ModalCard from '../components/ModalCard'

// Success Alert Component with blue theme
const SuccessAlert = ({ message, onClose }) => {
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

function getDefaultDate() {
  const d = new Date()
  return d.toISOString().slice(0, 10)
}

function getDefaultTime() {
  const d = new Date()
  const h = d.getHours()
  const m = d.getMinutes()
  const am = h < 12
  const h12 = h % 12 || 12
  return `${h12.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')} ${am ? 'AM' : 'PM'}`
}

const initialCurfewRows = [
  { id: '01', name: 'Reyes, Timothy G.', address: '166 , BARANGAY CALOOCAN CITY', age: '12', status: null },
  { id: '02', name: 'Reyes, Timothy G.', address: '166 , BARANGAY CALOOCAN CITY', age: '12', status: null },
  { id: '03', name: 'Reyes, Timothy G.', address: '166 , BARANGAY CALOOCAN CITY', age: '12', status: null },
  { id: '04', name: 'Reyes, Timothy G.', address: '166 , BARANGAY CALOOCAN CITY', age: '12', status: null },
  { id: '05', name: 'Reyes, Timothy G.', address: '166 , BARANGAY CALOOCAN CITY', age: '12', status: null },
  { id: '06', name: 'Reyes, Timothy G.', address: '166 , BARANGAY CALOOCAN CITY', age: '12', status: null },
  { id: '07', name: 'Reyes, Timothy G.', address: '166 , BARANGAY CALOOCAN CITY', age: '12', status: null },
  { id: '08', name: 'Reyes, Timothy G.', address: '166 , BARANGAY CALOOCAN CITY', age: '12', status: null },
  { id: '09', name: 'Reyes, Timothy G.', address: '166 , BARANGAY CALOOCAN CITY', age: '12', status: null },
  { id: '10', name: 'Reyes, Timothy G.', address: '166 , BARANGAY CALOOCAN CITY', age: '12', status: null },
  { id: '11', name: 'Reyes, Timothy G.', address: '166 , BARANGAY CALOOCAN CITY', age: '12', status: null },
]

function CurfewLogsPage() {
  const navigate = useNavigate()
  const [rows, setRows] = useState(initialCurfewRows)
  const [showAddModal, setShowAddModal] = useState(false)
  const [statusMenuOpen, setStatusMenuOpen] = useState(null)
  // Success alert state
  const [showSuccessAlert, setShowSuccessAlert] = useState(false)
  const [newCurfewName, setNewCurfewName] = useState('')
  const [form, setForm] = useState({
    date: '',
    time: '',
    name: '',
    address: '',
    age: '',
  })
  const [errors, setErrors] = useState({
    date: '',
    time: '',
    name: '',
    address: '',
    age: '',
  })

  const openAddModal = () => {
    setForm({
      date: getDefaultDate(),
      time: getDefaultTime(),
      name: '',
      address: '',
      age: '',
    })
    setErrors({
      date: '',
      time: '',
      name: '',
      address: '',
      age: '',
    })
    setShowAddModal(true)
  }

  const validateForm = () => {
    const newErrors = {
      date: '',
      time: '',
      name: '',
      address: '',
      age: '',
    }
    let isValid = true

    // Validate name
    if (!form.name.trim()) {
      newErrors.name = 'Resident name is required'
      isValid = false
    }

    // Validate address
    if (!form.address.trim()) {
      newErrors.address = 'Address is required'
      isValid = false
    }

    // Validate age
    if (!form.age.trim()) {
      newErrors.age = 'Age is required'
      isValid = false
    } else {
      const ageNum = parseInt(form.age, 10)
      if (isNaN(ageNum)) {
        newErrors.age = 'Age must be a number'
        isValid = false  
      } else if (ageNum == '-0') {
        newErrors.age = 'Age must not be a negative zero'
        isValid = false
      } else if (ageNum < 0) {
        newErrors.age = 'Age must be a positive number'
        isValid = false
      }
    }

    setErrors(newErrors)
    return isValid
  }

  const handleAddSubmit = (e) => {
    e.preventDefault()
    
    // Validate form
    if (!validateForm()) {
      return
    }

    const nextId = String(rows.length + 1).padStart(2, '0')
    const newRow = {
      id: nextId,
      name: form.name,
      address: form.address,
      age: form.age,
      status: null,
    }
    
    setRows([...rows, newRow])
    setNewCurfewName(form.name)
    setForm({ date: '', time: '', name: '', address: '', age: '' })
    setErrors({ date: '', time: '', name: '', address: '', age: '' })
    setShowAddModal(false)
    // Show success alert
    setShowSuccessAlert(true)
  }

  const setRowStatus = (rowId, newStatus) => {
    setRows(rows.map((r) => (r.id === rowId ? { ...r, status: newStatus } : r)))
    setStatusMenuOpen(null)
  }

  return (
    <DashboardLayout active="curfew">
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

      {/* Success Alert with blue theme */}
      {showSuccessAlert && (
        <SuccessAlert 
          message={`Curfew record for ${newCurfewName} has been created successfully`}
          onClose={() => setShowSuccessAlert(false)}
        />
      )}

      <div className="min-h-full bg-gray-100 pt-1">
        <section className="overflow-hidden rounded-xl bg-white shadow-lg">
          {/* Header: gradient blue bar + Add Curfew right-aligned */}
          <div className="flex items-center justify-between rounded-t-xl bg-gradient-to-b from-blue-700 to-blue-800 px-6 py-5 text-white shadow-sm">
            <h1 className="text-left text-xl font-bold uppercase tracking-wide text-white md:text-2xl">
              CURFEW LIST
            </h1>
            <button
              type="button"
              className="flex items-center justify-center gap-2 rounded-md bg-[#2552c4] px-4 py-2.5 text-sm font-semibold text-white shadow hover:bg-blue-700"
              onClick={openAddModal}
            >
              <img src="/src/assets/curcur.svg" alt="add" className="h-5 w-5" />
              <span>Add Curfew</span>
            </button>
          </div>

          {/* Table: gray header row, consistent padding */}
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="border-b border-gray-200 bg-white">
                <th className="px-6 py-4 text-center text-xs font-bold uppercase tracking-wide text-gray-700">
                  NO.
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wide text-gray-700">
                  Resident name
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wide text-gray-700">
                  Address
                </th>
                <th className="px-6 py-4 text-center text-xs font-bold uppercase tracking-wide text-gray-700">
                  Age
                </th>
                <th className="px-6 py-4 text-center text-xs font-bold uppercase tracking-wide text-gray-700">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr
                  key={row.id}
                  className="cursor-pointer border-b border-gray-200 bg-white hover:bg-gray-50/80"
                  onClick={() => navigate(`/curfew-logs/${row.id}/folders`, { state: { residentName: row.name } })}
                >
                  <td
                    className="px-6 py-4 text-center text-sm font-semibold text-blue-600"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {row.id}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <img
                        src="/src/assets/lagayan.svg"
                        alt=""
                        className="h-5 w-5 flex-shrink-0"
                      />
                      <span className="text-sm font-medium text-gray-800">{row.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">{row.address}</td>
                  <td className="px-6 py-4 text-center text-sm font-semibold text-blue-600">
                    {row.age}
                  </td>
                  <td className="relative px-6 py-4 text-center" onClick={(e) => e.stopPropagation()}>
                    {row.status === 'settled' ? (
                      <div className="flex items-center justify-center gap-2">
                        <span className="rounded-full bg-emerald-500 px-3 py-1 text-xs font-semibold text-white">
                          SETTLED
                        </span>
                        <button
                          type="button"
                          className="flex items-center gap-1 text-xs font-medium text-slate-500 hover:text-slate-700"
                          onClick={() => setStatusMenuOpen(statusMenuOpen === row.id ? null : row.id)}
                        >
                          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6z" />
                          </svg>
                          Edit Status
                        </button>
                        {statusMenuOpen === row.id && (
                          <>
                            <div
                              className="fixed inset-0 z-10"
                              onClick={() => setStatusMenuOpen(null)}
                              aria-hidden
                            />
                            <div className="absolute right-2 top-full z-20 mt-1 flex flex-col gap-1 rounded-lg border border-slate-200 bg-white py-1 shadow-lg">
                              <button
                                type="button"
                                className="whitespace-nowrap px-3 py-1.5 text-left text-xs font-medium text-slate-700 hover:bg-slate-50"
                                onClick={() => setRowStatus(row.id, 'settled')}
                              >
                                <span className="inline-block rounded-full bg-emerald-500 px-4 py-0.5 text-white">
                                  Settled
                                </span>
                              </button>
                              <button
                                type="button"
                                className="whitespace-nowrap px-3 py-1.5 text-left text-xs font-medium text-slate-700 hover:bg-slate-50"
                                onClick={() => setRowStatus(row.id, 'unsettled')}
                              >
                                <span className="inline-block rounded-full bg-red-500 px-2 py-0.5 text-white">
                                  Unsettled
                                </span>
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    ) : row.status === 'unsettled' ? (
                      <div className="flex items-center justify-center gap-2">
                        <span className="rounded-full bg-red-500 px-3 py-1 text-xs font-semibold text-white">
                          UNSETTLED
                        </span>
                        <button
                          type="button"
                          className="flex items-center gap-1 text-xs font-medium text-slate-500 hover:text-slate-700"
                          onClick={() => setStatusMenuOpen(statusMenuOpen === row.id ? null : row.id)}
                        >
                          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6z" />
                          </svg>
                          Edit Status
                        </button>
                        {statusMenuOpen === row.id && (
                          <>
                            <div
                              className="fixed inset-0 z-10"
                              onClick={() => setStatusMenuOpen(null)}
                              aria-hidden
                            />
                            <div className="absolute right-2 top-full z-20 mt-1 flex flex-col gap-1 rounded-lg border border-slate-200 bg-white py-1 shadow-lg">
                              <button
                                type="button"
                                className="whitespace-nowrap px-3 py-1.5 text-left text-xs font-medium text-slate-700 hover:bg-slate-50"
                                onClick={() => setRowStatus(row.id, 'settled')}
                              >
                                <span className="inline-block rounded-full bg-emerald-500 px-4 py-0.5 text-white">
                                  Settled
                                </span>
                              </button>
                              <button
                                type="button"
                                className="whitespace-nowrap px-3 py-1.5 text-left text-xs font-medium text-slate-700 hover:bg-slate-50"
                                onClick={() => setRowStatus(row.id, 'unsettled')}
                              >
                                <span className="inline-block rounded-full bg-red-500 px-2 py-0.5 text-white">
                                  Unsettled
                                </span>
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    ) : (
                      <div className="relative flex justify-center">
                        <button
                          type="button"
                          className="flex h-8 w-8 items-center justify-center rounded text-slate-500 hover:bg-slate-100 hover:text-slate-700"
                          onClick={() =>
                            setStatusMenuOpen(statusMenuOpen === row.id ? null : row.id)
                          }
                        >
                          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                          </svg>
                        </button>
                        {statusMenuOpen === row.id && (
                          <>
                            <div
                              className="fixed inset-0 z-10"
                              onClick={() => setStatusMenuOpen(null)}
                              aria-hidden
                            />
                            <div className="absolute right-2 top-full z-20 mt-1 flex flex-col gap-1 rounded-lg border border-slate-200 bg-white py-1 shadow-lg">
                              <button
                                type="button"
                                className="whitespace-nowrap px-3 py-1.5 text-left text-xs font-medium text-slate-700 hover:bg-slate-50"
                                onClick={() => setRowStatus(row.id, 'settled')}
                              >
                                <span className="inline-block rounded-full bg-emerald-500 px-4 py-0.5 text-white">
                                  Settled
                                </span>
                              </button>
                              <button
                                type="button"
                                className="whitespace-nowrap px-3 py-1.5 text-left text-xs font-medium text-slate-700 hover:bg-slate-50"
                                onClick={() => setRowStatus(row.id, 'unsettled')}
                              >
                                <span className="inline-block rounded-full bg-red-500 px-2 py-0.5 text-white">
                                  Unsettled
                                </span>
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    )}
                  </td>
                </tr>
              ))}
              <tr>
                <td colSpan={5} className="bg-white">
                  <div className="flex items-center justify-center gap-4 border-t border-gray-200 py-8">
                    <span className="h-px flex-1 max-w-[80px] bg-gray-300" aria-hidden />
                    <p className="text-center text-sm font-semibold uppercase tracking-wide text-gray-600">
                      NOTHING FOLLOWS
                    </p>
                    <span className="h-px flex-1 max-w-[80px] bg-gray-300" aria-hidden />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        </section>

        {showAddModal && (
          <ModalCard
            title="NEW CURFEW"
            onClose={() => setShowAddModal(false)}
            widthClass="max-w-lg"
            headerClass="bg-[#2552c4] text-left text-white"
            darkHeader
            headerIcon={
              <img src="/src/assets/curfew.svg" alt="" className="h-8 w-8 flex-shrink-0" />
            }
          >
            <form onSubmit={handleAddSubmit} className="space-y-5 p-1">
            <div className="grid grid-cols-2 gap-4">
            <label className="flex flex-col gap-1.5">
              <span className="text-xs font-semibold text-slate-700">Date</span>
                <input
                  type="date"
                  className="rounded-md border border-gray-300 bg-gray-100 px-3 py-2 text-sm outline-none cursor-not-allowed"
                  value={form.date}
                  readOnly
                  disabled
                />
              {errors.date && <span className="text-xs text-red-600">{errors.date}</span>}
            </label>
            
            <label className="flex flex-col gap-1.5">
              <span className="text-xs font-semibold text-slate-700">Time</span>
              <div className="relative">
                <input
                  type="text"
                  className="w-full rounded-md border border-slate-300 bg-gray-100 px-3 py-2.5 text-sm text-slate-700 outline-none cursor-not-allowed"
                  value={form.time}
                  readOnly
                  disabled
                  placeholder="12:00 AM"
                />
              </div>
              {errors.time && <span className="text-xs text-red-600">{errors.time}</span>}
            </label>
          </div>
              <div className="grid grid-cols-2 gap-4">
                <label className="flex flex-col gap-1.5">
                  <span className="text-xs font-semibold text-slate-700">Resident Name</span>
                  <input
                    type="text"
                    className={`rounded-md border ${errors.name ? 'border-red-500 bg-red-50' : 'border-slate-300 bg-slate-50'} px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-[#1976D2] focus:bg-white`}
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Full name"
                  />
                  {errors.name && <span className="text-xs text-red-600">{errors.name}</span>}
                </label>
                <label className="flex flex-col gap-1.5">
                  <span className="text-xs font-semibold text-slate-700">Age</span>
                  <input
                    type="text"
                    className={`rounded-md border ${errors.age ? 'border-red-500 bg-red-50' : 'border-slate-300 bg-slate-50'} px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-[#1976D2] focus:bg-white`}
                    value={form.age}
                    onChange={(e) => setForm({ ...form, age: e.target.value })}
                    placeholder="Input Age"
                  />
                  {errors.age && <span className="text-xs text-red-600">{errors.age}</span>}
                </label>
              </div>
              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-semibold text-slate-700">Address</span>
                <input
                  type="text"
                  className={`rounded-md border ${errors.address ? 'border-red-500 bg-red-50' : 'border-slate-300 bg-slate-50'} px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-[#1976D2] focus:bg-white`}
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                  placeholder="Input full address"
                />
                {errors.address && <span className="text-xs text-red-600">{errors.address}</span>}
              </label>
              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="rounded-md border border-slate-300 px-5 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-md bg-[#1976D2] px-6 py-2 text-sm font-semibold text-white shadow hover:bg-[#1565C0]"
                >
                  Create
                </button>
              </div>
            </form>
          </ModalCard>
        )}
      </div>
    </DashboardLayout>
  )
}

export default CurfewLogsPage