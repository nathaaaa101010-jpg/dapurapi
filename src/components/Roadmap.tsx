import { Flag, Milestone } from 'lucide-react';
import { KPI_TABLE, PENTAHELIX_ACTORS, ROADMAP_PHASES } from '../data';
import { RevealSection } from './RevealSection';

export function Roadmap() {
  return (
    <RevealSection
      id="peta-jalan"
      className="py-14 sm:py-16 bg-[#E9EDF5]/35 border-b border-[#E9EDF5]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div>
          <p className="text-xs font-semibold tracking-wide text-[#5A6275]">
            Bagian 05 · Implementasi &amp; Tata Kelola
          </p>
          <h2 className="mt-1 text-2xl sm:text-3xl font-extrabold text-[#1F2A44] text-balance">
            Peta Jalan Bertahap (2026–2029), Pentahelix, dan Indikator Kinerja
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#5A6275] max-w-3xl leading-relaxed">
            Setiap tahap ekspansi hanya dibuka apabila gerbang verifikasi teknis, lingkungan, dan keekonomian pada fase sebelumnya terpenuhi.
          </p>
        </div>

        {/* Garis waktu horizontal dengan gerbang */}
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#1F2A44] mb-4">
            <Milestone className="w-4 h-4 text-[#C9A227]" aria-hidden="true" />
            <span>Linimasa Implementasi &amp; Gerbang Keputusan (Stage-Gate)</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {ROADMAP_PHASES.map((phase, idx) => (
              <article
                key={phase.fase}
                className="rounded-xl border border-[#E9EDF5] bg-white overflow-hidden flex flex-col justify-between"
              >
                <div>
                  <div className="bg-[#1F2A44] px-4 py-3 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-[#C9A227] text-[#1F2A44] text-xs font-extrabold flex items-center justify-center tabular-nums">
                        {idx}
                      </span>
                      <span className="text-sm font-bold text-white">{phase.fase}</span>
                    </div>
                    <span className="text-xs font-mono font-semibold text-[#C9A227]">
                      {phase.periode}
                    </span>
                  </div>

                  <div className="p-4">
                    <h3 className="text-sm font-bold text-[#1F2A44]">{phase.judul}</h3>
                    <p className="mt-2 text-xs text-[#5A6275] leading-relaxed">
                      {phase.rincian}
                    </p>
                  </div>
                </div>

                <div className="px-4 pb-4">
                  <div className="rounded-lg border border-dashed border-[#C9A227] bg-[#FFF6DC] p-3">
                    <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#1F2A44]">
                      <Flag className="w-3.5 h-3.5 text-[#C9A227] shrink-0" aria-hidden="true" />
                      <span>Gerbang (Gate):</span>
                    </div>
                    <p className="mt-1 text-xs font-semibold text-[#1F2A44] leading-snug">
                      {phase.gate}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Kartu Pentahelix */}
        <div>
          <h3 className="text-lg font-bold text-[#1F2A44] mb-4">
            Kolaborasi Pentahelix Provinsi Banten
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {PENTAHELIX_ACTORS.map((item) => (
              <div
                key={item.unsur}
                className="rounded-xl border border-[#E9EDF5] bg-white p-4 flex flex-col justify-between"
              >
                <div>
                  <p className="text-xs font-bold text-[#C9A227] uppercase tracking-wider">
                    {item.unsur}
                  </p>
                  <h4 className="mt-1 text-sm font-bold text-[#1F2A44]">{item.aktor}</h4>
                  <p className="mt-2 text-xs text-[#5A6275] leading-relaxed">
                    {item.peran}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tabel KPI */}
        <div className="rounded-xl border border-[#E9EDF5] bg-white overflow-hidden">
          <div className="bg-[#1F2A44] px-5 py-3.5 flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-base font-bold text-white">
              Tabel Indikator Kinerja Utama (KPI)
            </h3>
            <span className="text-xs text-[#E9EDF5]/80">
              Sumber: Sintesis Perbadan BGN 1, 4, 13/2026 &amp; perhitungan penulis
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-[#E9EDF5] bg-[#E9EDF5]/50 text-[#1F2A44]">
                  <th className="py-3 px-4 font-bold">Indikator</th>
                  <th className="py-3 px-4 font-bold">Formula</th>
                  <th className="py-3 px-4 font-bold">Baseline</th>
                  <th className="py-3 px-4 font-bold">Target</th>
                  <th className="py-3 px-4 font-bold">Frekuensi</th>
                  <th className="py-3 px-4 font-bold">Sumber Data</th>
                  <th className="py-3 px-4 font-bold">Penanggung Jawab</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E9EDF5]">
                {KPI_TABLE.map((row) => (
                  <tr key={row.indikator} className="hover:bg-[#E9EDF5]/25">
                    <td className="py-3 px-4 font-bold text-[#1F2A44]">{row.indikator}</td>
                    <td className="py-3 px-4 font-mono text-[11px] text-[#5A6275]">
                      {row.formula}
                    </td>
                    <td className="py-3 px-4 text-[#5A6275]">{row.baseline}</td>
                    <td className="py-3 px-4 font-bold text-[#2E7D4F] tabular-nums whitespace-nowrap">
                      {row.target}
                    </td>
                    <td className="py-3 px-4 text-[#5A6275] whitespace-nowrap">
                      {row.frekuensi}
                    </td>
                    <td className="py-3 px-4 text-[#5A6275]">{row.sumberData}</td>
                    <td className="py-3 px-4 font-medium text-[#1F2A44]">
                      {row.penanggungJawab}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </RevealSection>
  );
}
