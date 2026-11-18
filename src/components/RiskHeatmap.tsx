import { useState } from 'react';
import { ShieldAlert } from 'lucide-react';
import { RISK_ITEMS, type RiskItem } from '../data';
import { RevealSection } from './RevealSection';

function getCellStyle(score: number) {
  if (score <= 4) {
    return {
      bg: 'bg-[#2E7D4F]/15 hover:bg-[#2E7D4F]/25 border-[#2E7D4F]/30',
      text: 'text-[#2E7D4F]',
      level: 'Rendah (≤4)',
    };
  }
  if (score <= 9) {
    return {
      bg: 'bg-[#FFF6DC] hover:bg-[#f7ebc4] border-[#C9A227]/60',
      text: 'text-[#8F6F0F]',
      level: 'Sedang (5–9)',
    };
  }
  if (score <= 14) {
    return {
      bg: 'bg-[#D97706]/15 hover:bg-[#D97706]/25 border-[#D97706]/40',
      text: 'text-[#B45309]',
      level: 'Tinggi (10–14)',
    };
  }
  return {
    bg: 'bg-[#B23A3A]/15 hover:bg-[#B23A3A]/25 border-[#B23A3A]/50',
    text: 'text-[#B23A3A]',
    level: 'Kritis (≥15)',
  };
}

