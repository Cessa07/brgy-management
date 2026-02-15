import { useParams, useNavigate } from 'react-router-dom'
import DashboardLayout from '../layout/DashboardLayout'

const TIMELINE_EVENTS = [
  { date: 'Jan. 12, 2026', label: 'Summon Issued' },
  { date: 'Jan. 20, 2026', label: 'Failed to Appear' },
  { date: 'Feb 03, 2026', label: 'Second Summons' },
  { date: 'Feb 18, 2026', label: 'Blacklisted Approved' },
]

function BlacklistedDetailsPage() {
  const { id } = useParams()
  const navigate = useNavigate()

  return (
    <DashboardLayout active="/blacklisted">
      <div className="min-h-full bg-blue-50 pt-1">
        <div className="overflow-hidden rounded-2xl bg-white shadow-lg">
          {/* Page title: blue gradient, centered */}
          <div className="rounded-t-2xl bg-gradient-to-b from-blue-800 to-blue-700 px-6 py-6 text-center shadow-md">
            <h1 className="text-xl font-bold text-white md:text-2xl">
              Blacklisted Resident - Case Details
            </h1>
          </div>

          <div className="space-y-6 p-6 md:p-8">
            {/* Resident Details card */}
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <div className="h-24 w-24 flex-shrink-0 rounded-full bg-gray-200" />
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">Reyes, Timothy G.</h2>
                  <p className="text-sm text-gray-600">Resident ID: 01-166-2026</p>
                  <span className="mt-2 inline-block rounded-md bg-slate-900 px-3 py-1 text-xs font-semibold uppercase text-white">
                    BLACKLISTED
                  </span>
                </div>
              </div>
            </div>

            {/* Resident Information card */}
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="mb-4 border-l-4 border-blue-700 pl-3 text-base font-bold text-gray-800">
                | Resident Information
              </h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-xs font-semibold uppercase text-gray-500">Household no.</p>
                  <p className="text-sm font-medium text-gray-800">HN4820450670</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase text-gray-500">Contact number</p>
                  <p className="text-sm font-medium text-gray-800">0914-430-1203</p>
                </div>
                <div className="sm:col-span-2">
                  <p className="text-xs font-semibold uppercase text-gray-500">Address</p>
                  <p className="text-sm font-medium text-gray-800">Blk.1 Lot 2, Caloocan City, Metro Manila</p>
                </div>
              </div>
            </div>

            {/* Blacklist Information card */}
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="mb-4 border-l-4 border-blue-700 pl-3 text-base font-bold text-gray-800">
                | Blacklist Information
              </h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-xs font-semibold uppercase text-gray-500">Case Number</p>
                  <p className="text-sm font-medium text-gray-800">01-166-05-2026</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase text-gray-500">Date Blacklisted</p>
                  <p className="text-sm font-medium text-gray-800">10-10-2026</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase text-gray-500">Case Type</p>
                  <p className="text-sm font-medium text-gray-800">Lupon</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase text-gray-500">Moderator</p>
                  <p className="text-sm font-medium text-gray-800">Lupon Tagamapayapa</p>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-xs font-semibold uppercase text-gray-500">Reason</p>
                <p className="mt-1 text-sm text-gray-700">
                  Resident repeatedly failed to attend summons hearings and violated settlement agreement multiple times.
                </p>
              </div>
            </div>

            {/* Case Timeline card */}
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="mb-4 border-l-4 border-blue-700 pl-3 text-base font-bold text-gray-800">
                | Case Timeline
              </h3>
              <div className="relative flex flex-col gap-4 pl-6">
                <div className="absolute left-[5px] top-2 bottom-2 w-0.5 bg-blue-600" />
                {TIMELINE_EVENTS.map((event, i) => (
                  <div key={i} className="relative flex items-start gap-3">
                    <span className="absolute -left-6 mt-1.5 h-3 w-3 rounded-full bg-blue-600" />
                    <p className="text-sm font-semibold text-gray-800">
                      {event.date} - {event.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Back to Blacklist Records - right-aligned, grey button */}
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => navigate('/blacklisted')}
                className="rounded-lg border border-gray-400 bg-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-800 hover:bg-gray-300"
              >
                Back to Blacklist Records
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default BlacklistedDetailsPage
