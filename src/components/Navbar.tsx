import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { href: '#masalah', label: 'Masalah' },
  { href: '#mekanisme', label: 'Mekanisme' },
  { href: '#kalkulator', label: 'Kalkulator' },
  { href: '#peta-jalan', label: 'Peta Jalan' },
  { href: '#risiko', label: 'Risiko' },
  { href: '#pustaka', label: 'Pustaka' },
];

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-[#E9EDF5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between gap-8">
        <a
          href="#beranda"
          className="text-base sm:text-lg font-extrabold tracking-tight text-[#1F2A44] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C9A227] rounded"
        >
          DAUR-API
        </a>

        <nav
          aria-label="Navigasi utama"
          className="hidden md:flex items-center gap-6 text-sm font-medium text-[#5A6275]"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-[#1F2A44] hover:underline underline-offset-4 decoration-[#C9A227] decoration-2 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C9A227] rounded"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3 shrink-0">
          <a
            href="#kalkulator"
            className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-xs font-semibold text-[#1F2A44] bg-[#C9A227] hover:bg-[#b59020] rounded-lg transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1F2A44]"
          >
            Coba Kalkulator
          </a>

          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi'}
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg border border-[#E9EDF5] text-[#1F2A44] hover:bg-[#E9EDF5]/60 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C9A227]"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav
          aria-label="Navigasi seluler"
          className="md:hidden border-t border-[#E9EDF5] bg-white px-4 py-3 space-y-1"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={handleLinkClick}
              className="block px-3 py-2.5 text-sm font-medium text-[#1F2A44] rounded-lg hover:bg-[#E9EDF5]/60 transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#kalkulator"
            onClick={handleLinkClick}
            className="block mt-2 px-4 py-2.5 text-center text-sm font-semibold text-[#1F2A44] bg-[#C9A227] rounded-lg"
          >
            Coba Kalkulator
          </a>
        </nav>
      )}
    </header>
  );
}
