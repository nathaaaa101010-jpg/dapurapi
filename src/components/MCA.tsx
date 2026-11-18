import { useMemo, useState } from 'react';
import { Award, RotateCcw } from 'lucide-react';
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
import { MCA_ALTERNATIVES, MCA_CRITERIA, type McaCriterion } from '../data';
import { formatId } from '../calc';
import { RevealSection } from './RevealSection';

type RawWeights = Record<McaCriterion['id'], number>;

const INITIAL_WEIGHTS: RawWeights = {
  emisi: 25,
  lpg: 20,
  biaya: 20,
  teknis: 20,
  regulasi: 15,
};

export function MCA() {
  const [rawWeights, setRawWeights] = useState<RawWeights>(INITIAL_WEIGHTS);

  const normalizedWeights = useMemo(() => {
    const sum = Object.values(rawWeights).reduce((acc, v) => acc + v, 0);
    if (sum <= 0) {
      return { emisi: 20, lpg: 20, biaya: 20, teknis: 20, regulasi: 20 };
    }
    return {
      emisi: (rawWeights.emisi / sum) * 100,
      lpg: (rawWeights.lpg / sum) * 100,
      biaya: (rawWeights.biaya / sum) * 100,
      teknis: (rawWeights.teknis / sum) * 100,
      regulasi: (rawWeights.regulasi / sum) * 100,
    };
  }, [rawWeights]);

  const rankedAlternatives = useMemo(() => {
    const computed = MCA_ALTERNATIVES.map((alt) => {
      const score =
        (alt.skor.emisi * normalizedWeights.emisi +
          alt.skor.lpg * normalizedWeights.lpg +
          alt.skor.biaya * normalizedWeights.biaya +
          alt.skor.teknis * normalizedWeights.teknis +
          alt.skor.regulasi * normalizedWeights.regulasi) /
        100;
      return {
        ...alt,
        skorTertimbang: Number(score.toFixed(3)),
      };
    });

    const sorted = [...computed].sort((a, b) => b.skorTertimbang - a.skorTertimbang);
    return computed.map((item) => ({
      ...item,
      peringkat: sorted.findIndex((s) => s.kode === item.kode) + 1,
    }));
  }, [normalizedWeights]);

  const topCode = useMemo(() => {
    return rankedAlternatives.reduce((best, cur) =>
      cur.skorTertimbang > best.skorTertimbang ? cur : best,
    ).kode;
  }, [rankedAlternatives]);

  return (
    <RevealSection
      id="mca"
      className="py-14 sm:py-16 bg-[#E9EDF5]/35 border-b border-[#E9EDF5]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold tracking-wide text-[#5A6275]">
              Bagian 07 · Analisis Multi-Kriteria (MCA)
            </p>
            <h2 className="mt-1 text-2xl sm:text-3xl font-extrabold text-[#1F2A44] text-balance">
              Perbandingan Alternatif Kebijakan Dapur SPPG
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#5A6275] leading-relaxed">
              Geser bobot prioritas pembuat kebijakan untuk menguji ketahanan peringkat antar-opsi (otomatis dinormalisasi ke 100%).
            </p>
          </div>

          <button
            type="button"
            onClick={() => setRawWeights(INITIAL_WEIGHTS)}
            className="no-print inline-flex items-center gap-1.5 self-start px-3.5 py-2 rounded-lg border border-[#E9EDF5] bg-white text-xs font-semibold text-[#1F2A44] hover:bg-[#E9EDF5]/60 transition-colors whitespace-nowrap shrink-0"
          >
            <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
            Bobot Dasar (25/20/20/20/15)
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Slider Bobot (5 cols) */}
          <div className="lg:col-span-5 rounded-xl border border-[#E9EDF5] bg-white overflow-hidden">
            <div className="bg-[#1F2A44] px-5 py-3.5 flex items-center justify-between">
              <h3 className="text-base font-bold text-white">Bobot Kriteria (Ternormalisasi 100%)</h3>
            </div>
            <div className="p-5 space-y-4">
              {MCA_CRITERIA.map((c) => {
                const normVal = normalizedWeights[c.id];
                return (
                  <div key={c.id}>
                    <div className="flex items-center justify-between text-xs font-semibold text-[#1F2A44] mb-1">
                      <label htmlFor={`mca-${c.id}`}>{c.nama}</label>
                      <span className="font-mono tabular-nums">
                        {formatId(normVal, 1)}%{' '}
                        <span className="text-[#5A6275] font-normal">
                          (dasar {c.bobotDasar}%)
                        </span>
                      </span>
                    </div>
                    <input
                      id={`mca-${c.id}`}
                      type="range"
                      min={0}
                      max={100}
                      step={5}
                      value={rawWeights[c.id]}
                      onChange={(e) =>
                        setRawWeights((prev) => ({
                          ...prev,
                          [c.id]: parseInt(e.target.value, 10),
                        }))
                      }
                      className="w-full h-1.5 bg-[#E9EDF5] rounded-lg cursor-pointer"
                    />
                  </div>
                );
              })}

              <p className="pt-2 border-t border-[#E9EDF5] text-[11px] text-[#5A6275]">
                Skala skor kriteria: 1 (terendah) hingga 5 (terbaik). Sumber: Penilaian multi-kriteria penulis.
              </p>
            </div>
          </div>

          {/* Grafik & Tabel Skor Tertimbang (7 cols) */}
          <div className="lg:col-span-7 space-y-5">
            <article className="rounded-xl border border-[#E9EDF5] bg-white p-5">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <div>
                  <h3 className="text-base font-bold text-[#1F2A44]">
                    Skor Tertimbang Alternatif (Maks. 5,00)
                  </h3>
                  <p className="text-xs text-[#5A6275]">
                    Peringkat 1 disorot emas · perhitungan penulis.
                  </p>
                </div>
                {rankedAlternatives.map(
                  (alt) =>
                    alt.kode === topCode && (
                      <div
                        key={alt.kode}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#FFF6DC] border border-[#C9A227] text-xs font-bold text-[#1F2A44]"
                      >
                        <Award className="w-4 h-4 text-[#C9A227]" aria-hidden="true" />
                        Peringkat 1: {alt.kode} ({formatId(alt.skorTertimbang, 2)})
                      </div>
                    ),
                )}
              </div>

              <div className="h-56 w-full" role="img" aria-label="Grafik batang skor tertimbang perbandingan alternatif A0 hingga A3">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={rankedAlternatives}
                    layout="vertical"
                    margin={{ top: 6, right: 24, left: 10, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#E9EDF5" horizontal={false} />
                    <XAxis
                      type="number"
                      domain={[0, 5]}
                      tick={{ fontSize: 11, fill: '#5A6275' }}
                    />
                    <YAxis
                      type="category"
                      dataKey="nama"
                      width={160}
                      tick={{ fontSize: 11, fill: '#1F2A44', fontWeight: 600 }}
                    />
                    <Tooltip
                      formatter={(val) => [formatId(Number(val ?? 0), 2), 'Skor tertimbang']}
                      contentStyle={{ borderRadius: '8px', borderColor: '#E9EDF5', fontSize: '12px' }}
                    />
                    <Bar dataKey="skorTertimbang" radius={[0, 4, 4, 0]}>
                      {rankedAlternatives.map((alt) => (
                        <Cell
                          key={alt.kode}
                          fill={alt.kode === topCode ? '#C9A227' : '#1F2A44'}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </article>

            {/* Matriks Skor Mentah & Peringkat */}
            <div className="rounded-xl border border-[#E9EDF5] bg-white overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-[#E9EDF5] bg-[#E9EDF5]/45 text-[#1F2A44]">
                    <th className="py-2.5 px-3 font-bold">Alternatif</th>
                    <th className="py-2.5 px-2.5 font-bold text-center">Emisi</th>
                    <th className="py-2.5 px-2.5 font-bold text-center">LPG</th>
                    <th className="py-2.5 px-2.5 font-bold text-center">Biaya</th>
                    <th className="py-2.5 px-2.5 font-bold text-center">Teknis</th>
                    <th className="py-2.5 px-2.5 font-bold text-center">Regulasi</th>
                    <th className="py-2.5 px-3 font-bold text-right">Skor</th>
                    <th className="py-2.5 px-3 font-bold text-center">Peringkat</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E9EDF5] tabular-nums">
                  {rankedAlternatives.map((alt) => {
                    const isTop = alt.kode === topCode;
                    return (
                      <tr
                        key={alt.kode}
                        className={isTop ? 'bg-[#FFF6DC]/80 font-semibold' : ''}
                      >
                        <td className="py-2.5 px-3 text-[#1F2A44]">
                          <span className="font-mono font-bold mr-1.5">{alt.kode}</span>
                          {alt.nama}
                        </td>
                        <td className="py-2.5 px-2.5 text-center">{alt.skor.emisi}</td>
                        <td className="py-2.5 px-2.5 text-center">{alt.skor.lpg}</td>
                        <td className="py-2.5 px-2.5 text-center">{alt.skor.biaya}</td>
                        <td className="py-2.5 px-2.5 text-center">{alt.skor.teknis}</td>
                        <td className="py-2.5 px-2.5 text-center">{alt.skor.regulasi}</td>
                        <td className="py-2.5 px-3 text-right font-mono font-bold text-[#1F2A44]">
                          {formatId(alt.skorTertimbang, 2)}
                        </td>
                        <td className="py-2.5 px-3 text-center font-bold text-[#1F2A44]">
                          #{alt.peringkat}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </RevealSection>
  );
}
