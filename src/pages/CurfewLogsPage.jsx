import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DashboardLayout from '../layout/DashboardLayout'
import ModalCard from '../components/ModalCard'

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
  { id: '01', name: 'Reyes, Timothy G.', address: '166 , BARANGAY CALOOCAN CITY', age: '12yrs old', status: null },
  { id: '02', name: 'Reyes, Timothy G.', address: '166 , BARANGAY CALOOCAN CITY', age: '12yrs old', status: null },
  { id: '03', name: 'Reyes, Timothy G.', address: '166 , BARANGAY CALOOCAN CITY', age: '12yrs old', status: null },
  { id: '04', name: 'Reyes, Timothy G.', address: '166 , BARANGAY CALOOCAN CITY', age: '12yrs old', status: null },
  { id: '05', name: 'Reyes, Timothy G.', address: '166 , BARANGAY CALOOCAN CITY', age: '12yrs old', status: null },
  { id: '06', name: 'Reyes, Timothy G.', address: '166 , BARANGAY CALOOCAN CITY', age: '12yrs old', status: null },
  { id: '07', name: 'Reyes, Timothy G.', address: '166 , BARANGAY CALOOCAN CITY', age: '12yrs old', status: null },
  { id: '08', name: 'Reyes, Timothy G.', address: '166 , BARANGAY CALOOCAN CITY', age: '12yrs old', status: null },
  { id: '09', name: 'Reyes, Timothy G.', address: '166 , BARANGAY CALOOCAN CITY', age: '12yrs old', status: null },
  { id: '10', name: 'Reyes, Timothy G.', address: '166 , BARANGAY CALOOCAN CITY', age: '12yrs old', status: null },
  { id: '11', name: 'Reyes, Timothy G.', address: '166 , BARANGAY CALOOCAN CITY', age: '12yrs old', status: null },
]

