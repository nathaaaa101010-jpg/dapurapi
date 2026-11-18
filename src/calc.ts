export type ScenarioKey = 'konservatif' | 'moderat' | 'optimistis' | 'kustom';

export interface CalculatorInputs {
  sisaKgPerHari: number;
  hariPerTahun: number;
  lpgBaselineKgPerHari: number;
  tsPct: number;
  vsPct: number;
  skenario: ScenarioKey;
  yieldCh4PerKgVs: number;
  kebocoranPct: number;
  hargaLpgPerKg: number;
  capexJuta: number;
  porsiPerHari: number;
  insentifPerPorsi: number;
  porsiBersyaratPct: number;
  nilaiO: number;
  gH: boolean;
  gL: boolean;
  jumlahSppg: number;
}

export interface CalculatorResult {
  ch4M3PerHari: number;
  lpgEqKgPerHari: number;
  substitusiPct: number;
  lpgDihindariTonCo2PerThn: number;
  kebocoranTonCo2ePerThn: number;
  tpaDihindariTonCo2ePerThn: number;
  penguranganBersihTonCo2ePerThn: number;
  persenDariBaseline: number;
  nilaiKhasBiogasVsKompos: number;
  hematLpgRpPerThn: number;
  hematLpgJutaPerThn: number;
  nilaiE: number;
  ik: number;
  insentifIkRpPerThn: number;
  insentifIkJutaPerThn: number;
  balikModalTanpaInsentifThn: number;
  balikModalDenganIkThn: number;
  skalaLpgTonPerHari: number;
  skalaEmisiTonCo2ePerThn: number;
}

export const CALC_CONSTANTS = {
  LHV_CH4_MJ_M3: 35.8,
  NCV_LPG_MJ_KG: 47.3,
  EMISSION_LPG_KG_CO2_KG: 2.985,
  DENSITY_CH4_KG_M3: 0.717,
  GWP_CH4: 27,
  OPTIMISTIS_CH4_M3_PER_TON: 84.4,
  TPA_REF_CO2E_PER_THN: 9.83,
  TPA_REF_SISA_KG: 49,
  BASELINE_EMISI_SPPG_TON: 43.7,
} as const;

export const SCENARIO_PRESETS: Record<
  Exclude<ScenarioKey, 'kustom'>,
  { label: string; yieldCh4PerKgVs: number; kebocoranPct: number; deskripsi: string }
> = {
  konservatif: {
    label: 'Konservatif',
    yieldCh4PerKgVs: 0.191,
    kebocoranPct: 8.8,
    deskripsi: '0,191 m³ CH₄/kg VS · kebocoran 8,8%',
  },
  moderat: {
    label: 'Moderat',
    yieldCh4PerKgVs: 0.292,
    kebocoranPct: 5.4,
    deskripsi: '0,292 m³ CH₄/kg VS · kebocoran 5,4%',
  },
  optimistis: {
    label: 'Optimistis',
    yieldCh4PerKgVs: 0.389,
    kebocoranPct: 2.0,
    deskripsi: '84,4 m³ CH₄/t sisa · kebocoran 2,0%',
  },
};

export const DEFAULT_INPUTS: CalculatorInputs = {
  sisaKgPerHari: 49,
  hariPerTahun: 141.5,
  lpgBaselineKgPerHari: 18.7,
  tsPct: 23,
  vsPct: 94.2,
  skenario: 'moderat',
  yieldCh4PerKgVs: 0.292,
  kebocoranPct: 5.4,
  hargaLpgPerKg: 18333,
  capexJuta: 52.7,
  porsiPerHari: 3120,
  insentifPerPorsi: 2000,
  porsiBersyaratPct: 2.5,
  nilaiO: 0.9,
  gH: true,
  gL: true,
  jumlahSppg: 741,
};

