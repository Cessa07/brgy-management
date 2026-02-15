import { useState, useRef, useEffect, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import DashboardLayout from '../layout/DashboardLayout'

const DEFAULT_OVERVIEW =
  "The present case arises from the alleged violation of the city/state-imposed curfew, intended to maintain public safety and order. The petitioner contends that the respondent breached the curfew restrictions, thereby potentially endangering community welfare. The matter requires judicial consideration to determine whether the respondent's actions constitute a lawful exception or a contravention of the established curfew regulations."

function ensureHtml(text) {
  if (!text || typeof text !== 'string') return '<p></p>'
  if (text.trim().startsWith('<')) return text
  return '<p>' + text.replace(/\n/g, '</p><p>') + '</p>'
}

function CurfewOverviewPage() {
  const { curfewNo, folderId } = useParams()
  const navigate = useNavigate()
  const folderNum = folderId || '1'

  const [isEditing, setIsEditing] = useState(false)

  // Saved version (HTML)
  const [overview, setOverview] = useState(() => ensureHtml(DEFAULT_OVERVIEW))

  // Draft version (HTML, used while editing)
  const [draftOverview, setDraftOverview] = useState(() => ensureHtml(DEFAULT_OVERVIEW))

  const [editDate, setEditDate] = useState('2026-10-30')
  const [editedDate, setEditedDate] = useState('2026-10-30')

  const [formatActive, setFormatActive] = useState({ bold: false, italic: false, underline: false })

  const editorRef = useRef(null)
  const fileInputLinkRef = useRef(null)
  const fileInputImageRef = useRef(null)
  const savedSelectionRef = useRef(null)

  const goToFolders = () => navigate(`/curfew-logs/${curfewNo}/folders`)
  const goToLogs = () => navigate('/curfew-logs')

  const handleSaveEdit = () => {
    setOverview(draftOverview) // commit draft
    setEditedDate(editDate)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setDraftOverview(overview) // revert draft
    setIsEditing(false)
  }

  const handleEditClick = () => {
    setDraftOverview(overview)
    setIsEditing(true)
  }

  const syncContent = useCallback(() => {
    if (editorRef.current) setDraftOverview(editorRef.current.innerHTML)
  }, [])

  const updateFormatState = useCallback(() => {
    try {
      setFormatActive({
        bold: document.queryCommandState('bold'),
        italic: document.queryCommandState('italic'),
        underline: document.queryCommandState('underline'),
      })
    } catch {
      // ignore when selection is outside editor
    }
  }, [])

  useEffect(() => {
    if (isEditing && editorRef.current) {
      editorRef.current.innerHTML = ensureHtml(draftOverview)
    }
  }, [isEditing])

  const saveSelection = useCallback(() => {
    const sel = window.getSelection()
    if (sel.rangeCount) savedSelectionRef.current = sel.getRangeAt(0).cloneRange()
  }, [])

  const restoreSelection = useCallback(() => {
    const sel = window.getSelection()
    const range = savedSelectionRef.current
    if (range && editorRef.current) {
      sel.removeAllRanges()
      try {
        sel.addRange(range)
      } catch {
        // range may be invalid
      }
    }
  }, [])

  const applyFormat = (type) => {
    const editor = editorRef.current
    if (!editor) return

    editor.focus()

    if (type === 'bold') {
      document.execCommand('bold', false, null)
    } else if (type === 'italic') {
      document.execCommand('italic', false, null)
    } else if (type === 'underline') {
      document.execCommand('underline', false, null)
    }

    syncContent()
    setTimeout(updateFormatState, 0)
  }

  const handleToolbarMouseDown = (e) => {
    e.preventDefault()
    saveSelection()
  }

  const handleLinkClick = () => {
    fileInputLinkRef.current?.click()
  }

  const handleImageClick = () => {
    fileInputImageRef.current?.click()
  }

  const handleLinkFileSelect = (e) => {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file || !editorRef.current) return

    editorRef.current.focus()
    restoreSelection()

    const url = URL.createObjectURL(file)
    const sel = window.getSelection()
    if (sel.toString()) {
      document.execCommand('createLink', false, url)
    } else {
      document.execCommand('insertHTML', false, `<a href="${url}" target="_blank" rel="noopener">${file.name}</a>`)
    }
    syncContent()
  }

  const handleImageFileSelect = (e) => {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file || !file.type.startsWith('image/') || !editorRef.current) return

    editorRef.current.focus()
    restoreSelection()

    const url = URL.createObjectURL(file)
    document.execCommand('insertImage', false, url)
    syncContent()
  }

  return (
    <DashboardLayout active="/curfew-logs">
      <div className="min-h-full bg-gray-100 pt-1">
        <section className="overflow-hidden rounded-2xl bg-white shadow-lg">
          
          {/* Header */}
          <div className="rounded-t-2xl bg-blue-700 px-8 py-6 text-white shadow-md">
            <h1 className="text-2xl font-bold uppercase tracking-wide md:text-3xl">
              CURFEW {folderNum} OVERVIEW
            </h1>
            <p className="mt-2 text-base text-white/95">
              Official summary of the conducted curfew session
            </p>
          </div>

          <div className="space-y-5 p-6 md:p-8">
            
            {/* Top Section */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <span className="rounded-full border border-blue-700 bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
                Curfew no. {folderNum}
              </span>

              <div className="flex items-center gap-3">
                {isEditing ? (
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-blue-700">
                      Date
                    </span>
                    <input
                      type="date"
                      value={editDate}
                      onChange={(e) => setEditDate(e.target.value)}
                      className="rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-600"
                    />
                  </div>
                ) : (
                  <span className="rounded-full border border-blue-700 bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
                    Date: {editedDate}
                  </span>
                )}

                {!isEditing && (
                  <button
                  type="button"
                  onClick={handleEditClick}
                  className="rounded-md bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 flex items-center gap-2"
                >
                  <img src="/src/assets/edit.svg" alt="Edit" className="w-4 h-4" />
                  Edit Case Overview
                </button>

                )}
              </div>
            </div>

            {/* Editing Mode */}
            {isEditing ? (
              <div className="space-y-3">
                <h3 className="text-sm font-bold uppercase tracking-wide text-gray-700">
                  CURFEW OVERVIEW
                </h3>

                <div
                  ref={editorRef}
                  contentEditable
                  suppressContentEditableWarning
                  onInput={syncContent}
                  onKeyUp={updateFormatState}
                  onMouseUp={updateFormatState}
                  data-placeholder="Type overview here..."
                  className="min-h-[12rem] w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-blue-600 empty:before:content-[attr(data-placeholder)] empty:before:text-gray-400"
                  style={{ outline: 'none' }}
                />

                <input
                  ref={fileInputLinkRef}
                  type="file"
                  className="hidden"
                  accept="*/*"
                  onChange={handleLinkFileSelect}
                  aria-hidden
                />
                <input
                  ref={fileInputImageRef}
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageFileSelect}
                  aria-hidden
                />

                {/* Formatting Buttons */}
                <div className="flex gap-1 text-gray-500">
                  <button
                    type="button"
                    onMouseDown={handleToolbarMouseDown}
                    onClick={() => applyFormat('bold')}
                    className={`rounded p-1.5 hover:bg-gray-100 hover:text-gray-700 ${formatActive.bold ? 'bg-gray-200 font-bold text-gray-800' : ''}`}
                    title="Bold"
                  >
                    B
                  </button>
                  <button
                    type="button"
                    onMouseDown={handleToolbarMouseDown}
                    onClick={() => applyFormat('italic')}
                    className={`rounded p-1.5 hover:bg-gray-100 hover:text-gray-700 ${formatActive.italic ? 'bg-gray-200 italic text-gray-800' : ''}`}
                    title="Italic"
                  >
                    I
                  </button>
                  <button
                    type="button"
                    onMouseDown={handleToolbarMouseDown}
                    onClick={() => applyFormat('underline')}
                    className={`rounded p-1.5 hover:bg-gray-100 hover:text-gray-700 ${formatActive.underline ? 'bg-gray-200 underline text-gray-800' : ''}`}
                    title="Underline"
                  >
                    U
                  </button>
                  <button
                    type="button"
                    onMouseDown={handleToolbarMouseDown}
                    onClick={handleLinkClick}
                    className="rounded p-1.5 hover:bg-gray-100 hover:text-gray-700"
                    title="Attach file (link)"
                  >
                    <img src="/src/assets/attach.svg" alt="" className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    onMouseDown={handleToolbarMouseDown}
                    onClick={handleImageClick}
                    className="rounded p-1.5 hover:bg-gray-100 hover:text-gray-700"
                    title="Insert image"
                  >
                    <img src="/src/assets/img.svg" alt="" className="w-5 h-5" />
                  </button>
                </div>

                {/* Save / Cancel */}
                <div className="flex justify-end gap-3 pt-4">
                  <button
                    onClick={handleCancel}
                    className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={handleSaveEdit}
                    className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                  >
                    Save
                  </button>
                </div>
              </div>
            ) : (
              <>
                {/* Display Mode */}
                <div className="rounded-lg border-2 border-blue-700 bg-white p-6">
                <div
                  className="curfew-overview-content text-sm leading-relaxed text-gray-700 [&_p]:my-1 [&_a]:text-blue-600 [&_a]:underline [&_img]:max-w-full [&_strong]:font-bold [&_em]:italic [&_u]:underline"
                  dangerouslySetInnerHTML={{ __html: ensureHtml(overview) }}
                />
                </div>

                <div className="flex flex-wrap justify-end gap-3 pt-4">
                  <button
                    onClick={goToFolders}
                    className="rounded-md bg-gray-400 px-4 py-2.5 text-sm font-semibold text-white hover:bg-gray-500"
                  >
                    Back to Curfew Folders
                  </button>

                  <button
                    onClick={goToLogs}
                    className="rounded-md bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
                  >
                    OK
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Bottom Back Button */}
          <div className="border-t border-gray-200 px-6 py-5 md:px-8 flex justify-end">
            <button
              onClick={goToLogs}
              className="rounded-md bg-gray-400 px-4 py-2.5 text-sm font-semibold text-white hover:bg-gray-500"
            >
              Back to Curfew Logs
            </button>
          </div>

        </section>
      </div>
    </DashboardLayout>
  )
}

export default CurfewOverviewPage
