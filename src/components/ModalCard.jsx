import PropTypes from 'prop-types'

function ModalCard({ title, onClose, children, widthClass = 'max-w-xl', headerClass = '', titleClass = '', darkHeader, headerIcon }) {
  const isDark = darkHeader || headerClass.includes('bg-[') || headerClass.includes('bg-blue')
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm transition-opacity">
      <div
        className={`w-full ${widthClass} relative flex max-h-[90vh] flex-col overflow-hidden rounded-2xl border border-[#c5d3f5] bg-white shadow-2xl`}
      >
        {/* Header */}
        <div className={`flex flex-shrink-0 items-center justify-between border-b p-4 md:p-6 ${headerClass} ${isDark ? 'border-white/20' : 'border-slate-200'}`}>
          <h2 className={`flex items-center gap-2 text-lg font-bold tracking-wide ${titleClass || (isDark ? 'text-white' : 'text-[#2552c4]')}`}>
            {headerIcon}
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${isDark ? 'bg-white/20 text-white hover:bg-white/30' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
          >
            ✕
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6">
          {children}
        </div>
      </div>
    </div>
  )
}

ModalCard.propTypes = {
  title: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  widthClass: PropTypes.string,
  headerClass: PropTypes.string,
  titleClass: PropTypes.string,
  darkHeader: PropTypes.bool,
  headerIcon: PropTypes.node,
}

export default ModalCard