export function RiskHeatmap() {
  const [selectedRisk, setSelectedRisk] = useState<RiskItem>(RISK_ITEMS[0]);

  // Rows: P = 5 down to 1; Cols: D = 1 to 5
  const probLevels = [5, 4, 3, 2, 1];
  const impactLevels = [1, 2, 3, 4, 5];

  return (
    <RevealSection
      id="risiko"
      className="py-14 sm:py-16 bg-white border-b border-[#E9EDF5]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-8">
          <p className="text-xs font-semibold tracking-wide text-[#5A6275]">
            Bagian 06 · Manajemen Risiko (P × D)
          </p>
          <h2 className="mt-1 text-2xl sm:text-3xl font-extrabold text-[#1F2A44] text-balance">
            Peta Panas Risiko Operasional, Higiene, dan Tata Kelola (5×5)
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#5A6275] leading-relaxed">
            Klik sel atau kode risiko (R1–R8) untuk melihat skema mitigasi teknis serta penanggung jawabnya.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Matriks 5x5 (7 cols) */}
          <div className="lg:col-span-7 rounded-xl border border-[#E9EDF5] bg-white p-4 sm:p-5 overflow-x-auto">
            <div className="min-w-[460px]">
              <div className="grid grid-cols-[64px_repeat(5,minmax(0,1fr))] gap-1.5 items-center">
                <div className="text-[11px] font-bold text-[#5A6275] text-center">
                  P \ D
                </div>
                {impactLevels.map((d) => (
                  <div
                    key={d}
                    className="text-center text-xs font-bold text-[#1F2A44] py-1 tabular-nums"
                  >
                    D = {d}
                  </div>
                ))}

                {probLevels.map((p) => (
                  <div key={p} className="contents">
                    <div className="text-xs font-bold text-[#1F2A44] text-center py-3 tabular-nums">
                      P = {p}
                    </div>
                    {impactLevels.map((d) => {
                      const score = p * d;
                      const style = getCellStyle(score);
                      const cellRisks = RISK_ITEMS.filter((r) => r.p === p && r.d === d);
                      const hasSelected = cellRisks.some(
                        (r) => r.kode === selectedRisk.kode,
                      );

                      return (
                        <div
                          key={`${p}-${d}`}
                          className={`min-h-[68px] rounded-lg border p-1.5 flex flex-col justify-between transition-colors ${
                            style.bg
                          } ${hasSelected ? 'ring-2 ring-[#1F2A44]' : ''}`}
                        >
                          <span
                            className={`text-[10px] font-mono font-bold tabular-nums ${style.text}`}
                          >
                            {score}
                          </span>

                          {cellRisks.length > 0 ? (
                            <div className="flex flex-wrap gap-1 mt-1">
                              {cellRisks.map((risk) => {
                                const isSel = risk.kode === selectedRisk.kode;
                                return (
                                  <button
                                    key={risk.kode}
                                    type="button"
                                    onClick={() => setSelectedRisk(risk)}
                                    title={`${risk.kode}: ${risk.nama}`}
                                    className={`px-1.5 py-0.5 rounded text-[11px] font-mono font-bold transition-colors focus-visible:outline-2 focus-visible:outline-[#1F2A44] ${
                                      isSel
                                        ? 'bg-[#1F2A44] text-[#C9A227]'
                                        : 'bg-white text-[#1F2A44] border border-[#1F2A44]/20 hover:bg-[#1F2A44] hover:text-white'
                                    }`}
                                  >
                                    {risk.kode}
                                  </button>
                                );
                              })}
                            </div>
                          ) : (
                            <span className="text-[10px] text-[#5A6275]/40">—</span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>

              {/* Legenda Warna & Label */}
              <div className="mt-4 pt-3 border-t border-[#E9EDF5] flex flex-wrap items-center gap-4 text-[11px] font-semibold">
                <span className="inline-flex items-center gap-1.5 text-[#2E7D4F]">
                  <span className="w-3 h-3 rounded bg-[#2E7D4F]/25 border border-[#2E7D4F]" />
                  ≤4 Hijau (Rendah)
                </span>
                <span className="inline-flex items-center gap-1.5 text-[#8F6F0F]">
                  <span className="w-3 h-3 rounded bg-[#FFF6DC] border border-[#C9A227]" />
                  5–9 Kuning (Sedang)
                </span>
                <span className="inline-flex items-center gap-1.5 text-[#B45309]">
                  <span className="w-3 h-3 rounded bg-[#D97706]/25 border border-[#D97706]" />
                  10–14 Oranye (Tinggi)
                </span>
                <span className="inline-flex items-center gap-1.5 text-[#B23A3A]">
                  <span className="w-3 h-3 rounded bg-[#B23A3A]/25 border border-[#B23A3A]" />
                  ≥15 Merah (Kritis)
                </span>
              </div>
              <p className="mt-2 text-[11px] text-[#5A6275]">
                Sumber: Identifikasi risiko program DAUR-API (penilaian penulis).
              </p>
            </div>
          </div>

          {/* Detail Risiko Terpilih & Daftar R1-R8 (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="rounded-xl border-2 border-[#1F2A44] bg-white overflow-hidden">
              <div className="bg-[#1F2A44] px-5 py-3.5 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-[#C9A227]" aria-hidden="true" />
                  <h3 className="text-sm font-bold text-white">
                    {selectedRisk.kode}: {selectedRisk.nama}
                  </h3>
                </div>
                <span className="text-xs font-mono font-bold text-[#C9A227] tabular-nums">
                  P={selectedRisk.p} × D={selectedRisk.d} = {selectedRisk.skor}
                </span>
              </div>

              <div className="p-5 space-y-3">
                <div className="text-xs font-semibold text-[#5A6275]">
                  Tingkat Risiko:{' '}
                  <span className={getCellStyle(selectedRisk.skor).text}>
                    {getCellStyle(selectedRisk.skor).level}
                  </span>
                </div>
                <div>
                  <p className="text-xs font-bold text-[#1F2A44]">Rencana Mitigasi</p>
                  <p className="mt-1 text-xs sm:text-sm text-[#5A6275] leading-relaxed">
                    {selectedRisk.mitigasi}
                  </p>
                </div>
                <div className="pt-2 border-t border-[#E9EDF5] text-xs">
                  <span className="font-bold text-[#1F2A44]">Penanggung Jawab: </span>
                  <span className="text-[#5A6275]">{selectedRisk.penanggungJawab}</span>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-[#E9EDF5] bg-white p-4">
              <p className="text-xs font-bold text-[#1F2A44] mb-2.5">
                Daftar Lengkap Risiko (R1–R8)
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {RISK_ITEMS.map((r) => {
                  const active = r.kode === selectedRisk.kode;
                  const style = getCellStyle(r.skor);
                  return (
                    <button
                      key={r.kode}
                      type="button"
                      onClick={() => setSelectedRisk(r)}
                      className={`text-left px-3 py-2 rounded-lg border text-xs transition-colors flex items-center justify-between gap-2 ${
                        active
                          ? 'border-[#1F2A44] bg-[#E9EDF5]/60 font-bold'
                          : 'border-[#E9EDF5] hover:bg-[#E9EDF5]/30'
                      }`}
                    >
                      <span className="text-[#1F2A44] truncate">
                        <span className="font-mono font-bold mr-1">{r.kode}</span>
                        {r.nama}
                      </span>
                      <span className={`font-mono font-bold tabular-nums shrink-0 ${style.text}`}>
                        {r.p}×{r.d}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </RevealSection>
  );
}
