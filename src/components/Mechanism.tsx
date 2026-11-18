import { useState } from 'react';
import { CheckCircle2, ChevronDown, ChevronUp, Scale, Users, XCircle } from 'lucide-react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import {
  MECHANISM_ACTORS,
  MECHANISM_STEPS,
  METHANE_POTENTIAL_DATA,
  POLICY_PILLARS,
  WASTE_QUIZ_ITEMS,
} from '../data';
import { formatId } from '../calc';
import { RevealSection } from './RevealSection';

export function Mechanism() {
  const [activeStep, setActiveStep] = useState<number>(2);
  const [selectedWasteId, setSelectedWasteId] = useState<string>('nasi');

  const selectedWaste =
    WASTE_QUIZ_ITEMS.find((item) => item.id === selectedWasteId) ?? WASTE_QUIZ_ITEMS[0];

  return (
    <RevealSection
      id="mekanisme"
      className="py-14 sm:py-16 bg-white border-b border-[#E9EDF5]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-8">
          <p className="text-xs font-semibold tracking-wide text-[#5A6275]">
            Bagian 02 · Arsitektur Kebijakan DAUR-API
          </p>
          <h2 className="mt-1 text-2xl sm:text-3xl font-extrabold text-[#1F2A44] text-balance">
            Mekanisme Terintegrasi: Dari Pemisahan Limbah ke Substitusi LPG Terverifikasi
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#5A6275] leading-relaxed">
            Menyatukan kewajiban pengelolaan limbah Perbadan BGN 1/2026, standar higiene SLHS Perbadan 4/2026, dan insentif kinerja energi-lingkungan.
          </p>
        </div>

        {/* Diagram alur tiga kolom */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Kolom Kiri: Bukti (3 cols) */}
          <article className="lg:col-span-4 rounded-xl border border-[#E9EDF5] bg-white overflow-hidden flex flex-col">
            <div className="bg-[#1F2A44] px-5 py-3.5">
              <h3 className="text-base font-bold text-white">
                Bukti Potensi Metana (mL CH₄/g VS)
              </h3>
            </div>
            <div className="p-5 flex-1 flex flex-col justify-between gap-4">
              <div>
                <p className="text-xs text-[#5A6275] mb-3">
                  Perbandingan potensi biokimia metana dari berbagai substrat dapur dan ko-digesti di literatur Indonesia dan Asia.
                </p>
                <div
                  className="h-64 w-full"
                  role="img"
                  aria-label="Grafik batang potensi metana berbagai substrat dari 191 hingga 485 mL CH4 per gram VS"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      layout="vertical"
                      data={METHANE_POTENTIAL_DATA}
                      margin={{ top: 4, right: 20, left: 4, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#E9EDF5" horizontal={false} />
                      <XAxis
                        type="number"
                        domain={[0, 520]}
                        tick={{ fontSize: 11, fill: '#5A6275' }}
                        tickLine={false}
                        axisLine={{ stroke: '#E9EDF5' }}
                      />
                      <YAxis
                        type="category"
                        dataKey="label"
                        width={126}
                        tick={{ fontSize: 11, fill: '#1F2A44', fontWeight: 500 }}
                        tickLine={false}
                        axisLine={false}
                      />
                      <Tooltip
                        formatter={(value) => {
                          const num = Number(value ?? 0);
                          return [
                            `${formatId(num, num % 1 === 0 ? 0 : 1)} mL CH₄/g VS`,
                            'Potensi metana',
                          ];
                        }}
                        contentStyle={{
                          borderRadius: '8px',
                          borderColor: '#E9EDF5',
                          fontSize: '12px',
                        }}
                      />
                      <Bar dataKey="nilai" radius={[0, 4, 4, 0]}>
                        {METHANE_POTENTIAL_DATA.map((d) => (
                          <Cell key={d.label} fill={d.warna} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="space-y-2 border-t border-[#E9EDF5] pt-3">
                {METHANE_POTENTIAL_DATA.map((d) => (
                  <div
                    key={d.label}
                    className="flex items-center justify-between text-xs gap-2"
                  >
                    <span className="text-[#5A6275] truncate">{d.label}</span>
                    <span className="font-mono font-semibold text-[#1F2A44] tabular-nums whitespace-nowrap">
                      {formatId(d.nilai, d.nilai % 1 === 0 ? 0 : 1)} ({d.sumber})
                    </span>
                  </div>
                ))}
                <p className="text-xs text-[#5A6275] pt-1">
                  Sumber: Suhartini dkk. (2019); Bilqis dkk. (2023); Wang dkk. (2020); Sandriaty dkk. (2018).
                </p>
              </div>
            </div>
          </article>

          {/* Kolom Tengah: Panel Krem Berbingkai Emas (5 cols) */}
          <article className="lg:col-span-5 rounded-xl border-2 border-[#C9A227] bg-[#FFF6DC] overflow-hidden flex flex-col">
            <div className="bg-[#1F2A44] px-5 py-3.5 flex items-center justify-between gap-2">
              <h3 className="text-base font-bold text-white">
                Lima Langkah Alur Operasional
              </h3>
              <span className="text-xs font-semibold text-[#C9A227] whitespace-nowrap">
                Klik langkah untuk rincian
              </span>
            </div>

            <div className="p-4 sm:p-5 space-y-3 flex-1">
              {MECHANISM_STEPS.map((step) => {
                const isOpen = activeStep === step.nomor;
                return (
                  <div
                    key={step.nomor}
                    className={`rounded-xl border transition-colors ${
                      isOpen
                        ? 'border-[#1F2A44] bg-white'
                        : 'border-[#C9A227]/40 bg-white/80 hover:bg-white'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setActiveStep(isOpen ? 0 : step.nomor)}
                      aria-expanded={isOpen}
                      className="w-full text-left px-4 py-3 flex items-start gap-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1F2A44] rounded-xl"
                    >
                      <span className="w-7 h-7 rounded-full bg-[#C9A227] text-[#1F2A44] text-sm font-extrabold flex items-center justify-center shrink-0 mt-0.5 tabular-nums">
                        {step.nomor}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <h4 className="text-sm font-bold text-[#1F2A44]">
                            {step.judul}
                          </h4>
                          {isOpen ? (
                            <ChevronUp className="w-4 h-4 text-[#5A6275] shrink-0" aria-hidden="true" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-[#5A6275] shrink-0" aria-hidden="true" />
                          )}
                        </div>
                        <p className="mt-0.5 text-xs text-[#5A6275] leading-relaxed">
                          {step.ringkasan}
                        </p>
                      </div>
                    </button>

                    {isOpen && (
                      <div className="px-4 pb-4 pt-1 border-t border-[#E9EDF5]">
                        <p className="text-xs text-[#1F2A44] leading-relaxed">
                          {step.detail}
                        </p>

                        {step.memilikiKuis && (
                          <div className="mt-3 rounded-lg border border-dashed border-[#C9A227] bg-[#FFF6DC]/60 p-3">
                            <p className="text-xs font-bold text-[#1F2A44] mb-2">
                              Uji Keputusan Interaktif: Pilih jenis limbah dapur
                            </p>
                            <div className="flex flex-wrap gap-1.5" role="group" aria-label="Pilih jenis limbah untuk melihat jalur pengolahan">
                              {WASTE_QUIZ_ITEMS.map((item) => {
                                const selected = item.id === selectedWaste.id;
                                return (
                                  <button
                                    key={item.id}
                                    type="button"
                                    onClick={() => setSelectedWasteId(item.id)}
                                    className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#1F2A44] ${
                                      selected
                                        ? 'bg-[#1F2A44] text-white'
                                        : 'bg-white border border-[#E9EDF5] text-[#1F2A44] hover:bg-[#E9EDF5]/60'
                                    }`}
                                  >
                                    {item.nama}
                                  </button>
                                );
                              })}
                            </div>

                            <div
                              className={`mt-2.5 rounded-lg p-2.5 border ${
                                selectedWaste.masukDigester
                                  ? 'border-[#2E7D4F]/40 bg-[#2E7D4F]/10'
                                  : 'border-[#B23A3A]/40 bg-[#B23A3A]/10'
                              }`}
                            >
                              <div className="flex items-center gap-1.5 text-xs font-bold">
                                {selectedWaste.masukDigester ? (
                                  <CheckCircle2 className="w-4 h-4 text-[#2E7D4F] shrink-0" aria-hidden="true" />
                                ) : (
                                  <XCircle className="w-4 h-4 text-[#B23A3A] shrink-0" aria-hidden="true" />
                                )}
                                <span
                                  className={
                                    selectedWaste.masukDigester
                                      ? 'text-[#2E7D4F]'
                                      : 'text-[#B23A3A]'
                                  }
                                >
                                  {selectedWaste.jalur}
                                </span>
                              </div>
                              <p className="mt-1 text-xs text-[#1F2A44] leading-relaxed">
                                {selectedWaste.alasan}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </article>

          {/* Kolom Kanan: Aktor, Dasar Hukum, Output (3 cols) */}
          <article className="lg:col-span-3 rounded-xl border border-[#E9EDF5] bg-white overflow-hidden flex flex-col">
            <div className="bg-[#1F2A44] px-5 py-3.5">
              <h3 className="text-base font-bold text-white">
                Tata Kelola &amp; Keluaran
              </h3>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between gap-4">
              <div className="space-y-4">
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#1F2A44] mb-2">
                    <Users className="w-3.5 h-3.5 text-[#C9A227]" aria-hidden="true" />
                    <span>Pembagian Peran Aktor</span>
                  </div>
                  <div className="space-y-2">
                    {MECHANISM_ACTORS.map((item) => (
                      <div
                        key={item.aktor}
                        className="rounded-lg bg-[#E9EDF5]/45 p-2.5 text-xs"
                      >
                        <p className="font-bold text-[#1F2A44]">{item.aktor}</p>
                        <p className="text-[#5A6275] mt-0.5 leading-snug">{item.peran}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#1F2A44] mb-1.5">
                    <Scale className="w-3.5 h-3.5 text-[#C9A227]" aria-hidden="true" />
                    <span>Dasar Hukum</span>
                  </div>
                  <p className="text-xs text-[#5A6275] leading-relaxed rounded-lg border border-[#E9EDF5] p-3">
                    Perpres 115/2025; Perbadan BGN 1, 4, 13/2026; Kepmen LH 2760/2026.
                  </p>
                </div>
              </div>

              <div className="rounded-lg border border-[#2E7D4F]/30 bg-[#2E7D4F]/10 p-3.5">
                <p className="text-xs font-bold text-[#2E7D4F]">Keluaran Terverifikasi</p>
                <p className="mt-1 text-xs font-medium text-[#1F2A44] leading-relaxed">
                  Substitusi LPG 7,5–16,4% per SPPG, dengan efluen dan higiene patuh (perhitungan penulis).
                </p>
              </div>
            </div>
          </article>
        </div>

        {/* Bilah bawah navy berlabel emas */}
        <div className="mt-6 rounded-xl bg-[#1F2A44] px-5 py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#C9A227]">
            Dukungan Pelaksanaan
          </span>
          <p className="text-xs sm:text-sm text-white">
            Integrasi platform Stop Boros Pangan (Perbadan 1/2026 Pasal 8) + verifikasi meter gas tersegel &amp; audit perguruan tinggi.
          </p>
        </div>

        {/* Empat Pilar sebagai Kartu */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {POLICY_PILLARS.map((pillar) => (
            <div
              key={pillar.kode}
              className="rounded-xl border border-[#E9EDF5] bg-white p-5 flex flex-col justify-between"
            >
              <div>
                <p className="text-xs font-mono font-semibold text-[#C9A227] bg-[#1F2A44] inline-block px-2 py-0.5 rounded">
                  {pillar.kode}
                </p>
                <h4 className="mt-2.5 text-sm font-bold text-[#1F2A44] leading-snug">
                  {pillar.judul}
                </h4>
                <p className="mt-2 text-xs text-[#5A6275] leading-relaxed">
                  {pillar.isi}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </RevealSection>
  );
}
