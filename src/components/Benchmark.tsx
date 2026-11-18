import { Globe } from 'lucide-react';
import { BENCHMARKS } from '../data';
import { RevealSection } from './RevealSection';

export function Benchmark() {
  return (
    <RevealSection
      id="benchmark"
      className="py-14 sm:py-16 bg-white border-b border-[#E9EDF5]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-8">
          <p className="text-xs font-semibold tracking-wide text-[#5A6275]">
            Bagian 08 · Pembelajaran Global
          </p>
          <h2 className="mt-1 text-2xl sm:text-3xl font-extrabold text-[#1F2A44] text-balance">
            Benchmark Internasional Biogas Dapur Institusi dan Restoran
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#5A6275] leading-relaxed">
            Enam studi empiris lintas negara yang mendasari pilihan desain digester 6 m³ bawah tanah, ko-digesti, pembakaran langsung, dan pengendalian kebocoran metana.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {BENCHMARKS.map((item) => (
            <article
              key={item.wilayah}
              className="rounded-xl border border-[#E9EDF5] bg-white overflow-hidden flex flex-col justify-between"
            >
              <div>
                <div className="bg-[#1F2A44] px-5 py-3 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-[#C9A227]" aria-hidden="true" />
                    <h3 className="text-sm font-bold text-white">{item.wilayah}</h3>
                  </div>
                  <span className="text-[11px] text-[#E9EDF5]/80">{item.konteks}</span>
                </div>

                <div className="p-5">
                  <p className="text-sm font-semibold text-[#1F2A44] leading-relaxed">
                    {item.temuan}
                  </p>
                </div>
              </div>

              <div className="px-5 pb-5 space-y-3">
                <div className="rounded-lg border border-dashed border-[#C9A227] bg-[#FFF6DC] p-3">
                  <p className="text-[11px] font-bold text-[#1F2A44]">
                    Pelajaran untuk Banten
                  </p>
                  <p className="mt-1 text-xs text-[#1F2A44] leading-relaxed">
                    {item.pelajaran}
                  </p>
                </div>
                <p className="text-[11px] text-[#5A6275]">Sumber: {item.sumber}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </RevealSection>
  );
}
