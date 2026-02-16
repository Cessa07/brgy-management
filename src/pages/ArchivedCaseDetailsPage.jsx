import { useParams, useNavigate } from 'react-router-dom'
import DashboardLayout from '../layout/DashboardLayout'

const ATTACHED_DOCS = [
  { name: 'Complainant_Form.pdf' },
  { name: 'Complainant_Form.pdf' },
  { name: 'Complainant_Form.pdf' },
]

function ArchivedCaseDetailsPage() {
  const { id } = useParams()
  const navigate = useNavigate()

  return (
    <DashboardLayout active="/archived">
      <div className="min-h-full bg-gray-100 pt-1">
        <div className="rounded-t-2xl overflow-hidden bg-white shadow-md">
          {/* Page title: blue gradient, centered, rounded top */}
          <div className="rounded-t-2xl bg-gradient-to-r from-blue-800 to-blue-600 px-6 py-5 text-center shadow-md">
            <h1 className="text-xl font-bold text-white md:text-2xl">
              Archived Case Details
            </h1>
          </div>

          <div className="space-y-4 p-6 md:p-8">
            {/* Case Summary */}
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="mb-4 border-l-4 border-blue-700 pl-3 text-base font-bold text-gray-800">
                Case Summary
              </h3>
              <div className="mb-4 flex flex-wrap gap-2">
                <span className="rounded-full bg-yellow-400 px-3 py-1 text-xs font-semibold uppercase text-gray-800">
                  BLOTTER
                </span>
                <span className="rounded-full bg-gray-600 px-3 py-1 text-xs font-semibold uppercase text-white">
                  ARCHIVED
                </span>
              </div>
              <div className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
                <div>
                  <p className="text-xs font-medium text-gray-500">Case Number</p>
                  <p className="text-sm font-medium text-gray-800">01-166-05-2026</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500">Date Filed</p>
                  <p className="text-sm font-medium text-gray-800">January 12, 2025</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500">Archived Date</p>
                  <p className="text-sm font-medium text-gray-800">March 01, 2025</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500">Resident Name</p>
                  <p className="text-sm font-bold text-gray-800">Reyes, Timothy G.</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500">Date Closed</p>
                  <p className="text-sm font-medium text-gray-800">February 18, 2025</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500">Moderator</p>
                  <p className="text-sm font-medium text-gray-800">Lupon Tagapamayapa</p>
                </div>
              </div>
            </div>

            {/* Case Details */}
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="mb-4 border-l-4 border-blue-700 pl-3 text-base font-bold text-gray-800">
                Case Details
              </h3>
              <div className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
                <div>
                  <p className="text-xs font-medium text-gray-500">Complainant</p>
                  <p className="text-sm font-bold text-gray-800">Reyes, Timothy G.</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500">Defendants</p>
                  <p className="text-sm font-medium text-gray-800">Juan Dela Cruz</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500">Incident Date</p>
                  <p className="text-sm font-medium text-gray-800">January 10, 2025</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500">Location</p>
                  <p className="text-sm font-medium text-gray-800">166, Caloocan City, Metro Manila</p>
                </div>
                <div className="sm:col-span-2">
                  <p className="text-xs font-medium text-gray-500">Detailed Description</p>
                  <div className="mt-1 rounded-md bg-gray-100 p-4 text-sm text-gray-700">
                    The complainant reported repeated disturbance and violation of barangay mediation agreement. Multiple summons were issued but respondent failed to comply.
                  </div>
                </div>
              </div>
            </div>

            {/* Resolution Summary */}
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="mb-4 border-l-4 border-blue-700 pl-3 text-base font-bold text-gray-800">
                Resolution Summary
              </h3>
              <div className="mb-4">
                <p className="text-xs font-medium text-gray-500">Settlement Status</p>
                <span className="mt-1 inline-block rounded-full bg-red-500 px-3 py-1 text-xs font-semibold uppercase text-white">
                  ESCALATED
                </span>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500">Detailed Description</p>
                <div className="mt-1 rounded-md bg-gray-100 p-3 text-sm text-gray-700">
                  Case escalated to higher authority after unsuccessful mediation process.
                </div>
              </div>
            </div>

            {/* Attached Documents */}
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="mb-4 border-l-4 border-blue-700 pl-3 text-base font-bold text-gray-800">
                Attached Documents
              </h3>
              <ul className="space-y-3">
                {ATTACHED_DOCS.map((doc, i) => (
                  <li key={i} className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-100 pb-3 last:border-0 last:pb-0">
                    <span className="text-sm font-medium text-gray-800">{doc.name}</span>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        className="rounded-md bg-green-500 px-3 py-1 text-sm font-semibold text-white hover:bg-green-600"
                      >
                        Download
                      </button>
                      <button
                        type="button"
                        className="rounded-md bg-blue-500 px-3 py-1 text-sm font-semibold text-white hover:bg-blue-600"
                      >
                        View
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Archived Information */}
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="mb-4 border-l-4 border-blue-700 pl-3 text-base font-bold text-gray-800">
                Archived Information
              </h3>
              <div className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
                <div>
                  <p className="text-xs font-medium text-gray-500">Archived By</p>
                  <p className="text-sm font-medium text-gray-800">Barangay Administrator</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500">Reason for Archiving</p>
                  <p className="text-sm font-medium text-gray-800">Case completed and inactive for 30 days.</p>
                </div>
              </div>
            </div>

            {/* Back to Archived - right-aligned, grey button */}
            <div className="mt-8 flex justify-end">
              <button
                type="button"
                onClick={() => navigate('/archived')}
                className="rounded-lg border border-gray-400 bg-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-800 hover:bg-gray-300"
              >
                Back to Archived
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default ArchivedCaseDetailsPage
