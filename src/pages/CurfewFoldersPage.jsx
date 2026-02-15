import { useState } from 'react'
import { useParams, useLocation, useNavigate } from 'react-router-dom'
import DashboardLayout from '../layout/DashboardLayout'

const MOCK_FOLDERS = [
  { id: '1', name: 'CURFEW 1' },
  { id: '2', name: 'CURFEW 2' },
  { id: '3', name: 'CURFEW 3' },
  { id: '4', name: 'CURFEW 4' },
  { id: '5', name: 'CURFEW 5' },
]

function CurfewFoldersPage() {
  const { curfewNo } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const residentName = location.state?.residentName || 'Reyes, Timothy G.'
  const [folders, setFolders] = useState(MOCK_FOLDERS)
  const [menuOpen, setMenuOpen] = useState(null)
  const [showNotesModal, setShowNotesModal] = useState(false)
  const [notesData, setNotesData] = useState({
    date: '',
    time: '',
    notes: ''
  })
  const [errors, setErrors] = useState({})

  const handleView = (folderId) => {
    setMenuOpen(null)
    navigate(`/curfew-logs/${curfewNo}/folders/${folderId}/overview`)
  }

  const handleDelete = (folderId) => {
    setFolders((prev) => prev.filter((f) => f.id !== folderId))
    setMenuOpen(null)
  }

  const handleAddNotes = () => {
    setShowNotesModal(true)
  }

  const handleCloseModal = () => {
    setShowNotesModal(false)
    setNotesData({ date: '', time: '', notes: '' })
    setErrors({})
  }

  const validateNotes = () => {
    const newErrors = {}
    if (!notesData.date) newErrors.date = 'Date is required'
    if (!notesData.time) newErrors.time = 'Time is required'
    if (!notesData.notes) newErrors.notes = 'Notes are required'
    return newErrors
  }

  const handleSubmitNotes = () => {
    const newErrors = validateNotes()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    // Here you would typically save the notes to your backend
    console.log('Saving notes:', notesData)
    
    // Show success message (you can replace with a toast notification)
    alert('Curfew notes added successfully!')
    
    // Close modal and reset form
    handleCloseModal()
  }

  // Function to trigger date picker
  const triggerDatePicker = () => {
    const dateInput = document.getElementById('notes-date');
    if (dateInput) dateInput.showPicker();
  }

  // Function to trigger time picker
  const triggerTimePicker = () => {
    // Create modal backdrop for time picker
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
    modalOverlay.style.zIndex = '10000';
    
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
    timeInput.style.marginBottom = '1.5rem';
    
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
    
    // Handle OK button click
    okBtn.addEventListener('click', () => {
      const time24 = timeInput.value;
      if (time24) {
        const [hours, minutes] = time24.split(':');
        const hour = parseInt(hours, 10);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const hour12 = hour % 12 || 12;
        const formattedTime = `${hour12}:${minutes} ${ampm}`;
        setNotesData({ ...notesData, time: formattedTime });
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
    buttonsContainer.appendChild(cancelBtn);
    buttonsContainer.appendChild(okBtn);
    
    pickerContainer.appendChild(title);
    pickerContainer.appendChild(timeInput);
    pickerContainer.appendChild(buttonsContainer);
    
    modalOverlay.appendChild(pickerContainer);
    document.body.appendChild(modalOverlay);
    
    // Automatically show the time picker
    setTimeout(() => timeInput.showPicker(), 100);
  }

  return (
    <DashboardLayout active="/curfew-logs">
      <div className="min-h-full">
        <section className="overflow-hidden rounded-xl">
          {/* Info bar: CURFEW NO., RESIDENT NAME (left) | Add Curfew Notes (right) */}
          <div className="flex flex-col gap-4 py-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap gap-3">
              <span className="rounded-md bg-blue-700 px-4 py-2.5 text-sm font-bold uppercase tracking-wide text-white shadow-sm">
                CURFEW NO. : {String(curfewNo).padStart(2, '0')}
              </span>
              <span className="rounded-md bg-blue-700 px-4 py-2.5 text-sm font-bold uppercase tracking-wide text-white shadow-sm">
                RESIDENT NAME : {residentName}
              </span>
            </div>
            <button
              type="button"
              onClick={handleAddNotes}
              className="flex items-center gap-2 rounded-md bg-gradient-to-r from-[#1a3a8a] to-[#1b9ad4] px-4 py-2.5 text-sm font-semibold text-white shadow hover:bg-blue-700"
            >
              <img src="/src/assets/curcur.svg" alt="add" className="h-5 w-5" />
              <span>Add Curfew Notes</span>
            </button>
          </div>

          {/* Add Notes Modal */}
          {showNotesModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm transition-opacity">
  <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
    <h2 className="mb-4 text-lg font-semibold text-slate-800">Add Curfew Notes</h2>
    
    <div className="space-y-4">
      {/* Date Field - Fixed: Added container div and consistent padding */}
      <div>
        <label className="mb-1.5 block text-xs font-semibold text-slate-700">Date</label>
        <input
          id="notes-date"
          type="date"
          className="w-full rounded-md border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-600"
          value={notesData.date}
          onChange={(e) => setNotesData({ ...notesData, date: e.target.value })}
        />
      </div>

      {/* Time Field - Fixed: Consistent py-2.5 */}
      <div>
        <label className="mb-1.5 block text-xs font-semibold text-slate-700">Time</label>
        <div className="relative">
          <input
            type="text"
            className={`w-full rounded-md border ${errors.time ? 'border-red-500 bg-red-50' : 'border-slate-300 bg-slate-50'} px-3 py-2.5 pr-10 text-sm text-slate-700 outline-none focus:border-[#1976D2] focus:bg-white`}
            value={notesData.time}
            onChange={(e) => setNotesData({ ...notesData, time: e.target.value })}
            placeholder="12:00 AM"
          />
          <span 
            className="absolute inset-y-0 right-3 flex cursor-pointer items-center text-slate-400 hover:text-slate-600"
            onClick={triggerTimePicker}
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </span>
        </div>
        {errors.time && <span className="mt-1 text-xs text-red-600">{errors.time}</span>}
      </div>

      {/* Notes Field - Fixed: Consistent py-2.5 */}
      <div>
        <label className="mb-1.5 block text-xs font-semibold text-slate-700">Notes</label>
        <textarea
          rows={4}
          className={`w-full rounded-md border ${errors.notes ? 'border-red-500 bg-red-50' : 'border-slate-300 bg-slate-50'} px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-[#1976D2] focus:bg-white`}
          value={notesData.notes}
          onChange={(e) => setNotesData({ ...notesData, notes: e.target.value })}
          placeholder="Enter curfew notes..."
        />
        {errors.notes && <span className="mt-1 text-xs text-red-600">{errors.notes}</span>}
      </div>
    </div>

    {/* Modal Buttons */}
    <div className="mt-6 flex justify-end gap-3">
      <button
        type="button"
        onClick={handleCloseModal}
        className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
      >
        Cancel
      </button>
      <button
        type="button"
        onClick={handleSubmitNotes}
        className="rounded-md bg-gradient-to-r from-[#1a3a8a] to-[#1b9ad4] px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
      >
        Add Notes
      </button>
    </div>
  </div>
</div>
          )}

          {/* CURFEW FOLDERS: gradient header + list */}
          <div className="overflow-hidden">
            <div className="flex items-center justify-between rounded-t-lg bg-blue-700 px-6 py-4 text-white shadow-sm">
              <span className="font-bold uppercase tracking-wide">CURFEW FOLDERS</span>
              <span className="font-bold uppercase tracking-wide">Actions</span>
            </div>
            <ul className="divide-y divide-gray-200">
              {folders.map((folder) => (
                <li
                  key={folder.id}
                  className="flex items-center justify-between bg-white px-6 py-4 hover:bg-gray-50/80"
                >
                <div className="flex items-center gap-3">
                  <img
                    src="/src/assets/lagayan.svg"
                    alt=""
                    className="h-6 w-6 flex-shrink-0 text-blue-600"
                  />
                  <span className="font-medium text-slate-800">{folder.name}</span>
                </div>
                <div className="relative">
                  <button
                    type="button"
                    className="flex h-8 w-8 items-center justify-center rounded text-slate-500 hover:bg-slate-100 hover:text-slate-700"
                    onClick={() => setMenuOpen(menuOpen === folder.id ? null : folder.id)}
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                    </svg>
                  </button>
                  {menuOpen === folder.id && (
                    <>
                      <div
                        className="fixed inset-0 z-10"
                        onClick={() => setMenuOpen(null)}
                        aria-hidden
                      />
                      <div className="absolute right-0 top-full z-20 mt-1 flex flex-col gap-1 rounded-md border border-gray-200 bg-white py-1 shadow-lg">
                        <button
                          type="button"
                          className="rounded-md px-3 py-1.5 text-left text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700"
                          onClick={() => handleView(folder.id)}
                        >
                          View
                        </button>
                        <button
                          type="button"
                          className="rounded-md px-3 py-1.5 text-left text-xs font-semibold text-white bg-red-500 hover:bg-red-600"
                          onClick={() => handleDelete(folder.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </DashboardLayout>
  )
}

export default CurfewFoldersPage