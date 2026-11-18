import { useMemo, useState } from 'react';
import {
  AlertCircle,
  ChevronDown,
  ChevronUp,
  Info,
  RotateCcw,
} from 'lucide-react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import {
  calculateDaurApi,
  type CalculatorInputs,
  DEFAULT_INPUTS,
  formatId,
  formatIntId,
  SCENARIO_PRESETS,
  type ScenarioKey,
} from '../calc';
import { RevealSection } from './RevealSection';

interface SliderNumberFieldProps {
  id: string;
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit?: string;
  helper?: string;
  onChange: (val: number) => void;
}

function SliderNumberField({
  id,
  label,
  value,
  min,
  max,
  step,
  unit,
  helper,
  onChange,
}: SliderNumberFieldProps) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between gap-2">
        <label htmlFor={id} className="text-xs font-semibold text-[#1F2A44]">
          {label}
        </label>
        <div className="flex items-center gap-1.5">
          <input
            id={id}
            type="number"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={(e) => {
              const parsed = parseFloat(e.target.value);
              if (!Number.isNaN(parsed)) {
                onChange(Math.min(max, Math.max(0, parsed)));
              }
            }}
            className="w-20 rounded-md border border-[#E9EDF5] bg-white px-2 py-1 text-right text-xs font-mono font-semibold text-[#1F2A44] tabular-nums focus:outline-none focus:ring-2 focus:ring-[#C9A227]"
          />
          {unit && <span className="text-[11px] text-[#5A6275] whitespace-nowrap">{unit}</span>}
        </div>
      </div>
      <input
        type="range"
        aria-label={`${label} (penggeser)`}
        min={min}
        max={max}
        step={step}
        value={Math.min(max, Math.max(min, value))}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full h-1.5 bg-[#E9EDF5] rounded-lg cursor-pointer"
      />
      {helper && <p className="text-[11px] text-[#5A6275]">{helper}</p>}
    </div>
  );
}