export function calculateDaurApi(inputs: CalculatorInputs): CalculatorResult {
  const {
    sisaKgPerHari,
    hariPerTahun,
    lpgBaselineKgPerHari,
    tsPct,
    vsPct,
    skenario,
    yieldCh4PerKgVs,
    kebocoranPct,
    hargaLpgPerKg,
    capexJuta,
    porsiPerHari,
    insentifPerPorsi,
    porsiBersyaratPct,
    nilaiO,
    gH,
    gL,
    jumlahSppg,
  } = inputs;

  const ts = tsPct / 100;
  const vs = vsPct / 100;
  const kebocoran = kebocoranPct / 100;

  const ch4M3PerHari =
    skenario === 'optimistis'
      ? (sisaKgPerHari / 1000) * CALC_CONSTANTS.OPTIMISTIS_CH4_M3_PER_TON
      : sisaKgPerHari * ts * vs * yieldCh4PerKgVs;

  const lpgEqKgPerHari =
    ch4M3PerHari *
    (1 - kebocoran) *
    (CALC_CONSTANTS.LHV_CH4_MJ_M3 / CALC_CONSTANTS.NCV_LPG_MJ_KG);

  const substitusiPct =
    lpgBaselineKgPerHari > 0 ? (lpgEqKgPerHari / lpgBaselineKgPerHari) * 100 : 0;

  const lpgDihindariTonCo2PerThn =
    (lpgEqKgPerHari * hariPerTahun * CALC_CONSTANTS.EMISSION_LPG_KG_CO2_KG) / 1000;

  const kebocoranTonCo2ePerThn =
    (ch4M3PerHari *
      kebocoran *
      CALC_CONSTANTS.DENSITY_CH4_KG_M3 *
      hariPerTahun *
      CALC_CONSTANTS.GWP_CH4) /
    1000;

  const tpaDihindariTonCo2ePerThn =
    CALC_CONSTANTS.TPA_REF_CO2E_PER_THN *
    (sisaKgPerHari / CALC_CONSTANTS.TPA_REF_SISA_KG);

  const penguranganBersihTonCo2ePerThn =
    lpgDihindariTonCo2PerThn + tpaDihindariTonCo2ePerThn - kebocoranTonCo2ePerThn;

  const persenDariBaseline =
    (penguranganBersihTonCo2ePerThn / CALC_CONSTANTS.BASELINE_EMISI_SPPG_TON) * 100;

  const nilaiKhasBiogasVsKompos = lpgDihindariTonCo2PerThn - kebocoranTonCo2ePerThn;

  const hematLpgRpPerThn = lpgEqKgPerHari * hariPerTahun * hargaLpgPerKg;
  const hematLpgJutaPerThn = hematLpgRpPerThn / 1_000_000;

  const nilaiE = Math.min(1, substitusiPct / 15);
  const ik = (gH ? 1 : 0) * (gL ? 1 : 0) * (0.5 * nilaiO + 0.5 * nilaiE);

  const insentifIkRpPerThn =
    ik * porsiPerHari * insentifPerPorsi * (porsiBersyaratPct / 100) * hariPerTahun;
  const insentifIkJutaPerThn = insentifIkRpPerThn / 1_000_000;

  const capexRp = capexJuta * 1_000_000;
  const balikModalTanpaInsentifThn =
    hematLpgRpPerThn > 0 ? capexRp / hematLpgRpPerThn : Number.POSITIVE_INFINITY;
  const totalArusKas = hematLpgRpPerThn + insentifIkRpPerThn;
  const balikModalDenganIkThn =
    totalArusKas > 0 ? capexRp / totalArusKas : Number.POSITIVE_INFINITY;

  const skalaLpgTonPerHari = (lpgEqKgPerHari * jumlahSppg) / 1000;
  const skalaEmisiTonCo2ePerThn = penguranganBersihTonCo2ePerThn * jumlahSppg;

  return {
    ch4M3PerHari,
    lpgEqKgPerHari,
    substitusiPct,
    lpgDihindariTonCo2PerThn,
    kebocoranTonCo2ePerThn,
    tpaDihindariTonCo2ePerThn,
    penguranganBersihTonCo2ePerThn,
    persenDariBaseline,
    nilaiKhasBiogasVsKompos,
    hematLpgRpPerThn,
    hematLpgJutaPerThn,
    nilaiE,
    ik,
    insentifIkRpPerThn,
    insentifIkJutaPerThn,
    balikModalTanpaInsentifThn,
    balikModalDenganIkThn,
    skalaLpgTonPerHari,
    skalaEmisiTonCo2ePerThn,
  };
}

export interface IKSimulationResult {
  nilaiE: number;
  ik: number;
  maksInsentifPerHari: number;
  insentifPerHari: number;
  insentifPerTahun: number;
  keputusan: 'Lanjut' | 'Perbaiki' | 'Hentikan';
}

export function calculateIK(params: {
  nilaiO: number;
  substitusiPct: number;
  gH: boolean;
  gL: boolean;
  porsiPerHari?: number;
  hariPerTahun?: number;
}): IKSimulationResult {
  const {
    nilaiO,
    substitusiPct,
    gH,
    gL,
    porsiPerHari = 3120,
    hariPerTahun = 141.5,
  } = params;

  const nilaiE = Math.min(1, Math.max(0, substitusiPct) / 15);
  const ik = (gH ? 1 : 0) * (gL ? 1 : 0) * (0.5 * nilaiO + 0.5 * nilaiE);
  const maksInsentifPerHari = porsiPerHari * 2000 * 0.025;
  const insentifPerHari = ik * maksInsentifPerHari;
  const insentifPerTahun = insentifPerHari * hariPerTahun;

  let keputusan: 'Lanjut' | 'Perbaiki' | 'Hentikan' = 'Lanjut';
  if (!gH || !gL) {
    keputusan = 'Hentikan';
  } else if (ik < 0.7) {
    keputusan = 'Perbaiki';
  }

  return {
    nilaiE,
    ik,
    maksInsentifPerHari,
    insentifPerHari,
    insentifPerTahun,
    keputusan,
  };
}

export function formatId(value: number, decimals = 2): string {
  if (!Number.isFinite(value)) return '∞';
  return new Intl.NumberFormat('id-ID', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

export function formatIntId(value: number): string {
  if (!Number.isFinite(value)) return '∞';
  return new Intl.NumberFormat('id-ID', {
    maximumFractionDigits: 0,
  }).format(Math.round(value));
}
