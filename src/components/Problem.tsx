import { AlertTriangle, Clock } from 'lucide-react';
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
  LPG_CONSUMPTION_DATA,
  PROBLEM_TIMELINE,
  ROOT_CAUSES,
  SPPG_EMISSION_DATA,
} from '../data';
import { formatIntId } from '../calc';
import { RevealSection } from './RevealSection';

export function Problem() {
  return (
    <RevealSection
      id="masalah"
      className="py-14 sm:py-16 bg-[#E9EDF5]/35 border-b border-[#E9EDF5]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-8">
          <p className="text-xs font-semibold tracking-wide text-[#5A6275]">
            Bagian 01 · Diagnosis Masalah
          </p>
          <h2 className="mt-1 text-2xl sm:text-3xl font-extrabold text-[#1F2A44] text-balance">
            Mengapa Dapur MBG Membutuhkan Intervensi Energi dan Pengolahan Limbah Terpadu
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#5A6275] leading-relaxed">
            Kenaikan konsumsi LPG rumah tangga nasional bertemu dengan beban sisa organik dan air limbah dapur SPPG yang belum terhubung ke pemanfaatan energi.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          {/* Kolom 1: Tekanan Energi */}
          <article className="rounded-xl border border-[#E9EDF5] bg-white overflow-hidden flex flex-col">
            <div className="bg-[#1F2A44] px-5 py-3.5">
              <h3 className="text-base font-bold text-white">
                1. Tekanan Energi Nasional
              </h3>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between gap-4">
              <div>
                <div className="flex items-baseline justify-between gap-2 mb-1">
                  <h4 className="text-sm font-bold text-[#1F2A44]">
                    Konsumsi LPG Rumah Tangga (2014–2024)
                  </h4>
                  <span className="text-xs font-semibold text-[#B23A3A] tabular-nums whitespace-nowrap">
                    Naik 46,1%
                  </span>
                </div>
                <p className="text-xs text-[#5A6275] mb-3">
                  Dalam ribu ton per tahun dari 5.843 ribu t (2014) menjadi 8.536 ribu t (2024).
                </p>

                <div className="h-56 w-full" role="img" aria-label="Grafik batang konsumsi LPG rumah tangga nasional 2014 hingga 2024 dalam ribu ton">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={LPG_CONSUMPTION_DATA}
                      margin={{ top: 8, right: 8, left: -12, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#E9EDF5" vertical={false} />
                      <XAxis
                        dataKey="tahun"
                        tick={{ fontSize: 11, fill: '#5A6275' }}
                        tickLine={false}
                        axisLine={{ stroke: '#E9EDF5' }}
                      />
                      <YAxis
                        domain={[0, 9500]}
                        tickFormatter={(v) => formatIntId(v)}
                        tick={{ fontSize: 11, fill: '#5A6275' }}
                        tickLine={false}
                        axisLine={false}
                      />
                      <Tooltip
                        formatter={(value) => [`${formatIntId(Number(value ?? 0))} ribu ton`, 'Konsumsi LPG']}
                        contentStyle={{
                          borderRadius: '8px',
                          borderColor: '#E9EDF5',
                          fontSize: '12px',
                        }}
                      />
                      <Bar dataKey="konsumsi" radius={[4, 4, 0, 0]}>
                        {LPG_CONSUMPTION_DATA.map((entry) => (
                          <Cell
                            key={entry.tahun}
                            fill={entry.tahun === '2024' ? '#C9A227' : '#1F2A44'}
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="space-y-3">
                <div className="rounded-lg border border-dashed border-[#C9A227] bg-[#FFF6DC] p-3.5 text-xs text-[#1F2A44] leading-relaxed">
                  <span className="font-bold">Neraca LPG 2024:</span> produksi domestik 1,9 juta t, impor 6,9 juta t, penjualan domestik 8,9 juta t (77,5% berasal dari impor).
                </div>
                <p className="text-xs text-[#5A6275]">
                  Sumber: KESDM, HEESI 2024 (2025).
                </p>
              </div>
            </div>
          </article>

          {/* Kolom 2: Profil Dapur SPPG */}
          <article className="rounded-xl border border-[#E9EDF5] bg-white overflow-hidden flex flex-col">
            <div className="bg-[#1F2A44] px-5 py-3.5">
              <h3 className="text-base font-bold text-white">
                2. Profil Dapur SPPG
              </h3>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between gap-4">
              <div>
                <div className="flex items-baseline justify-between gap-2 mb-1">
                  <h4 className="text-sm font-bold text-[#1F2A44]">
                    Komposisi Emisi Satu SPPG
                  </h4>
                  <span className="text-xs font-semibold text-[#1F2A44] tabular-nums whitespace-nowrap">
                    43,7 t CO₂e/thn
                  </span>
                </div>
                <p className="text-xs text-[#5A6275] mb-3">
                  Kontribusi emisi tahunan per dapur menurut sumber aktivitas operasional.
                </p>

                <div className="h-44 w-full" role="img" aria-label="Grafik batang horizontal komposisi emisi satu SPPG sebesar 43,7 ton CO2e per tahun">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      layout="vertical"
                      data={SPPG_EMISSION_DATA}
                      margin={{ top: 4, right: 24, left: 10, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#E9EDF5" horizontal={false} />
                      <XAxis
                        type="number"
                        domain={[0, 45]}
                        unit="%"
                        tick={{ fontSize: 11, fill: '#5A6275' }}
                        tickLine={false}
                        axisLine={{ stroke: '#E9EDF5' }}
                      />
                      <YAxis
                        type="category"
                        dataKey="sumber"
                        width={118}
                        tick={{ fontSize: 11, fill: '#1F2A44', fontWeight: 500 }}
                        tickLine={false}
                        axisLine={false}
                      />
                      <Tooltip
                        formatter={(value) => [
                          `${Number(value ?? 0).toString().replace('.', ',')}%`,
                          'Porsi emisi',
                        ]}
                        contentStyle={{
                          borderRadius: '8px',
                          borderColor: '#E9EDF5',
                          fontSize: '12px',
                        }}
                      />
                      <Bar dataKey="persen" radius={[0, 4, 4, 0]}>
                        {SPPG_EMISSION_DATA.map((item) => (
                          <Cell key={item.sumber} fill={item.warna} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="mt-3 grid grid-cols-2 gap-2.5">
                  <div className="rounded-lg bg-[#E9EDF5]/70 p-3">
                    <p className="text-[11px] text-[#5A6275]">Kapasitas layanan</p>
                    <p className="text-base font-bold text-[#1F2A44] tabular-nums">
                      3.120 porsi/hari
                    </p>
                  </div>
                  <div className="rounded-lg bg-[#E9EDF5]/70 p-3">
                    <p className="text-[11px] text-[#5A6275]">Kebutuhan LPG</p>
                    <p className="text-base font-bold text-[#1F2A44] tabular-nums">
                      18,7 kg/hari
                    </p>
                  </div>
                  <div className="rounded-lg bg-[#E9EDF5]/70 p-3 col-span-2">
                    <p className="text-[11px] text-[#5A6275]">Timbulan sisa organik dapur</p>
                    <p className="text-sm font-bold text-[#1F2A44] tabular-nums">
                      49 kg/hari (Dermawan &amp; Fauzi, 2026) · 62,7 kg/hari rata-rata 3 SPPG Bandung (Kanda dkk., 2026)
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-2.5">
                <div className="rounded-lg border border-[#B23A3A] bg-[#B23A3A]/5 p-3.5">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-[#B23A3A] shrink-0 mt-0.5" aria-hidden="true" />
                    <div className="text-xs text-[#1F2A44] leading-relaxed">
                      <span className="font-bold text-[#B23A3A]">Peringatan Mutu Air Limbah:</span> 10 SPPG Sleman mencatat COD 829–8.078 mg/L, BOD 91–1.445 mg/L, TSS 121–7.340 mg/L; sebagian besar parameter melampaui baku mutu.
                    </div>
                  </div>
                </div>
                <p className="text-xs text-[#5A6275]">
                  Sumber: Dermawan &amp; Fauzi (2026); Kanda dkk. (2026); Asrifah dkk. (2026).
                </p>
              </div>
            </div>
          </article>

          {/* Kolom 3: Lima Akar Masalah */}
          <article className="rounded-xl border border-[#E9EDF5] bg-white overflow-hidden flex flex-col">
            <div className="bg-[#1F2A44] px-5 py-3.5">
              <h3 className="text-base font-bold text-white">
                3. Lima Akar Masalah (A1–A5)
              </h3>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between gap-3">
              <div className="space-y-3">
                {ROOT_CAUSES.map((item) => (
                  <div
                    key={item.kode}
                    className="rounded-lg border border-[#E9EDF5] bg-[#E9EDF5]/25 p-3.5"
                  >
                    <div className="flex items-baseline gap-2">
                      <span className="text-xs font-mono font-semibold text-[#C9A227] bg-[#1F2A44] px-1.5 py-0.5 rounded">
                        {item.kode}
                      </span>
                      <h4 className="text-sm font-bold text-[#1F2A44]">{item.judul}</h4>
                    </div>
                    <p className="mt-1.5 text-xs text-[#5A6275] leading-relaxed">
                      {item.ringkas}
                    </p>
                  </div>
                ))}
              </div>

              <p className="text-xs text-[#5A6275] pt-1">
                Sumber: Perbadan BGN 1, 4, &amp; 13/2026; Wang dkk. (2020); Budiman (2021); Situmeang dkk. (2022); Dermawan &amp; Fauzi (2026).
              </p>
            </div>
          </article>
        </div>

        {/* Bilah bawah navy berlabel emas + garis waktu kecil */}
        <div className="mt-6 rounded-xl overflow-hidden border border-[#1F2A44]">
          <div className="bg-[#1F2A44] px-5 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <span className="text-xs font-bold uppercase tracking-wider text-[#C9A227] whitespace-nowrap">
                Sinyal Krisis Lapangan
              </span>
              <span aria-hidden="true" className="text-white/30 hidden sm:inline">|</span>
              <p className="text-sm font-medium text-white">
                1.512 SPPG di Wilayah II dihentikan sementara pada 11 Maret 2026, termasuk 62 di Banten.
              </p>
            </div>
            <span className="text-xs text-[#E9EDF5]/80 whitespace-nowrap shrink-0">
              Sumber: Kemensetneg, 2026
            </span>
          </div>

          <div className="bg-white px-5 py-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#5A6275] mb-3">
              <Clock className="w-3.5 h-3.5 text-[#1F2A44]" aria-hidden="true" />
              <span>Linimasa Regulasi &amp; Kepatuhan 2026</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {PROBLEM_TIMELINE.map((ev, idx) => (
                <div
                  key={ev.waktu}
                  className="rounded-lg border border-[#E9EDF5] bg-[#E9EDF5]/30 px-3.5 py-2.5 flex items-start gap-2.5"
                >
                  <span className="w-5 h-5 rounded-full bg-[#C9A227] text-[#1F2A44] text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 tabular-nums">
                    {idx + 1}
                  </span>
                  <div>
                    <p className="text-xs font-bold text-[#1F2A44]">{ev.waktu}</p>
                    <p className="text-xs text-[#5A6275] leading-snug mt-0.5">
                      {ev.peristiwa}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </RevealSection>
  );
}