export function Calculator() {
  const [inputs, setInputs] = useState<CalculatorInputs>(DEFAULT_INPUTS);
  const [showFormula, setShowFormula] = useState(false);

  const result = useMemo(() => calculateDaurApi(inputs), [inputs]);

  const threeScenarioComparison = useMemo(() => {
    const keys: Array<Exclude<ScenarioKey, 'kustom'>> = [
      'konservatif',
      'moderat',
      'optimistis',
    ];
    return keys.map((key) => {
      const preset = SCENARIO_PRESETS[key];
      const res = calculateDaurApi({
        ...inputs,
        skenario: key,
        yieldCh4PerKgVs: preset.yieldCh4PerKgVs,
        kebocoranPct: preset.kebocoranPct,
      });
      return {
        skenario: preset.label,
        substitusiPct: Number(res.substitusiPct.toFixed(2)),
        lpgEqKg: Number(res.lpgEqKgPerHari.toFixed(2)),
        penguranganBersih: Number(res.penguranganBersihTonCo2ePerThn.toFixed(2)),
        hematJuta: Number(res.hematLpgJutaPerThn.toFixed(2)),
      };
    });
  }, [inputs]);

  const emissionStackData = useMemo(
    () => [
      {
        komponen: 'Neraca Emisi Tahunan',
        tpaDihindari: Number(result.tpaDihindariTonCo2ePerThn.toFixed(2)),
        lpgDihindari: Number(result.lpgDihindariTonCo2PerThn.toFixed(2)),
        kebocoranNegatif: Number((-result.kebocoranTonCo2ePerThn).toFixed(2)),
      },
    ],
    [result],
  );

  const handleScenarioSelect = (key: ScenarioKey) => {
    if (key === 'kustom') {
      setInputs((prev) => ({ ...prev, skenario: 'kustom' }));
      return;
    }
    const preset = SCENARIO_PRESETS[key];
    setInputs((prev) => ({
      ...prev,
      skenario: key,
      yieldCh4PerKgVs: preset.yieldCh4PerKgVs,
      kebocoranPct: preset.kebocoranPct,
    }));
  };

  const getPaybackStatus = (years: number) => {
    if (!Number.isFinite(years)) {
      return {
        label: 'Tidak balik modal (>10 thn)',
        colorClass: 'bg-[#B23A3A]/10 text-[#B23A3A] border-[#B23A3A]/40',
      };
    }
    if (years <= 6) {
      return {
        label: 'Layak cepat (≤6 tahun)',
        colorClass: 'bg-[#2E7D4F]/10 text-[#2E7D4F] border-[#2E7D4F]/40',
      };
    }
    if (years <= 10) {
      return {
        label: 'Moderat (6–10 tahun)',
        colorClass: 'bg-[#FFF6DC] text-[#8F6F0F] border-[#C9A227]',
      };
    }
    return {
      label: 'Panjang (>10 tahun)',
      colorClass: 'bg-[#B23A3A]/10 text-[#B23A3A] border-[#B23A3A]/40',
    };
  };

  const paybackBadge = getPaybackStatus(result.balikModalDenganIkThn);
  const leakageExceeded = inputs.kebocoranPct > 5;
  const gateFailed = !inputs.gH || !inputs.gL;

  return (
    <RevealSection
      id="kalkulator"
      className="py-14 sm:py-16 bg-[#E9EDF5]/35 border-b border-[#E9EDF5]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold tracking-wide text-[#5A6275]">
              Bagian 03 · Simulasi Interaktif Utama
            </p>
            <h2 className="mt-1 text-2xl sm:text-3xl font-extrabold text-[#1F2A44] text-balance">
              Kalkulator Neraca Energi, Emisi, dan Ekonomi SPPG
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#5A6275] leading-relaxed">
              Uji sensitivitas timbulan sisa organik, hari layanan, skenario hasil metana, tingkat kebocoran, capex digester, dan gerbang kepatuhan terhadap substitusi LPG serta kelayakan investasi.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setInputs(DEFAULT_INPUTS)}
            className="no-print inline-flex items-center gap-1.5 self-start px-3.5 py-2 rounded-lg border border-[#E9EDF5] bg-white text-xs font-semibold text-[#1F2A44] hover:bg-[#E9EDF5]/60 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C9A227]"
          >
            <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
            Atur Ulang Bawaan
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Panel Input (5 cols) */}
          <div className="lg:col-span-5 rounded-xl border border-[#E9EDF5] bg-white overflow-hidden">
            <div className="bg-[#1F2A44] px-5 py-3.5 flex items-center justify-between">
              <h3 className="text-base font-bold text-white">Parameter Masukan</h3>
              <span className="text-xs text-[#C9A227] font-medium">Bawaan: Banten 2026</span>
            </div>

            <div className="p-5 space-y-5">
              {/* Skenario Pilihan */}
              <div>
                <p className="text-xs font-bold text-[#1F2A44] mb-2">Pilihan Skenario</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5" role="group" aria-label="Pilihan skenario konversi biogas">
                  {(['konservatif', 'moderat', 'optimistis', 'kustom'] as ScenarioKey[]).map(
                    (key) => {
                      const active = inputs.skenario === key;
                      const label =
                        key === 'kustom' ? 'Kustom' : SCENARIO_PRESETS[key].label;
                      return (
                        <button
                          key={key}
                          type="button"
                          onClick={() => handleScenarioSelect(key)}
                          className={`px-2.5 py-2 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C9A227] ${
                            active
                              ? 'bg-[#1F2A44] text-white'
                              : 'bg-[#E9EDF5]/60 text-[#1F2A44] hover:bg-[#E9EDF5]'
                          }`}
                        >
                          {label}
                        </button>
                      );
                    },
                  )}
                </div>
                <p className="mt-1.5 text-[11px] text-[#5A6275]">
                  {inputs.skenario === 'kustom'
                    ? 'Mode kustom: atur hasil metana dan tingkat kebocoran di bawah ini.'
                    : SCENARIO_PRESETS[inputs.skenario].deskripsi}
                </p>
              </div>

              <div className="space-y-4 pt-2 border-t border-[#E9EDF5]">
                <SliderNumberField
                  id="input-sisa"
                  label="Sisa organik dapur"
                  value={inputs.sisaKgPerHari}
                  min={10}
                  max={150}
                  step={1}
                  unit="kg/hari"
                  helper="Bawaan 49 kg/hari (Dermawan & Fauzi, 2026)"
                  onChange={(v) => setInputs((p) => ({ ...p, sisaKgPerHari: v }))}
                />

                <SliderNumberField
                  id="input-hari"
                  label="Hari layanan per tahun"
                  value={inputs.hariPerTahun}
                  min={100}
                  max={260}
                  step={0.5}
                  unit="hari/thn"
                  onChange={(v) => setInputs((p) => ({ ...p, hariPerTahun: v }))}
                />

                <SliderNumberField
                  id="input-capex"
                  label="Capex digester"
                  value={inputs.capexJuta}
                  min={20}
                  max={300}
                  step={0.5}
                  unit="Rp juta"
                  helper="Bawaan Rp52,7 juta (USD 3.194 × Rp16.500)"
                  onChange={(v) => setInputs((p) => ({ ...p, capexJuta: v }))}
                />

                <SliderNumberField
                  id="input-nilai-o"
                  label="Nilai O (rasio sisa terolah)"
                  value={inputs.nilaiO}
                  min={0}
                  max={1}
                  step={0.05}
                  onChange={(v) => setInputs((p) => ({ ...p, nilaiO: v }))}
                />
              </div>

              {/* Input teknis lanjutan */}
              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-[#E9EDF5]">
                <div>
                  <label htmlFor="input-lpg-base" className="block text-[11px] font-semibold text-[#1F2A44] mb-1">
                    LPG baseline (kg/hari)
                  </label>
                  <input
                    id="input-lpg-base"
                    type="number"
                    step={0.1}
                    min={1}
                    value={inputs.lpgBaselineKgPerHari}
                    onChange={(e) => {
                      const val = parseFloat(e.target.value);
                      if (!Number.isNaN(val)) setInputs((p) => ({ ...p, lpgBaselineKgPerHari: val }));
                    }}
                    className="w-full rounded-md border border-[#E9EDF5] px-2.5 py-1.5 text-xs font-mono text-[#1F2A44] tabular-nums"
                  />
                </div>
                <div>
                  <label htmlFor="input-harga-lpg" className="block text-[11px] font-semibold text-[#1F2A44] mb-1">
                    Harga LPG (Rp/kg)
                  </label>
                  <input
                    id="input-harga-lpg"
                    type="number"
                    step={100}
                    min={1000}
                    value={inputs.hargaLpgPerKg}
                    onChange={(e) => {
                      const val = parseFloat(e.target.value);
                      if (!Number.isNaN(val)) setInputs((p) => ({ ...p, hargaLpgPerKg: val }));
                    }}
                    className="w-full rounded-md border border-[#E9EDF5] px-2.5 py-1.5 text-xs font-mono text-[#1F2A44] tabular-nums"
                  />
                </div>
                <div>
                  <label htmlFor="input-ts" className="block text-[11px] font-semibold text-[#1F2A44] mb-1">
                    Total solid / TS (%)
                  </label>
                  <input
                    id="input-ts"
                    type="number"
                    step={0.5}
                    min={5}
                    max={60}
                    value={inputs.tsPct}
                    onChange={(e) => {
                      const val = parseFloat(e.target.value);
                      if (!Number.isNaN(val)) setInputs((p) => ({ ...p, tsPct: val }));
                    }}
                    className="w-full rounded-md border border-[#E9EDF5] px-2.5 py-1.5 text-xs font-mono text-[#1F2A44] tabular-nums"
                  />
                </div>
                <div>
                  <label htmlFor="input-vs" className="block text-[11px] font-semibold text-[#1F2A44] mb-1">
                    Volatile solid / VS (%)
                  </label>
                  <input
                    id="input-vs"
                    type="number"
                    step={0.1}
                    min={50}
                    max={100}
                    value={inputs.vsPct}
                    onChange={(e) => {
                      const val = parseFloat(e.target.value);
                      if (!Number.isNaN(val)) setInputs((p) => ({ ...p, vsPct: val }));
                    }}
                    className="w-full rounded-md border border-[#E9EDF5] px-2.5 py-1.5 text-xs font-mono text-[#1F2A44] tabular-nums"
                  />
                </div>
                <div>
                  <label htmlFor="input-yield" className="block text-[11px] font-semibold text-[#1F2A44] mb-1">
                    Hasil CH₄ (m³/kg VS)
                  </label>
                  <input
                    id="input-yield"
                    type="number"
                    step={0.01}
                    min={0.05}
                    max={0.6}
                    disabled={inputs.skenario === 'optimistis'}
                    value={inputs.yieldCh4PerKgVs}
                    onChange={(e) => {
                      const val = parseFloat(e.target.value);
                      if (!Number.isNaN(val)) {
                        setInputs((p) => ({ ...p, skenario: 'kustom', yieldCh4PerKgVs: val }));
                      }
                    }}
                    className="w-full rounded-md border border-[#E9EDF5] px-2.5 py-1.5 text-xs font-mono text-[#1F2A44] tabular-nums disabled:bg-[#E9EDF5]/50 disabled:text-[#5A6275]"
                  />
                </div>
                <div>
                  <label htmlFor="input-leak" className="block text-[11px] font-semibold text-[#1F2A44] mb-1">
                    Kebocoran CH₄ (%)
                  </label>
                  <input
                    id="input-leak"
                    type="number"
                    step={0.2}
                    min={0}
                    max={30}
                    value={inputs.kebocoranPct}
                    onChange={(e) => {
                      const val = parseFloat(e.target.value);
                      if (!Number.isNaN(val)) {
                        setInputs((p) => ({ ...p, skenario: 'kustom', kebocoranPct: val }));
                      }
                    }}
                    className="w-full rounded-md border border-[#E9EDF5] px-2.5 py-1.5 text-xs font-mono text-[#1F2A44] tabular-nums"
                  />
                </div>
                <div>
                  <label htmlFor="input-porsi" className="block text-[11px] font-semibold text-[#1F2A44] mb-1">
                    Porsi per hari
                  </label>
                  <input
                    id="input-porsi"
                    type="number"
                    step={10}
                    min={100}
                    value={inputs.porsiPerHari}
                    onChange={(e) => {
                      const val = parseFloat(e.target.value);
                      if (!Number.isNaN(val)) setInputs((p) => ({ ...p, porsiPerHari: val }));
                    }}
                    className="w-full rounded-md border border-[#E9EDF5] px-2.5 py-1.5 text-xs font-mono text-[#1F2A44] tabular-nums"
                  />
                </div>
                <div>
                  <label htmlFor="input-bersyarat" className="block text-[11px] font-semibold text-[#1F2A44] mb-1">
                    Porsi bersyarat (%)
                  </label>
                  <input
                    id="input-bersyarat"
                    type="number"
                    step={0.5}
                    min={0}
                    max={20}
                    value={inputs.porsiBersyaratPct}
                    onChange={(e) => {
                      const val = parseFloat(e.target.value);
                      if (!Number.isNaN(val)) setInputs((p) => ({ ...p, porsiBersyaratPct: val }));
                    }}
                    className="w-full rounded-md border border-[#E9EDF5] px-2.5 py-1.5 text-xs font-mono text-[#1F2A44] tabular-nums"
                  />
                </div>
              </div>

              {/* Sakelar G_H dan G_L */}
              <div className="pt-3 border-t border-[#E9EDF5]">
                <p className="text-xs font-bold text-[#1F2A44] mb-2">
                  Gerbang Kepatuhan Wajib (G_H &amp; G_L)
                </p>
                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setInputs((p) => ({ ...p, gH: !p.gH }))}
                    aria-pressed={inputs.gH}
                    className={`px-3 py-2 rounded-lg border text-xs font-semibold text-left transition-colors ${
                      inputs.gH
                        ? 'border-[#2E7D4F]/40 bg-[#2E7D4F]/10 text-[#2E7D4F]'
                        : 'border-[#B23A3A]/50 bg-[#B23A3A]/10 text-[#B23A3A]'
                    }`}
                  >
                    G_H (SLHS): {inputs.gH ? 'Lolos (1)' : 'Gagal (0)'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setInputs((p) => ({ ...p, gL: !p.gL }))}
                    aria-pressed={inputs.gL}
                    className={`px-3 py-2 rounded-lg border text-xs font-semibold text-left transition-colors ${
                      inputs.gL
                        ? 'border-[#2E7D4F]/40 bg-[#2E7D4F]/10 text-[#2E7D4F]'
                        : 'border-[#B23A3A]/50 bg-[#B23A3A]/10 text-[#B23A3A]'
                    }`}
                  >
                    G_L (Efluen): {inputs.gL ? 'Lolos (1)' : 'Gagal (0)'}
                  </button>
                </div>
              </div>

              {/* Jumlah SPPG Skala */}
              <div className="pt-3 border-t border-[#E9EDF5]">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <label htmlFor="input-sppg" className="text-xs font-bold text-[#1F2A44]">
                    Jumlah SPPG disimulasikan
                  </label>
                  <input
                    id="input-sppg"
                    type="number"
                    min={1}
                    max={50000}
                    value={inputs.jumlahSppg}
                    onChange={(e) => {
                      const val = parseInt(e.target.value, 10);
                      if (!Number.isNaN(val)) setInputs((p) => ({ ...p, jumlahSppg: Math.max(1, val) }));
                    }}
                    className="w-24 rounded-md border border-[#E9EDF5] px-2.5 py-1 text-right text-xs font-mono font-bold text-[#1F2A44] tabular-nums"
                  />
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    { count: 741, label: '741 (Banten)' },
                    { count: 1172, label: '1.172 (Target Banten)' },
                    { count: 27022, label: '27.022 (Nasional)' },
                  ].map((preset) => (
                    <button
                      key={preset.count}
                      type="button"
                      onClick={() => setInputs((p) => ({ ...p, jumlahSppg: preset.count }))}
                      className={`px-2.5 py-1.5 rounded-lg text-[11px] font-semibold transition-colors whitespace-nowrap ${
                        inputs.jumlahSppg === preset.count
                          ? 'bg-[#C9A227] text-[#1F2A44]'
                          : 'bg-[#E9EDF5]/70 text-[#1F2A44] hover:bg-[#E9EDF5]'
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Panel Hasil & Grafik (7 cols) */}
          <div className="lg:col-span-7 space-y-5">
            {/* Peringatan Gerbang */}
            {(leakageExceeded || gateFailed) && (
              <div className="space-y-2">
                {leakageExceeded && (
                  <div className="rounded-xl border border-[#C9A227] bg-[#FFF6DC] px-4 py-3 flex items-center gap-2.5 text-xs font-semibold text-[#1F2A44]">
                    <AlertCircle className="w-4 h-4 text-[#B23A3A] shrink-0" aria-hidden="true" />
                    <span>
                      Melewati gerbang kebocoran ≤5% (saat ini {formatId(inputs.kebocoranPct, 1)}%). Diperlukan perbaikan penyegelan &amp; deteksi gas.
                    </span>
                  </div>
                )}
                {gateFailed && (
                  <div className="rounded-xl border border-[#B23A3A] bg-[#B23A3A]/10 px-4 py-3 flex items-center gap-2.5 text-xs font-bold text-[#B23A3A]">
                    <AlertCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                    <span>Insentif gugur: efluen/higiene tidak lolos (IK = 0,00).</span>
                  </div>
                )}
              </div>
            )}

            {/* Grid Kartu Hasil */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
              <div className="rounded-xl border border-[#E9EDF5] bg-white p-4">
                <p className="text-[11px] font-medium text-[#5A6275]">Produksi Metana (CH₄)</p>
                <p className="mt-1 text-2xl font-extrabold text-[#1F2A44] tabular-nums">
                  {formatId(result.ch4M3PerHari, 2)} m³/hari
                </p>
                <p className="mt-1.5 text-[11px] text-[#5A6275]">perhitungan penulis</p>
              </div>

              <div className="rounded-xl border border-[#E9EDF5] bg-white p-4">
                <p className="text-[11px] font-medium text-[#5A6275]">Substitusi LPG-ekuivalen</p>
                <p className="mt-1 text-2xl font-extrabold text-[#1F2A44] tabular-nums">
                  {formatId(result.lpgEqKgPerHari, 2)} kg/hari
                </p>
                <p className="mt-0.5 text-xs font-bold text-[#2E7D4F] tabular-nums">
                  {formatId(result.substitusiPct, 1)}% dari kebutuhan {formatId(inputs.lpgBaselineKgPerHari, 1)} kg
                </p>
                <p className="mt-1 text-[11px] text-[#5A6275]">perhitungan penulis</p>
              </div>

              <div className="rounded-xl border border-[#E9EDF5] bg-white p-4">
                <p className="text-[11px] font-medium text-[#5A6275]">Pengurangan Emisi Bersih</p>
                <p className="mt-1 text-2xl font-extrabold text-[#1F2A44] tabular-nums">
                  {formatId(result.penguranganBersihTonCo2ePerThn, 2)} t CO₂e/thn
                </p>
                <p className="mt-0.5 text-xs font-semibold text-[#5A6275] tabular-nums">
                  {formatId(result.persenDariBaseline, 1)}% dari baseline 43,7 t CO₂e
                </p>
                <p className="mt-1 text-[11px] text-[#5A6275]">perhitungan penulis</p>
              </div>

              <div className="rounded-xl border border-[#E9EDF5] bg-white p-4">
                <p className="text-[11px] font-medium text-[#5A6275]">Hemat Belanja LPG</p>
                <p className="mt-1 text-2xl font-extrabold text-[#1F2A44] tabular-nums">
                  Rp{formatId(result.hematLpgJutaPerThn, 2)} juta/thn
                </p>
                <p className="mt-0.5 text-[11px] text-[#5A6275] tabular-nums">
                  Nilai khas biogas vs kompos: {formatId(result.nilaiKhasBiogasVsKompos, 2)} t CO₂e/thn
                </p>
                <p className="mt-1 text-[11px] text-[#5A6275]">perhitungan penulis</p>
              </div>

              <div className="rounded-xl border border-[#E9EDF5] bg-white p-4">
                <p className="text-[11px] font-medium text-[#5A6275]">Indeks Kinerja &amp; Insentif</p>
                <p className="mt-1 text-2xl font-extrabold text-[#1F2A44] tabular-nums">
                  IK {formatId(result.ik, 2)}
                </p>
                <p className="mt-0.5 text-xs font-bold text-[#1F2A44] tabular-nums">
                  Rp{formatId(result.insentifIkJutaPerThn, 2)} juta/thn
                </p>
                <p className="mt-1 text-[11px] text-[#5A6275]">perhitungan penulis</p>
              </div>

              <div className="rounded-xl border border-[#E9EDF5] bg-white p-4">
                <p className="text-[11px] font-medium text-[#5A6275]">Balik Modal Investasi</p>
                <p className="mt-1 text-2xl font-extrabold text-[#1F2A44] tabular-nums">
                  {formatId(result.balikModalDenganIkThn, 1)} thn <span className="text-xs font-medium text-[#5A6275]">(dg IK)</span>
                </p>
                <p className="mt-0.5 text-xs text-[#5A6275] tabular-nums">
                  Tanpa IK: {formatId(result.balikModalTanpaInsentifThn, 1)} thn
                </p>
                <div className={`mt-2 inline-block px-2 py-0.5 rounded border text-[11px] font-bold ${paybackBadge.colorClass}`}>
                  {paybackBadge.label}
                </div>
                <p className="mt-1 text-[11px] text-[#5A6275]">perhitungan penulis</p>
              </div>
            </div>

            {/* Skala Regional / Nasional */}
            <div className="rounded-xl bg-[#1F2A44] text-white p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p className="text-xs font-bold text-[#C9A227]">
                  Proyeksi Skala {formatIntId(inputs.jumlahSppg)} SPPG
                </p>
                <p className="text-xs text-[#E9EDF5]/80 mt-0.5">
                  Akumulasi penghematan LPG dan mitigasi emisi tahunan (perhitungan penulis).
                </p>
              </div>
              <div className="flex flex-wrap gap-6 tabular-nums">
                <div>
                  <p className="text-[11px] text-[#E9EDF5]/80">Substitusi LPG</p>
                  <p className="text-xl font-extrabold text-white">
                    {formatId(result.skalaLpgTonPerHari, 2)} t/hari
                  </p>
                </div>
                <div>
                  <p className="text-[11px] text-[#E9EDF5]/80">Pengurangan Emisi Bersih</p>
                  <p className="text-xl font-extrabold text-[#C9A227]">
                    {formatIntId(result.skalaEmisiTonCo2ePerThn)} t CO₂e/thn
                  </p>
                </div>
              </div>
            </div>

            {/* Dua Grafik */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Grafik Emisi Bertumpuk */}
              <article className="rounded-xl border border-[#E9EDF5] bg-white p-4">
                <h4 className="text-sm font-bold text-[#1F2A44]">
                  Komponen Neraca Emisi (t CO₂e/thn)
                </h4>
                <p className="text-xs text-[#5A6275] mb-3">
                  Kontribusi TPA dihindari, LPG dihindari, dan penalti kebocoran metana (perhitungan penulis).
                </p>
                <div className="h-56 w-full" role="img" aria-label="Grafik batang bertumpuk komponen pengurangan emisi dan kebocoran metana">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={emissionStackData}
                      stackOffset="sign"
                      margin={{ top: 10, right: 12, left: -12, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#E9EDF5" vertical={false} />
                      <XAxis dataKey="komponen" tick={{ fontSize: 11, fill: '#5A6275' }} />
                      <YAxis tick={{ fontSize: 11, fill: '#5A6275' }} />
                      <ReferenceLine y={0} stroke="#1F2A44" strokeWidth={1} />
                      <Tooltip
                        formatter={(val, name) => [
                          `${formatId(Number(val ?? 0), 2)} t CO₂e/thn`,
                          String(name ?? ''),
                        ]}
                        contentStyle={{ borderRadius: '8px', borderColor: '#E9EDF5', fontSize: '12px' }}
                      />
                      <Legend wrapperStyle={{ fontSize: '11px' }} />
                      <Bar
                        dataKey="tpaDihindari"
                        name="TPA dihindari"
                        stackId="emisi"
                        fill="#8CA8D9"
                      />
                      <Bar
                        dataKey="lpgDihindari"
                        name="LPG dihindari"
                        stackId="emisi"
                        fill="#C9A227"
                      />
                      <Bar
                        dataKey="kebocoranNegatif"
                        name="Kebocoran CH₄ (negatif)"
                        stackId="emisi"
                        fill="#B23A3A"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </article>

              {/* Grafik Perbandingan 3 Skenario */}
              <article className="rounded-xl border border-[#E9EDF5] bg-white p-4">
                <h4 className="text-sm font-bold text-[#1F2A44]">
                  Perbandingan Tiga Skenario (%)
                </h4>
                <p className="text-xs text-[#5A6275] mb-3">
                  Persentase substitusi LPG pada input sisa &amp; hari layanan saat ini (perhitungan penulis).
                </p>
                <div className="h-56 w-full" role="img" aria-label="Grafik perbandingan persentase substitusi LPG pada skenario Konservatif, Moderat, dan Optimistis">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={threeScenarioComparison}
                      margin={{ top: 10, right: 12, left: -14, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#E9EDF5" vertical={false} />
                      <XAxis dataKey="skenario" tick={{ fontSize: 11, fill: '#1F2A44' }} />
                      <YAxis unit="%" tick={{ fontSize: 11, fill: '#5A6275' }} />
                      <Tooltip
                        formatter={(val) => [`${formatId(Number(val ?? 0), 1)}%`, 'Substitusi LPG']}
                        contentStyle={{ borderRadius: '8px', borderColor: '#E9EDF5', fontSize: '12px' }}
                      />
                      <Bar dataKey="substitusiPct" radius={[4, 4, 0, 0]}>
                        {threeScenarioComparison.map((item, i) => (
                          <Cell
                            key={item.skenario}
                            fill={i === 0 ? '#5A6275' : i === 1 ? '#1F2A44' : '#2E7D4F'}
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </article>
            </div>

            {/* Kotak Catatan Jujur (selalu tampil) */}
            <div className="rounded-xl border-2 border-dashed border-[#C9A227] bg-[#FFF6DC] p-4 flex items-start gap-3">
              <Info className="w-5 h-5 text-[#1F2A44] shrink-0 mt-0.5" aria-hidden="true" />
              <div className="text-xs sm:text-sm text-[#1F2A44] leading-relaxed">
                <span className="font-bold">Catatan Jujur: </span>
                Sebagian besar pengurangan emisi berasal dari pengalihan sisa pangan dari TPA, yang juga dicapai kompos. Nilai khas biogas adalah substitusi LPG impor. Tanpa insentif, balik modal digester sekitar 9–27 tahun.
              </div>
            </div>

            {/* Panel "Lihat rumus" */}
            <div className="rounded-xl border border-[#E9EDF5] bg-white overflow-hidden">
              <button
                type="button"
                onClick={() => setShowFormula((p) => !p)}
                aria-expanded={showFormula}
                className="w-full px-5 py-3 flex items-center justify-between text-xs font-bold text-[#1F2A44] hover:bg-[#E9EDF5]/40 transition-colors"
              >
                <span>Lihat rumus dan konstanta perhitungan</span>
                {showFormula ? (
                  <ChevronUp className="w-4 h-4 text-[#5A6275]" aria-hidden="true" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-[#5A6275]" aria-hidden="true" />
                )}
              </button>

              {showFormula && (
                <div className="px-5 pb-5 pt-2 border-t border-[#E9EDF5] space-y-3">
                  <pre className="rounded-lg bg-[#1F2A44] text-[#FFF6DC] p-4 text-xs overflow-x-auto leading-relaxed font-mono">
{`CH4 (m3/hari) = sisa × TS × VS × Y        // Y dalam m3 CH4/kg VS
   (untuk Optimistis: CH4 = sisa/1000 × 84,4)
LPG_eq (kg/hari) = CH4 × (1 − kebocoran) × 35,8 / 47,3
Substitusi (%) = LPG_eq / LPG_baseline × 100
LPG_dihindari (t CO2/thn) = LPG_eq × hari × 2,985 / 1000
Kebocoran (t CO2e/thn) = CH4 × kebocoran × 0,717 × hari × 27 / 1000
TPA_dihindari (t CO2e/thn) = 9,83 × (sisa / 49)
Pengurangan_bersih = LPG_dihindari + TPA_dihindari − Kebocoran
Persen_dari_baseline = Pengurangan_bersih / 43,7 × 100
Nilai_khas_biogas_vs_kompos = LPG_dihindari − Kebocoran
Hemat_LPG (Rp/thn) = LPG_eq × hari × harga_LPG
E = min(1, Substitusi% / 15)
IK = G_H × G_L × (0,5·O + 0,5·E)
Insentif_IK (Rp/thn) = IK × porsi × 2.000 × 2,5% × hari
Balik_modal_tanpa_insentif = capex / Hemat_LPG
Balik_modal_dengan_IK = capex / (Hemat_LPG + Insentif_IK)
Skala: LPG_eq × jumlah_SPPG / 1000 (t/hari); Pengurangan_bersih × jumlah_SPPG (t CO2e/thn)`}
                  </pre>
                  <p className="text-xs text-[#5A6275] leading-relaxed">
                    <span className="font-semibold text-[#1F2A44]">Sumber Konstanta:</span> LHV metana 35,8 MJ/m³; NCV LPG 47,3 MJ/kg dan faktor emisi 63,1 t CO₂/TJ ≈ 2,985 kg CO₂/kg (IPCC, 2006); densitas CH₄ 0,717 kg/m³; GWP CH₄ 27 (Forster dkk., 2021); harga Bright Gas 12 kg Rp220.000 ≈ Rp18.333/kg (Pertamina Patra Niaga).
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </RevealSection>
  );
}
