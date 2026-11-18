import { Printer } from 'lucide-react';

export function Footer() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <footer className="bg-[#1F2A44] text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs sm:text-sm font-medium text-[#E9EDF5]">
          DAUR-API · Esai BETF 2026 · [Nama Lengkap]
        </p>

        <button
          type="button"
          onClick={handlePrint}
          className="no-print inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#C9A227] text-[#1F2A44] text-xs font-bold hover:bg-[#b59020] transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          <Printer className="w-4 h-4" aria-hidden="true" />
          Unduh ringkasan
        </button>
      </div>
    </footer>
  );
}
