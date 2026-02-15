import PropTypes from 'prop-types'

function TopBar({ onMenuClick }) {
  return (
    <header className="sticky top-0 z-10 flex h-20 items-center justify-between border-b border-[#c5d3f5] bg-white/95 shadow-md md:px-8">
      <div className="flex items-center gap-3">
        {/* Hamburger Menu for Mobile */}
        <button
          type="button"
          onClick={onMenuClick}
          className="mr-1 flex items-center justify-center text-[#2552c4] md:hidden"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <span className="max-w-[150px] text-xs font-semibold leading-tight text-[#2552c4] sm:max-w-none sm:text-sm md:text-base lg:text-lg">
          Barangay 166, Caybiga, Caloocan City
        </span>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        <div className="relative hidden sm:block">
          <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-slate-400">
            <img src="/src/assets/search-interface-symbol.svg" alt="logo" className="h-5 w-5" />
          </span>
          <input
            placeholder="Search..."
            className="h-10 w-full rounded-full border border-slate-200 bg-slate-50 px-4 pl-10 pr-4 text-sm outline-none ring-0 focus:border-[#2552c4] md:w-64 lg:w-96"
          />
        </div>

        {/* Mobile Search Icon (optional, if we want to show search on mobile) */}
        <button className="flex h-9 w-9 items-center justify-center sm:hidden">
          <img src="/src/assets/search-interface-symbol.svg" alt="logo" className="h-6 w-6" />
        </button>

        <button
          type="button"
          className="flex h-9 w-9 items-center justify-center"
        >
          <img src="/src/assets/settings.svg" alt="logo" className="h-6 w-6 md:h-7 md:w-7" />
        </button>
        <button
          type="button"
          className="flex h-9 w-9 items-center justify-center"
        >
          <img src="/src/assets/notify.svg" alt="logo" className="h-6 w-6 md:h-7 md:w-7" />
        </button>
        <button
          type="button"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-black text-white shadow-sm"
        >
          A
        </button>
      </div>
    </header>
  )
}

TopBar.propTypes = {
  onMenuClick: PropTypes.func,
}

export default TopBar

