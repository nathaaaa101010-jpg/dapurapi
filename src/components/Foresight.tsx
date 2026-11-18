import { useState } from 'react';
import { Compass } from 'lucide-react';
import { FORESIGHT_QUADRANTS, type ForesightQuadrant } from '../data';
import { RevealSection } from './RevealSection';

export function Foresight() {
  const [activeId, setActiveId] = useState<string>('berdaulat');

  // Arrange 2x2 grid:
  // Top row (Regulasi Tinggi): left = patuh-mahal (LPG Rendah), right = berdaulat (LPG Tinggi)
  // Bottom row (Regulasi Rendah): left = status-quo (LPG Rendah), right = inisiatif-mandiri (LPG Tinggi)
  const orderedIds = ['patuh-mahal', 'berdaulat', 'status-quo', 'inisiatif-mandiri'];
  const quadrants = orderedIds
    .map((id) => FORESIGHT_QUADRANTS.find((q) => q.id === id))
    .filter((q): q is ForesightQuadrant => Boolean(q));

  const selected =
    FORESIGHT_QUADRANTS.find((q) => q.id === activeId) ?? FORESIGHT_QUADRANTS[1];

  return (
    <RevealSection
      id="foresight"
      className="py-14 sm:py-16 bg-[#E9EDF5]/35 border-b border-[#E9EDF5]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-8">
          <p className="text-xs font-semibold tracking-wide text-[#5A6275]">
            Bagian 09 · Pandangan Strategis 2030
          </p>
          <h2 className="mt-1 text-2xl sm:text-3xl font-extrabold text-[#1F2A44] text-balance">
            Matriks Foresight 2030: Ketahanan Kebijakan di Empat Skenario Masa Depan
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#5A6275] leading-relaxed">
            Klik salah satu kuadran untuk melihat strategi adaptif terhadap dinamika regulasi energi-limbah dan harga LPG nonsubsidi.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Matriks 2x2 (7 cols) */}
          <div className="lg:col-span-7 rounded-xl border border-[#E9EDF5] bg-white p-5">
            <div className="flex items-stretch gap-3">
              {/* Sumbu Y */}
              <div className="flex flex-col justify-between items-center py-4 w-8 shrink-0 text-[11px] font-bold text-[#5A6275]">
                <span>Tinggi</span>
                <span className="-rotate-90 whitespace-nowrap text-[#1F2A44]">
                  Dukungan Regulasi Energi-Limbah
                </span>
                <span>Rendah</span>
              </div>

              <div className="flex-1">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {quadrants.map((q) => {
                    const isSelected = q.id === selected.id;
                    const isIdeal = q.id === 'berdaulat';
                    return (
                      <button
                        key={q.id}
                        type="button"
                        onClick={() => setActiveId(q.id)}
                        className={`text-left rounded-xl border p-4 min-h-[132px] flex flex-col justify-between transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1F2A44] ${
                          isSelected
                            ? 'border-2 border-[#1F2A44] bg-[#FFF6DC]'
                            : isIdeal
                            ? 'border-[#C9A227] bg-[#FFF6DC]/45 hover:bg-[#FFF6DC]/80'
                            : 'border-[#E9EDF5] bg-[#E9EDF5]/25 hover:bg-[#E9EDF5]/55'
                        }`}
                      >
                        <div>
                          <p className="text-[11px] font-semibold text-[#5A6275]">
                            Regulasi {q.posisiRegulasi} · Harga LPG {q.posisiHargaLpg}
                          </p>
                          <h3 className="mt-1 text-base font-extrabold text-[#1F2A44]">
                            {q.judul}
                          </h3>
                        </div>
                        <p className="mt-2 text-xs text-[#5A6275] leading-snug">
                          {q.kondisi}
                        </p>
                      </button>
                    );
                  })}
                </div>

                {/* Sumbu X */}
                <div className="mt-3 pt-2 border-t border-[#E9EDF5] flex items-center justify-between text-[11px] font-bold text-[#5A6275]">
                  <span>Rendah</span>
                  <span className="text-[#1F2A44]">Harga LPG Nonsubsidi</span>
                  <span>Tinggi</span>
                </div>
              </div>
            </div>
          </div>

          {/* Panel Strategi Adaptif (5 cols) */}
          <div className="lg:col-span-5 rounded-xl border-2 border-[#C9A227] bg-white overflow-hidden">
            <div className="bg-[#1F2A44] px-5 py-3.5 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-[#C9A227]" aria-hidden="true" />
                <h3 className="text-base font-bold text-white">{selected.judul}</h3>
              </div>
              <span className="text-xs font-mono text-[#C9A227]">2030</span>
            </div>

            <div className="p-5 space-y-4">
              <div className="text-xs text-[#5A6275]">
                Posisi Sumbu:{' '}
                <span className="font-bold text-[#1F2A44]">
                  Regulasi {selected.posisiRegulasi} / Harga LPG {selected.posisiHargaLpg}
                </span>
              </div>

              <div>
                <p className="text-xs font-bold text-[#1F2A44]">Gambaran Kondisi</p>
                <p className="mt-1 text-sm text-[#5A6275] leading-relaxed">
                  {selected.kondisi}
                </p>
              </div>

              <div className="rounded-lg bg-[#FFF6DC] border border-[#C9A227]/60 p-3.5">
                <p className="text-xs font-bold text-[#1F2A44]">Strategi Adaptif</p>
                <p className="mt-1 text-xs sm:text-sm text-[#1F2A44] leading-relaxed">
                  {selected.strategi}
                </p>
              </div>

              <div>
                <p className="text-xs font-bold text-[#1F2A44]">Tindakan Kunci</p>
                <p className="mt-1 text-xs sm:text-sm text-[#5A6275] leading-relaxed">
                  {selected.tindakanKunci}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </RevealSection>
  );
}
