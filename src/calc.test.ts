import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateDaurApi,
  calculateIK,
  DEFAULT_INPUTS,
  SCENARIO_PRESETS,
} from './calc.ts';

function assertClose(actual: number, expected: number, relTol = 0.01, label = '') {
  const diff = Math.abs(actual - expected);
  const limit = Math.abs(expected) * relTol;
  assert.ok(
    diff <= limit,
    `${label}: expected ~${expected} (±${relTol * 100}%), got ${actual} (diff=${diff})`,
  );
}

describe('DAUR-API Calculator Reference Tests', () => {
  it('reproduces Konservatif reference values (49 kg, 141.5 hari, IK penuh)', () => {
    const res = calculateDaurApi({
      ...DEFAULT_INPUTS,
      skenario: 'konservatif',
      yieldCh4PerKgVs: SCENARIO_PRESETS.konservatif.yieldCh4PerKgVs,
      kebocoranPct: SCENARIO_PRESETS.konservatif.kebocoranPct,
    });

    assertClose(res.lpgEqKgPerHari, 1.4, 0.01, 'Konservatif LPG_eq');
    assertClose(res.substitusiPct, 7.5, 0.01, 'Konservatif substitusi %');
    assertClose(res.penguranganBersihTonCo2ePerThn, 9.93, 0.01, 'Konservatif bersih t CO2e');
    assertClose(res.hematLpgJutaPerThn, 3.63, 0.01, 'Konservatif hemat LPG juta');
    assertClose(res.skalaLpgTonPerHari, 1.04, 0.01, 'Konservatif Banten t/hari');
    assertClose(res.skalaEmisiTonCo2ePerThn, 7361, 0.01, 'Konservatif Banten t CO2e/thn');
  });

  it('reproduces Moderat reference values (49 kg, 141.5 hari, IK penuh)', () => {
    const res = calculateDaurApi({
      ...DEFAULT_INPUTS,
      skenario: 'moderat',
      yieldCh4PerKgVs: SCENARIO_PRESETS.moderat.yieldCh4PerKgVs,
      kebocoranPct: SCENARIO_PRESETS.moderat.kebocoranPct,
    });

    assertClose(res.lpgEqKgPerHari, 2.22, 0.01, 'Moderat LPG_eq');
    assertClose(res.substitusiPct, 11.9, 0.01, 'Moderat substitusi %');
    assertClose(res.penguranganBersihTonCo2ePerThn, 10.31, 0.01, 'Moderat bersih t CO2e');
    assertClose(res.hematLpgJutaPerThn, 5.76, 0.01, 'Moderat hemat LPG juta');
    assertClose(res.skalaLpgTonPerHari, 1.64, 0.01, 'Moderat Banten t/hari');
    assertClose(res.skalaEmisiTonCo2ePerThn, 7640, 0.01, 'Moderat Banten t CO2e/thn');
  });

  it('reproduces Optimistis reference values (49 kg, 141.5 hari, IK penuh)', () => {
    const res = calculateDaurApi({
      ...DEFAULT_INPUTS,
      skenario: 'optimistis',
      yieldCh4PerKgVs: SCENARIO_PRESETS.optimistis.yieldCh4PerKgVs,
      kebocoranPct: SCENARIO_PRESETS.optimistis.kebocoranPct,
    });

    assertClose(res.lpgEqKgPerHari, 3.07, 0.01, 'Optimistis LPG_eq');
    assertClose(res.substitusiPct, 16.4, 0.01, 'Optimistis substitusi %');
    assertClose(res.penguranganBersihTonCo2ePerThn, 10.9, 0.01, 'Optimistis bersih t CO2e');
    assertClose(res.hematLpgJutaPerThn, 7.96, 0.01, 'Optimistis hemat LPG juta');
    assertClose(res.skalaLpgTonPerHari, 2.27, 0.01, 'Optimistis Banten t/hari');
    assertClose(res.skalaEmisiTonCo2ePerThn, 8078, 0.01, 'Optimistis Banten t CO2e/thn');
  });

  it('zeros out IK when G_H or G_L fails and computes example IK = 0.85', () => {
    const ex = calculateIK({ nilaiO: 0.9, substitusiPct: 11.9, gH: true, gL: true });
    assertClose(ex.ik, 0.85, 0.01, 'Contoh IK');
    assert.equal(ex.maksInsentifPerHari, 156000);

    const failH = calculateIK({ nilaiO: 0.9, substitusiPct: 11.9, gH: false, gL: true });
    assert.equal(failH.ik, 0);
    assert.equal(failH.keputusan, 'Hentikan');
  });
});
