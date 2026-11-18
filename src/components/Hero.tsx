import { ArrowDown, Flame } from 'lucide-react';
import { HERO_STATS } from '../data';

export function Hero() {
  return (
    <section
      id="beranda"
      className="bg-white border-b border-[#E9EDF5] py-12 sm:py-16 lg:py-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-medium text-[#5A6275] mb-4">
            <span className="inline-flex items-center gap-1.5 font-semibold text-[#1F2A44]">
              <Flame className="w-4 h-4 text-[#C9A227]" aria-hidden="true" />
              Dapur Ubah Residu menjadi Api
            </span>
            <span aria-hidden="true">·</span>
            <span>Esai Kebijakan BETF 2026</span>
            <span aria-hidden="true">·</span>
            <span>Subtema 1: Inovasi Energi Terbarukan Berbasis Potensi Lokal</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-[#1F2A44] leading-[1.15] tracking-tight text-balance">
            DAUR-API: Mengubah Kewajiban Pengolahan Sisa Pangan dan Air Limbah Dapur MBG menjadi Substitusi LPG Terverifikasi di Provinsi Banten
          </h1>

          <figure className="mt-6 py-4 border-y border-[#E9EDF5] max-w-2xl">
            <blockquote className="text-base sm:text-lg font-medium italic text-[#1F2A44]">
              “Food waste is a global tragedy.”
            </blockquote>
            <figcaption className="mt-1 text-xs sm:text-sm text-[#5A6275]">
              — Inger Andersen, UNEP (2024)
            </figcaption>
          </figure>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <a
              href="#kalkulator"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#1F2A44] text-white text-sm font-semibold hover:bg-[#162036] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C9A227]"
            >
              Coba Kalkulator
              <ArrowDown className="w-4 h-4 text-[#C9A227]" aria-hidden="true" />
            </a>
            <a
              href="#mekanisme"
              className="inline-flex items-center px-5 py-3 rounded-xl border border-[#1F2A44]/20 text-[#1F2A44] text-sm font-semibold hover:bg-[#E9EDF5]/50 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C9A227]"
            >
              Lihat Alur Kebijakan
            </a>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {HERO_STATS.map((stat) => (
            <article
              key={stat.id}
              className="rounded-xl border border-[#E9EDF5] bg-white overflow-hidden flex flex-col justify-between"
            >
              <div className="bg-[#1F2A44] px-4 py-2.5">
                <p className="text-xs font-semibold text-white tracking-wide">
                  {stat.label}
                </p>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-3xl sm:text-4xl font-extrabold text-[#1F2A44] tabular-nums tracking-tight">
                    {stat.angka}
                  </p>
                  <p className="mt-2 text-sm text-[#5A6275] leading-relaxed">
                    {stat.konteks}
                  </p>
                </div>
                <p className="mt-4 pt-3 border-t border-[#E9EDF5] text-xs text-[#5A6275]">
                  Sumber: {stat.sumber}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