function CurfewLogsPage() {
  const navigate = useNavigate()
  const [rows, setRows] = useState(initialCurfewRows)
  const [showAddModal, setShowAddModal] = useState(false)
  const [statusMenuOpen, setStatusMenuOpen] = useState(null)
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

    // Validate date
    if (!form.date.trim()) {
      newErrors.date = 'Date is required'
      isValid = false
    }

    // Validate time
    if (!form.time.trim()) {
      newErrors.time = 'Time is required'
      isValid = false
    }

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
    setRows([
      ...rows,
      {
        id: nextId,
        name: form.name,
        address: form.address,
        age: `${form.age}yrs old`,
        status: null,
      },
    ])
    setForm({ date: '', time: '', name: '', address: '', age: '' })
    setErrors({ date: '', time: '', name: '', address: '', age: '' })
    setShowAddModal(false)
  }

  const setRowStatus = (rowId, newStatus) => {
    setRows(rows.map((r) => (r.id === rowId ? { ...r, status: newStatus } : r)))
    setStatusMenuOpen(null)
  }

  return (
    <DashboardLayout active="curfew">
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
                  className="rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-600"
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                />
              {errors.date && <span className="text-xs text-red-600">{errors.date}</span>}
            </label>
            
            <label className="flex flex-col gap-1.5">
              <span className="text-xs font-semibold text-slate-700">Time</span>
              <div className="relative">
                <input
                  type="text"
                  className={`w-full rounded-md border ${errors.time ? 'border-red-500 bg-red-50' : 'border-slate-300 bg-slate-50'} px-3 py-2.5 pr-10 text-sm text-slate-700 outline-none focus:border-[#1976D2] focus:bg-white`}
                  value={form.time}
                  onChange={(e) => setForm({ ...form, time: e.target.value })}
                  placeholder="12:00 AM"
                />
                <span 
                  className="absolute inset-y-0 right-2.5 flex cursor-pointer items-center text-slate-400 hover:text-slate-600"
                  onClick={() => {
                    // Create modal backdrop
                    const modalOverlay = document.createElement('div');
                    modalOverlay.style.position = 'fixed';
                    modalOverlay.style.top = '0';
                    modalOverlay.style.left = '0';
                    modalOverlay.style.width = '100%';
                    modalOverlay.style.height = '100%';
                    modalOverlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
                    modalOverlay.style.display = 'flex';
                    modalOverlay.style.alignItems = 'center';
                    modalOverlay.style.justifyContent = 'center';
                    modalOverlay.style.zIndex = '9999';
                    
                    // Create time picker container
                    const pickerContainer = document.createElement('div');
                    pickerContainer.style.backgroundColor = 'white';
                    pickerContainer.style.borderRadius = '0.75rem';
                    pickerContainer.style.padding = '1.5rem';
                    pickerContainer.style.boxShadow = '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)';
                    pickerContainer.style.width = '280px';
                    pickerContainer.style.maxWidth = '90%';
                    
                    // Create title
                    const title = document.createElement('h3');
                    title.textContent = 'Select Time';
                    title.style.fontSize = '1.125rem';
                    title.style.fontWeight = '600';
                    title.style.marginBottom = '1rem';
                    title.style.color = '#1e293b';
                    
                    // Create time input wrapper
                    const timeWrapper = document.createElement('div');
                    timeWrapper.style.marginBottom = '1.5rem';
                    
                    // Create time input
                    const timeInput = document.createElement('input');
                    timeInput.type = 'time';
                    timeInput.style.width = '100%';
                    timeInput.style.padding = '0.75rem';
                    timeInput.style.border = '1px solid #cbd5e1';
                    timeInput.style.borderRadius = '0.5rem';
                    timeInput.style.fontSize = '1rem';
                    timeInput.style.outline = 'none';
                    timeInput.style.backgroundColor = '#f8fafc';
                    
                    // Style the time input's internal picker
                    timeInput.style.colorScheme = 'light';
                    
                    // Focus styles
                    timeInput.addEventListener('focus', () => {
                      timeInput.style.borderColor = '#1976D2';
                      timeInput.style.backgroundColor = 'white';
                    });
                    
                    timeInput.addEventListener('blur', () => {
                      timeInput.style.borderColor = '#cbd5e1';
                      timeInput.style.backgroundColor = '#f8fafc';
                    });
                    
                    // Create buttons container
                    const buttonsContainer = document.createElement('div');
                    buttonsContainer.style.display = 'flex';
                    buttonsContainer.style.gap = '0.75rem';
                    buttonsContainer.style.justifyContent = 'flex-end';
                    
                    // Create Cancel button
                    const cancelBtn = document.createElement('button');
                    cancelBtn.textContent = 'Cancel';
                    cancelBtn.style.padding = '0.5rem 1rem';
                    cancelBtn.style.borderRadius = '0.375rem';
                    cancelBtn.style.fontSize = '0.875rem';
                    cancelBtn.style.fontWeight = '500';
                    cancelBtn.style.backgroundColor = '#f1f5f9';
                    cancelBtn.style.color = '#475569';
                    cancelBtn.style.border = 'none';
                    cancelBtn.style.cursor = 'pointer';
                    cancelBtn.style.transition = 'background-color 0.2s';
                    
                    cancelBtn.addEventListener('mouseenter', () => {
                      cancelBtn.style.backgroundColor = '#e2e8f0';
                    });
                    
                    cancelBtn.addEventListener('mouseleave', () => {
                      cancelBtn.style.backgroundColor = '#f1f5f9';
                    });
                    
                    // Create OK button
                    const okBtn = document.createElement('button');
                    okBtn.textContent = 'OK';
                    okBtn.style.padding = '0.5rem 1rem';
                    okBtn.style.borderRadius = '0.375rem';
                    okBtn.style.fontSize = '0.875rem';
                    okBtn.style.fontWeight = '500';
                    okBtn.style.backgroundColor = '#1976D2';
                    okBtn.style.color = 'white';
                    okBtn.style.border = 'none';
                    okBtn.style.cursor = 'pointer';
                    okBtn.style.transition = 'background-color 0.2s';
                    
                    okBtn.addEventListener('mouseenter', () => {
                      okBtn.style.backgroundColor = '#1565C0';
                    });
                    
                    okBtn.addEventListener('mouseleave', () => {
                      okBtn.style.backgroundColor = '#1976D2';
                    });
                    
                    // Handle OK button click
                    okBtn.addEventListener('click', () => {
                      const time24 = timeInput.value;
                      if (time24) {
                        const [hours, minutes] = time24.split(':');
                        const hour = parseInt(hours, 10);
                        const ampm = hour >= 12 ? 'PM' : 'AM';
                        const hour12 = hour % 12 || 12;
                        const formattedTime = `${hour12}:${minutes} ${ampm}`;
                        setForm({ ...form, time: formattedTime });
                      }
                      document.body.removeChild(modalOverlay);
                    });
                    
                    // Handle Cancel button click
                    cancelBtn.addEventListener('click', () => {
                      document.body.removeChild(modalOverlay);
                    });
                    
                    // Close on backdrop click
                    modalOverlay.addEventListener('click', (e) => {
                      if (e.target === modalOverlay) {
                        document.body.removeChild(modalOverlay);
                      }
                    });
                    
                    // Assemble the picker
                    timeWrapper.appendChild(timeInput);
                    buttonsContainer.appendChild(cancelBtn);
                    buttonsContainer.appendChild(okBtn);
                    
                    pickerContainer.appendChild(title);
                    pickerContainer.appendChild(timeWrapper);
                    pickerContainer.appendChild(buttonsContainer);
                    
                    modalOverlay.appendChild(pickerContainer);
                    document.body.appendChild(modalOverlay);
                    
                    // Automatically show the time picker
                    setTimeout(() => timeInput.showPicker(), 100);
                  }}
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
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