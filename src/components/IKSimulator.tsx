import { useMemo, useState } from 'react';
import { ShieldCheck, Sparkles } from 'lucide-react';
import { calculateIK, formatId, formatIntId } from '../calc';
import { RevealSection } from './RevealSection';

export function IKSimulator() {
  const [nilaiO, setNilaiO] = useState(0.9);
  const [substitusiPct, setSubstitusiPct] = useState(11.9);
  const [gH, setGH] = useState(true);
  const [gL, setGL] = useState(true);

  const sim = useMemo(
    () => calculateIK({ nilaiO, substitusiPct, gH, gL, porsiPerHari: 3120, hariPerTahun: 141.5 }),
    [nilaiO, substitusiPct, gH, gL],
  );

  // SVG semi-circular gauge geometry
  const radius = 84;
  const circumference = Math.PI * radius;
  const dashOffset = circumference * (1 - Math.min(1, Math.max(0, sim.ik)));

  const statusColor =
    sim.keputusan === 'Lanjut'
      ? '#2E7D4F'
      : sim.keputusan === 'Perbaiki'
      ? '#C9A227'
      : '#B23A3A';

  return (
    <RevealSection
      id="simulator-ik"
      className="py-14 sm:py-16 bg-white border-b border-[#E9EDF5]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-8">
          <p className="text-xs font-semibold tracking-wide text-[#5A6275]">
            Bagian 04 · Instrumen Insentif Bersyarat
          </p>
          <h2 className="mt-1 text-2xl sm:text-3xl font-extrabold text-[#1F2A44] text-balance">
            Simulator Indeks Kinerja (IK) &amp; Verifikasi Lapangan
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#5A6275] leading-relaxed">
            Menghubungkan porsi 2,5% dari insentif Rp2.000/porsi (Perbadan BGN 13/2026) secara proporsional terhadap pengolahan organik dan substitusi LPG, dengan syarat mutlak kepatuhan higiene (G_H) serta efluen (G_L).
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Panel Kontrol & Meteran (7 cols) */}
          <div className="lg:col-span-7 rounded-xl border border-[#E9EDF5] bg-white overflow-hidden flex flex-col">
            <div className="bg-[#1F2A44] px-5 py-3.5 flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-base font-bold text-white">
                Simulasi Skor IK = G_H × G_L × (0,5·O + 0,5·E)
              </h3>
              <button
                type="button"
                onClick={() => {
                  setNilaiO(0.9);
                  setSubstitusiPct(11.9);
                  setGH(true);
                  setGL(true);
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#C9A227] text-[#1F2A44] text-xs font-bold hover:bg-[#b59020] transition-colors whitespace-nowrap"
              >
                <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
                SPPG contoh: O = 0,9, substitusi 11,9% → IK 0,85
              </button>
            </div>

            <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-6 items-center flex-1">
              {/* Kontrol Input */}
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs font-semibold text-[#1F2A44] mb-1">
                    <label htmlFor="ik-o">Rasio sisa organik terolah (O)</label>
                    <span className="font-mono tabular-nums">{formatId(nilaiO, 2)}</span>
                  </div>
                  <input
                    id="ik-o"
                    type="range"
                    min={0}
                    max={1}
                    step={0.05}
                    value={nilaiO}
                    onChange={(e) => setNilaiO(parseFloat(e.target.value))}
                    className="w-full h-1.5 bg-[#E9EDF5] rounded-lg cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold text-[#1F2A44] mb-1">
                    <label htmlFor="ik-sub">Substitusi LPG (%)</label>
                    <span className="font-mono tabular-nums">{formatId(substitusiPct, 1)}%</span>
                  </div>
                  <input
                    id="ik-sub"
                    type="range"
                    min={0}
                    max={25}
                    step={0.1}
                    value={substitusiPct}
                    onChange={(e) => setSubstitusiPct(parseFloat(e.target.value))}
                    className="w-full h-1.5 bg-[#E9EDF5] rounded-lg cursor-pointer"
                  />
                  <p className="text-[11px] text-[#5A6275] mt-1 tabular-nums">
                    E = min(1, {formatId(substitusiPct, 1)}% / 15%) = {formatId(sim.nilaiE, 3)}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2.5 pt-2">
                  <button
                    type="button"
                    onClick={() => setGH((v) => !v)}
                    aria-pressed={gH}
                    className={`px-3 py-2.5 rounded-lg border text-xs font-bold transition-colors ${
                      gH
                        ? 'border-[#2E7D4F]/40 bg-[#2E7D4F]/10 text-[#2E7D4F]'
                        : 'border-[#B23A3A]/50 bg-[#B23A3A]/10 text-[#B23A3A]'
                    }`}
                  >
                    G_H (SLHS): {gH ? 'Lolos (1)' : 'Gagal (0)'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setGL((v) => !v)}
                    aria-pressed={gL}
                    className={`px-3 py-2.5 rounded-lg border text-xs font-bold transition-colors ${
                      gL
                        ? 'border-[#2E7D4F]/40 bg-[#2E7D4F]/10 text-[#2E7D4F]'
                        : 'border-[#B23A3A]/50 bg-[#B23A3A]/10 text-[#B23A3A]'
                    }`}
                  >
                    G_L (Efluen): {gL ? 'Lolos (1)' : 'Gagal (0)'}
                  </button>
                </div>
              </div>

              {/* Meteran Setengah Lingkaran */}
              <div className="flex flex-col items-center justify-center text-center p-4 rounded-xl bg-[#E9EDF5]/35 border border-[#E9EDF5]">
                <svg
                  viewBox="0 0 220 128"
                  className="w-52 h-32"
                  role="img"
                  aria-label={`Meteran Indeks Kinerja bernilai ${formatId(sim.ik, 2)} dengan status ${sim.keputusan}`}
                >
                  <path
                    d="M 26 110 A 84 84 0 0 1 194 110"
                    fill="none"
                    stroke="#E9EDF5"
                    strokeWidth="18"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 26 110 A 84 84 0 0 1 194 110"
                    fill="none"
                    stroke={statusColor}
                    strokeWidth="18"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={dashOffset}
                    style={{ transition: 'stroke-dashoffset 220ms ease-out, stroke 200ms ease-out' }}
                  />
                  <text
                    x="110"
                    y="88"
                    textAnchor="middle"
                    className="fill-[#1F2A44] text-3xl font-extrabold tabular-nums"
                  >
                    {formatId(sim.ik, 2)}
                  </text>
                  <text
                    x="110"
                    y="108"
                    textAnchor="middle"
                    className="fill-[#5A6275] text-[11px] font-semibold"
                  >
                    Skor IK (0,00 – 1,00)
                  </text>
                </svg>

                <div
                  className="mt-1 px-3 py-1 rounded-lg border text-xs font-bold"
                  style={{
                    borderColor: statusColor,
                    color: statusColor,
                    backgroundColor: '#FFFFFF',
                  }}
                >
                  Keputusan Ex-Post: {sim.keputusan}
                </div>

                <div className="mt-4 w-full grid grid-cols-2 gap-2 text-left border-t border-[#E9EDF5] pt-3 tabular-nums">
                  <div>
                    <p className="text-[11px] text-[#5A6275]">Insentif / hari</p>
                    <p className="text-sm font-extrabold text-[#1F2A44]">
                      Rp{formatIntId(sim.insentifPerHari)}
                    </p>
                    <p className="text-[10px] text-[#5A6275]">
                      Maks Rp156.000/hari
                    </p>
                  </div>
                  <div>
                    <p className="text-[11px] text-[#5A6275]">Insentif / tahun</p>
                    <p className="text-sm font-extrabold text-[#1F2A44]">
                      Rp{formatId(sim.insentifPerTahun / 1_000_000, 2)} jt
                    </p>
                    <p className="text-[10px] text-[#5A6275]">
                      Basis 141,5 hari layanan
                    </p>
                  </div>
                </div>
                <p className="mt-2 text-[11px] text-[#5A6275]">
                  perhitungan penulis (3.120 porsi × Rp2.000 × 2,5%)
                </p>
              </div>
            </div>
          </div>

          {/* Panel Verifikasi (5 cols) */}
          <div className="lg:col-span-5 rounded-xl border-2 border-[#C9A227] bg-[#FFF6DC] p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-[#1F2A44] mb-3">
                <ShieldCheck className="w-5 h-5 text-[#C9A227]" aria-hidden="true" />
                <h3 className="text-base font-bold">Mekanisme Verifikasi Antimanipulasi</h3>
              </div>
              <ul className="space-y-2.5 text-xs sm:text-sm text-[#1F2A44] leading-relaxed">
                <li className="rounded-lg bg-white/85 border border-[#C9A227]/30 p-3">
                  <span className="font-bold">1. Meter gas tersegel:</span> Pencatatan aliran biogas harian menuju kompor dapur agar substitusi LPG dapat diverifikasi secara fisik.
                </li>
                <li className="rounded-lg bg-white/85 border border-[#C9A227]/30 p-3">
                  <span className="font-bold">2. Pencocokan jumlah porsi:</span> Rasio pemakaian LPG dan volume sisa organik dibandingkan langsung dengan laporan porsi terdistribusi (3.120 porsi/hari).
                </li>
                <li className="rounded-lg bg-white/85 border border-[#C9A227]/30 p-3">
                  <span className="font-bold">3. Audit acak &amp; uji efluen:</span> Perguruan tinggi melakukan audit lapangan acak dan DLH menguji sampel air limbah tiap 3 bulan.
                </li>
                <li className="rounded-lg bg-white/85 border border-[#C9A227]/30 p-3">
                  <span className="font-bold">4. Pelaporan Stop Boros Pangan:</span> Data harian wajib diunggah ke platform Stop Boros Pangan sesuai mandat Perbadan BGN 1/2026 Pasal 8.
                </li>
              </ul>
            </div>

            <p className="mt-4 pt-3 border-t border-[#C9A227]/40 text-xs text-[#5A6275]">
              Sumber: Perbadan BGN 1/2026 Pasal 8; Perbadan BGN 4/2026; Perbadan BGN 13/2026.
            </p>
          </div>
        </div>
      </div>
    </RevealSection>
  );
}
