export interface HeroStat {
  id: string;
  angka: string;
  label: string;
  konteks: string;
  sumber: string;
}

export const HERO_STATS: HeroStat[] = [
  {
    id: 'sppg-nasional',
    angka: '27.022',
    label: 'SPPG nasional',
    konteks: 'Satuan Pelayanan Pemenuhan Gizi beroperasi per Agustus 2026',
    sumber: 'Kemenko Pangan, Agustus 2026',
  },
  {
    id: 'sppg-banten',
    angka: '741',
    label: 'SPPG di Provinsi Banten',
    konteks: 'Melayani 2.134.335 penerima manfaat program MBG',
    sumber: 'DJPb Kanwil Banten, 2026',
  },
  {
    id: 'impor-lpg',
    angka: '77,5%',
    label: 'LPG terjual berasal dari impor',
    konteks: 'Ketergantungan tinggi terhadap pasokan impor nasional pada 2024',
    sumber: 'KESDM, 2025',
  },
  {
    id: 'lpg-per-sppg',
    angka: '18,7 kg',
    label: 'Konsumsi LPG per hari / SPPG',
    konteks: 'Kebutuhan energi termal memasak skala dapur 3.120 porsi/hari',
    sumber: 'Dermawan & Fauzi, 2026',
  },
];

export const LPG_CONSUMPTION_DATA = [
  { tahun: '2014', konsumsi: 5843 },
  { tahun: '2015', konsumsi: 6048 },
  { tahun: '2016', konsumsi: 6370 },
  { tahun: '2017', konsumsi: 6905 },
  { tahun: '2018', konsumsi: 7252 },
  { tahun: '2019', konsumsi: 7459 },
  { tahun: '2020', konsumsi: 7691 },
  { tahun: '2021', konsumsi: 8015 },
  { tahun: '2022', konsumsi: 8211 },
  { tahun: '2023', konsumsi: 8353 },
  { tahun: '2024', konsumsi: 8536 },
];

export const SPPG_EMISSION_DATA = [
  { sumber: 'LPG', persen: 37.8, warna: '#C9A227' },
  { sumber: 'Sampah anorganik', persen: 33.2, warna: '#5A6275' },
  { sumber: 'Sampah organik', persen: 22.5, warna: '#2E7D4F' },
  { sumber: 'Transportasi', persen: 6.5, warna: '#1F2A44' },
];

export const ROOT_CAUSES = [
  {
    kode: 'A1',
    judul: 'Aturan',
    ringkas:
      'Perbadan BGN 1/2026 mewajibkan pengelolaan sisa pangan, sampah, dan air limbah (IPAL, kompos, TPS) tanpa satu pasal pun tentang energi.',
  },
  {
    kode: 'A2',
    judul: 'Uang',
    ringkas:
      'Insentif Rp2.000/porsi (Perbadan BGN 13/2026, berlaku 5 Oktober 2026) menilai ketersediaan dan mutu layanan, bukan kinerja energi.',
  },
  {
    kode: 'A3',
    judul: 'Desain',
    ringkas:
      'IPAL hanya mengejar baku mutu; ko-digesti sisa dapur dengan air limbah kakus menaikkan metana 26,4% (Wang dkk., 2020).',
  },
  {
    kode: 'A4',
    judul: 'Manusia & higiene',
    ringkas:
      'Operator biogas langka (Budiman, 2021; Situmeang dkk., 2022); SPPG wajib sertifikat laik higiene (Perbadan BGN 4/2026).',
  },
  {
    kode: 'A5',
    judul: 'Data',
    ringkas: 'Emisi per dapur baru diukur di 1 SPPG.',
  },
];

export const PROBLEM_TIMELINE = [
  { waktu: 'Februari 2026', peristiwa: 'Perbadan BGN 1/2026 terbit' },
  { waktu: 'Maret 2026', peristiwa: 'Penghentian sementara 1.512 SPPG (62 di Banten)' },
  { waktu: 'April 2026', peristiwa: 'Perbadan BGN 4/2026 tentang SLHS berlaku' },
  { waktu: 'Oktober 2026', peristiwa: 'Insentif Rp2.000/porsi berlaku' },
];

export const METHANE_POTENTIAL_DATA = [
  {
    label: 'Kantin Indonesia',
    nilai: 191,
    sumber: 'Suhartini dkk., 2019',
    warna: '#5A6275',
  },
  {
    label: 'Pesantren Indonesia',
    nilai: 292,
    sumber: 'Bilqis dkk., 2023',
    warna: '#1F2A44',
  },
  {
    label: 'Sisa dapur + air kakus',
    nilai: 313.2,
    sumber: 'Wang dkk., 2020',
    warna: '#2E7D4F',
  },
  {
    label: 'Sisa pangan + minyak-lemak',
    nilai: 485,
    sumber: 'Sandriaty dkk., 2018',
    warna: '#C9A227',
  },
];

export interface MechanismStep {
  nomor: number;
  judul: string;
  ringkasan: string;
  detail: string;
  memilikiKuis?: boolean;
}

export const MECHANISM_STEPS: MechanismStep[] = [
  {
    nomor: 1,
    judul: 'Pemisahan aliran di sumber',
    ringkasan: 'Sisa pangan | minyak-lemak | air limbah kakus | air cucian.',
    detail:
      'Setiap aliran dari zona produksi dan sanitasi dapur dipisahkan sejak titik timbulannya agar fraksi berenergi tinggi tidak tercampur deterjen pencucian atau plastik kemasan.',
  },
  {
    nomor: 2,
    judul: 'Uji keputusan aliran limbah',
    ringkasan: '“Organik terurai atau kakus?” YA → digester; TIDAK → IPAL aerob/TPS.',
    detail:
      'Gerbang pemilahan harian menentukan jalur pengolahan yang aman secara proses biologis dan memenuhi standar higiene pangan.',
    memilikiKuis: true,
  },
  {
    nomor: 3,
    judul: 'Pengolahan terintegrasi',
    ringkasan: 'Penangkap lemak → digester anaerob → pemolesan aerob → kompor biogas; digestat → kompos.',
    detail:
      'Minyak-lemak ditahan di grease trap agar tidak menyumbat pipa. Campuran sisa organik dan air limbah kakus dicerna secara anaerob menjadi biogas untuk kompor dapur, sementara efluen cair masuk pemolesan aerob dan digestat padat dikomposkan.',
  },
  {
    nomor: 4,
    judul: 'Pengaman pangan & lingkungan',
    ringkasan: 'Zona kotor terpisah, detektor gas & katup pelepas tekanan, uji efluen tiap 3 bulan, aturan henti operasi.',
    detail:
      'Infrastruktur biogas ditempatkan di zona kotor terpisah dari ruang olah makanan untuk menjaga Sertifikat Laik Higiene Sanitasi (SLHS), dilengkapi detektor gas, katup pelepas tekanan, uji efluen berkala 3 bulanan, serta protokol henti operasi jika ambang batas dilanggar.',
  },
  {
    nomor: 5,
    judul: 'Insentif & evaluasi ex-post',
    ringkasan: 'IK = G_H × G_L × (0,5·O + 0,5·E), dengan tiga hasil: Lanjut / Perbaiki / Hentikan.',
    detail:
      'Kinerja lingkungan dan substitusi energi diverifikasi secara berkala untuk menentukan pencairan porsi insentif bersyarat serta keputusan pembinaan atau penghentian sementara operasional.',
  },
];

export interface WasteQuizItem {
  id: string;
  nama: string;
  masukDigester: boolean;
  jalur: string;
  alasan: string;
}

export const WASTE_QUIZ_ITEMS: WasteQuizItem[] = [
  {
    id: 'nasi',
    nama: 'Sisa nasi',
    masukDigester: true,
    jalur: 'YA → Digester anaerob',
    alasan: 'Karbohidrat mudah terurai menjadi biogas dengan rasio padatan volatil tinggi.',
  },
  {
    id: 'sayur',
    nama: 'Kulit sayur',
    masukDigester: true,
    jalur: 'YA → Digester anaerob',
    alasan: 'Fraksi organik dapur terurai baik dan menghasilkan digestat kaya hara untuk kompos.',
  },
  {
    id: 'minyak',
    nama: 'Minyak goreng bekas',
    masukDigester: true,
    jalur: 'YA → Penangkap lemak → dosis terkendali ke digester',
    alasan:
      'Substrat berenergi tinggi (potensi hingga 485 mL CH₄/g VS pada ko-digesti), namun wajib melalui penangkap lemak dan dosis terkendali agar tidak menyumbat atau menghambat mikroba.',
  },
  {
    id: 'kakus',
    nama: 'Air kakus',
    masukDigester: true,
    jalur: 'YA → Digester anaerob (ko-digesti)',
    alasan:
      'Ko-digesti air limbah kakus dan sisa dapur menaikkan produksi metana 26,4% (Wang dkk., 2020) sekaligus mengurangi beban pencemar sebelum pemolesan aerob.',
  },
  {
    id: 'cucian',
    nama: 'Air cucian berdeterjen',
    masukDigester: false,
    jalur: 'TIDAK → IPAL aerob',
    alasan:
      'Surfaktan deterjen dan volume air besar mengencerkan substrat serta dapat menghambat bakteri metanogen di dalam digester.',
  },
  {
    id: 'plastik',
    nama: 'Plastik',
    masukDigester: false,
    jalur: 'TIDAK → TPS / pemilahan anorganik',
    alasan:
      'Material anorganik tidak terurai secara anaerob dan berisiko menyumbat saluran masuk maupun keluar digester.',
  },
];

export const MECHANISM_ACTORS = [
  { aktor: 'BGN', peran: 'Juknis, Indeks Kinerja (IK), dan skema dana insentif' },
  { aktor: 'KLH & DLH Banten', peran: 'Verifikasi baku mutu efluen dan pengawasan lingkungan' },
  { aktor: 'Perguruan tinggi', peran: 'Audit data operasional, uji BMP, dan analisis efluen' },
  { aktor: 'BUMDes/koperasi + juru biogas', peran: 'Operasi dan pemeliharaan klaster secara harian' },
];

export const POLICY_PILLARS = [
  {
    kode: 'P1',
    judul: 'Satu Sistem, Tiga Kepatuhan Terverifikasi',
    isi: 'Menyatukan pemenuhan higiene (SLHS), baku mutu air limbah (IPAL), dan substitusi energi (biogas) dalam satu alur fisik dan pelaporan.',
  },
  {
    kode: 'P2',
    judul: 'Insentif Mutu Lingkungan-Energi',
    isi: 'Mengaitkan 2,5% porsi insentif Rp2.000/porsi dengan Indeks Kinerja (IK) berbasis gerbang higiene (G_H) dan lingkungan (G_L).',
  },
  {
    kode: 'P3',
    judul: 'Modular & Klaster',
    isi: 'Digester kubah tetap 6 m³ bawah tanah untuk unit mandiri, atau sistem klaster melayani 3–5 SPPG di kawasan perkotaan padat.',
  },
  {
    kode: 'P4',
    judul: 'Juru Biogas & Pengaman Pangan',
    isi: 'Pelatihan operator tersertifikasi, pemisahan ketat zona kotor-bersih, detektor gas, serta uji efluen berkala setiap 3 bulan.',
  },
];

export interface RoadmapPhase {
  fase: string;
  periode: string;
  judul: string;
  rincian: string;
  gate: string;
}

export const ROADMAP_PHASES: RoadmapPhase[] = [
  {
    fase: 'Fase 0',
    periode: 'Q4 2026',
    judul: 'Uji BMP dan baseline LPG',
    rincian: 'Pengukuran potensi metana biokimia (BMP) dan pencatatan baseline pemakaian LPG selama 4 minggu.',
    gate: 'Data baseline lengkap',
  },
  {
    fase: 'Fase 1',
    periode: '2027',
    judul: 'Uji coba 20 SPPG Banten (6 bulan)',
    rincian:
      '10 SPPG mandiri di Serang & Pandeglang + 10 SPPG dalam 3 klaster di Tangerang Selatan, dibanding 20 SPPG pembanding dengan metode selisih-dalam-selisih.',
    gate: 'Efluen patuh ≥90%, kebocoran ≤5%, SLHS 100%',
  },
  {
    fase: 'Fase 2',
    periode: '2028',
    judul: 'Perluasan ke 1.172 SPPG Banten',
    rincian: 'Integrasi resmi Indeks Kinerja (IK) ke dalam petunjuk teknis operasional seluruh SPPG di Banten.',
    gate: 'IK rata-rata ≥0,7 dan balik modal ≤6 tahun',
  },
  {
    fase: 'Fase 3',
    periode: '2029',
    judul: 'Revisi Perbadan 1/2026 skala nasional',
    rincian: 'Penambahan pasal pemanfaatan energi dalam Perbadan BGN 1/2026 untuk penerapan nasional.',
    gate: 'Evaluasi independen dan alokasi APBN/APBD',
  },
];

export const PENTAHELIX_ACTORS = [
  {
    unsur: 'Pemerintah',
    aktor: 'BGN, KLH, DLH & Pemprov Banten',
    peran: 'Regulasi, penetapan juknis IK, penyaluran insentif, dan pengawasan baku mutu.',
  },
  {
    unsur: 'Akademisi',
    aktor: 'Perguruan tinggi mitra',
    peran: 'Audit data independen, uji efluen berkala, serta pengujian BMP substrat lokal.',
  },
  {
    unsur: 'Bisnis',
    aktor: 'Pemasok digester, mitra SPPG',
    peran: 'Konstruksi unit modular/klaster, garansi teknis, serta integrasi kompor biogas di dapur.',
  },
  {
    unsur: 'Komunitas',
    aktor: 'BUMDes/koperasi, juru biogas',
    peran: 'Pengelolaan harian, pemeliharaan rutin, dan distribusi kompos digestat.',
  },
  {
    unsur: 'Media/Publik',
    aktor: 'Dasbor terbuka',
    peran: 'Transparansi capaian substitusi LPG, kepatuhan lingkungan, dan kinerja insentif.',
  },
];

export interface KpiRow {
  indikator: string;
  formula: string;
  baseline: string;
  target: string;
  frekuensi: string;
  sumberData: string;
  penanggungJawab: string;
}

export const KPI_TABLE: KpiRow[] = [
  {
    indikator: 'Penurunan LPG per porsi',
    formula: 'LPG_eq / LPG_baseline × 100%',
    baseline: '18,7 kg/hari (0% substitusi)',
    target: '7,5–16,4%',
    frekuensi: 'Bulanan',
    sumberData: 'Meter gas tersegel & log pembelian LPG',
    penanggungJawab: 'Pengelola SPPG & BGN',
  },
  {
    indikator: 'Sisa organik terolah (O)',
    formula: 'Massa sisa masuk digester / total sisa organik',
    baseline: 'Belum terukur terstandar',
    target: '≥90%',
    frekuensi: 'Harian / rekap bulanan',
    sumberData: 'Timbangan zona kotor & Stop Boros Pangan',
    penanggungJawab: 'Juru biogas & mitra SPPG',
  },
  {
    indikator: 'Kepatuhan efluen (G_L)',
    formula: 'Sampel patuh COD, BOD, TSS / total sampel',
    baseline: 'Sebagian parameter > baku mutu',
    target: '≥90% sampel',
    frekuensi: 'Setiap 3 bulan',
    sumberData: 'Uji laboratorium terakreditasi',
    penanggungJawab: 'DLH Banten & KLH',
  },
  {
    indikator: 'Kebocoran metana (CH₄)',
    formula: 'Laju kebocoran terukur / produksi CH₄',
    baseline: '8,8% (instalasi kecil tak terawat)',
    target: '≤5%',
    frekuensi: 'Triwulanan / audit teknis',
    sumberData: 'Detektor gas & audit akademisi',
    penanggungJawab: 'Perguruan tinggi & juru biogas',
  },
  {
    indikator: 'Kepatuhan higiene (G_H)',
    formula: 'Kepemilikan & validitas SLHS aktif',
    baseline: 'Wajib Perbadan BGN 4/2026',
    target: '100%',
    frekuensi: 'Berkala / inspeksi acak',
    sumberData: 'Sertifikat Laik Higiene Sanitasi',
    penanggungJawab: 'BGN & Dinas Kesehatan',
  },
  {
    indikator: 'Keterlaporan data harian',
    formula: 'Hari terlapor valid / total hari layanan',
    baseline: 'Pelaporan manual parsial',
    target: '≥95% hari',
    frekuensi: 'Mingguan / bulanan',
    sumberData: 'Platform Stop Boros Pangan',
    penanggungJawab: 'Operator SPPG & BGN',
  },
  {
    indikator: 'Indeks Kinerja (IK)',
    formula: 'G_H × G_L × (0,5·O + 0,5·E)',
    baseline: '0 (belum diterapkan)',
    target: '≥0,7',
    frekuensi: 'Triwulanan (ex-post)',
    sumberData: 'Integrasi data meter, efluen, & SLHS',
    penanggungJawab: 'BGN & tim verifikasi',
  },
];

export interface RiskItem {
  kode: string;
  nama: string;
  p: number; // Probabilitas 1-5
  d: number; // Dampak 1-5
  skor: number;
  mitigasi: string;
  penanggungJawab: string;
}

export const RISK_ITEMS: RiskItem[] = [
  {
    kode: 'R1',
    nama: 'Kebocoran metana',
    p: 3,
    d: 4,
    skor: 12,
    mitigasi:
      'Digester kubah tetap bawah tanah, katup pelepas tekanan standar, detektor gas, serta inspeksi sambungan pipa setiap 3 bulan dengan ambang batas ≤5%.',
    penanggungJawab: 'Pemasok digester & juru biogas',
  },
  {
    kode: 'R2',
    nama: 'Kontaminasi pangan',
    p: 2,
    d: 5,
    skor: 10,
    mitigasi:
      'Pemisahan fisik zona kotor dan zona olah makanan, gerbang wajib G_H (SLHS 100%), serta aturan henti operasi bila terjadi pelanggaran higiene.',
    penanggungJawab: 'Pengelola SPPG & Dinas Kesehatan',
  },
  {
    kode: 'R3',
    nama: 'Efluen gagal baku mutu',
    p: 3,
    d: 4,
    skor: 12,
    mitigasi:
      'Tahap pemolesan aerob setelah digester, penangkap lemak di hulu, uji efluen 3 bulanan oleh lab terakreditasi, dan gerbang G_L pada pencairan insentif.',
    penanggungJawab: 'DLH Banten & operator IPAL/biogas',
  },
  {
    kode: 'R4',
    nama: 'Manipulasi data meter',
    p: 2,
    d: 3,
    skor: 6,
    mitigasi:
      'Meter gas tersegel, pencocokan silang terhadap jumlah porsi dan pembelian LPG, serta audit acak oleh perguruan tinggi mitra.',
    penanggungJawab: 'BGN & perguruan tinggi',
  },
  {
    kode: 'R5',
    nama: 'Operator berganti',
    p: 4,
    d: 3,
    skor: 12,
    mitigasi:
      'Skema juru biogas terlatih berbasis BUMDes/koperasi pada model klaster agar kompetensi tidak bergantung pada satu individu di dapur.',
    penanggungJawab: 'BUMDes/koperasi & BGN',
  },
  {
    kode: 'R6',
    nama: 'Penolakan warga karena bau',
    p: 2,
    d: 3,
    skor: 6,
    mitigasi:
      'Sistem reaktor tertutup bawah tanah, pengaliran gas kontinu ke kompor, pengelolaan digestat tertutup, dan pelibatan komunitas sejak tahap desain.',
    penanggungJawab: 'SPPG, BUMDes, & Pemda setempat',
  },
  {
    kode: 'R7',
    nama: 'Capex melebihi estimasi',
    p: 3,
    d: 3,
    skor: 9,
    mitigasi:
      'Standardisasi desain modular 6 m³, pengadaan teragregasi untuk klaster 3–5 SPPG, dan verifikasi biaya pada uji coba Fase 1.',
    penanggungJawab: 'BGN & pemasok digester',
  },
  {
    kode: 'R8',
    nama: 'Harga LPG turun',
    p: 2,
    d: 2,
    skor: 4,
    mitigasi:
      'Desain insentif IK menutup kesenjangan keekonomian sehingga kelayakan investasi tidak semata-mata bergantung pada fluktuasi harga LPG.',
    penanggungJawab: 'BGN & Kemenkeu/Pemda',
  },
];

export interface McaCriterion {
  id: 'emisi' | 'lpg' | 'biaya' | 'teknis' | 'regulasi';
  nama: string;
  bobotDasar: number;
}

export const MCA_CRITERIA: McaCriterion[] = [
  { id: 'emisi', nama: 'Pengurangan emisi', bobotDasar: 25 },
  { id: 'lpg', nama: 'Substitusi LPG', bobotDasar: 20 },
  { id: 'biaya', nama: 'Biaya', bobotDasar: 20 },
  { id: 'teknis', nama: 'Kelayakan teknis & higiene', bobotDasar: 20 },
  { id: 'regulasi', nama: 'Kesesuaian regulasi', bobotDasar: 15 },
];

export interface McaAlternative {
  kode: string;
  nama: string;
  skor: Record<McaCriterion['id'], number>;
}

export const MCA_ALTERNATIVES: McaAlternative[] = [
  {
    kode: 'A0',
    nama: 'Status quo (kompos + IPAL)',
    skor: { emisi: 3, lpg: 1, biaya: 5, teknis: 5, regulasi: 4 },
  },
  {
    kode: 'A1',
    nama: 'Kompos + BSF + PLTS',
    skor: { emisi: 4, lpg: 2, biaya: 2, teknis: 4, regulasi: 3 },
  },
  {
    kode: 'A2',
    nama: 'Biogas tanpa insentif',
    skor: { emisi: 4, lpg: 4, biaya: 1, teknis: 3, regulasi: 2 },
  },
  {
    kode: 'A3',
    nama: 'DAUR-API',
    skor: { emisi: 4, lpg: 4, biaya: 3, teknis: 4, regulasi: 5 },
  },
];

export interface BenchmarkItem {
  wilayah: string;
  konteks: string;
  temuan: string;
  sumber: string;
  pelajaran: string;
}

export const BENCHMARKS: BenchmarkItem[] = [
  {
    wilayah: 'Meksiko',
    konteks: 'Restoran skala komersial',
    temuan:
      'Digester 6 m³ mengolah 40,5 kg sisa/hari menghasilkan 6,1 m³ biogas/hari dan menghemat 692 kg LPG/tahun.',
    sumber: 'Juárez-Hernández & Castro-González, 2015',
    pelajaran:
      'Kapasitas reaktor 6 m³ selaras dengan timbulan sisa organik harian satu dapur SPPG (49 kg/hari).',
  },
  {
    wilayah: 'Zambia',
    konteks: 'Dapur kampus',
    temuan: 'Balik modal tercapai dalam 3,1 tahun dengan IRR 35,5%.',
    sumber: 'Tembo & Luwaya, 2024',
    pelajaran:
      'Operasi dapur institusional berjadwal stabil mempercepat pengembalian investasi bila didukung skema ekonomi yang tepat.',
  },
  {
    wilayah: 'Afrika Selatan',
    konteks: 'Program makan sekolah',
    temuan: 'Digester bawah tanah menghasilkan 62% CH₄ dibanding 42% CH₄ pada unit atas tanah.',
    sumber: 'Ndala dkk., 2026',
    pelajaran:
      'Desain kubah tetap bawah tanah menjaga stabilitas suhu dan kualitas metana sekaligus menghemat lahan dapur.',
  },
  {
    wilayah: 'Thailand',
    konteks: 'Kantin institusi',
    temuan: 'Ko-digesti sisa pangan dengan air limbah domestik terbukti stabil dan produktif.',
    sumber: 'Rattanapan dkk., 2019',
    pelajaran:
      'Penggabungan aliran sisa makanan dan air limbah kakus SPPG layak secara teknis pada iklim tropis Asia Tenggara.',
  },
  {
    wilayah: 'India',
    konteks: 'Pemanfaatan biogas dapur',
    temuan:
      'Penggunaan biogas langsung untuk memasak termasuk jalur dengan pengurangan potensi pemanasan global tertinggi.',
    sumber: 'Singh dkk., 2025',
    pelajaran:
      'Membakar biogas langsung di kompor dapur SPPG lebih efektif dibanding konversi berulang ke listrik.',
  },
  {
    wilayah: 'Jerman & Eropa',
    konteks: 'Audit kebocoran metana',
    temuan:
      'Kebocoran instalasi kecil 8,8%, rata-rata 5,4%, dan 59% kebocoran dapat dihindari tanpa biaya bersih.',
    sumber: 'Wietzel & Schmidt, 2026; Olczak dkk., 2026',
    pelajaran:
      'Pengendalian kebocoran ≤5% adalah syarat mutlak agar manfaat iklim biogas tidak tergerus emisi CH₄.',
  },
];

export interface ForesightQuadrant {
  id: string;
  judul: string;
  posisiRegulasi: 'Tinggi' | 'Rendah';
  posisiHargaLpg: 'Tinggi' | 'Rendah';
  kondisi: string;
  strategi: string;
  tindakanKunci: string;
}

export const FORESIGHT_QUADRANTS: ForesightQuadrant[] = [
  {
    id: 'patuh-mahal',
    judul: 'Patuh tapi Mahal',
    posisiRegulasi: 'Tinggi',
    posisiHargaLpg: 'Rendah',
    kondisi: 'Regulasi energi-limbah kuat, tetapi harga LPG nonsubsidi rendah.',
    strategi: 'Andalkan instrumen insentif IK dan pengakuan nilai pengurangan emisi.',
    tindakanKunci:
      'Pertahankan porsi insentif bersyarat 2,5% serta dorong efisiensi klaster 3–5 SPPG untuk menekan capex per dapur.',
  },
  {
    id: 'berdaulat',
    judul: 'Dapur Berdaulat Energi',
    posisiRegulasi: 'Tinggi',
    posisiHargaLpg: 'Tinggi',
    kondisi: 'Regulasi mewajibkan energi-limbah dan harga LPG nonsubsidi tinggi.',
    strategi: 'Akselerasi penuh menuju kemandirian energi dapur dan penghematan fiskal.',
    tindakanKunci:
      'Replikasi nasional lewat revisi Perbadan BGN 1/2026, perluasan pembiayaan BUMDes/koperasi, dan komersialisasi kompos digestat.',
  },
  {
    id: 'status-quo',
    judul: 'Status Quo',
    posisiRegulasi: 'Rendah',
    posisiHargaLpg: 'Rendah',
    kondisi: 'Tidak ada mandat energi dan harga LPG nonsubsidi tetap rendah.',
    strategi: 'Fokus pada kesiapan data, pengamanan baku mutu IPAL, dan uji coba terbatas.',
    tindakanKunci:
      'Jalankan Fase 0–1 sebagai proyek percontohan berbiaya terkendali guna membuktikan kepatuhan efluen dan pengurangan beban TPA.',
  },
  {
    id: 'inisiatif-mandiri',
    judul: 'Inisiatif Mandiri',
    posisiRegulasi: 'Rendah',
    posisiHargaLpg: 'Tinggi',
    kondisi: 'Dukungan regulasi minim, namun biaya LPG menekan anggaran operasional dapur.',
    strategi: 'Adopsi sukarela berbasis penghematan belanja LPG pada klaster berkapasitas besar.',
    tindakanKunci:
      'Prioritaskan SPPG dengan sisa organik >60 kg/hari atau model klaster Tangerang Selatan untuk memangkas masa balik modal.',
  },
];

export interface BibliographyEntry {
  id: string;
  sitasi: string;
  doi?: string;
}

export const BIBLIOGRAPHY: BibliographyEntry[] = [
  {
    id: 'dermawan2026',
    sitasi:
      'Dermawan, D., & Fauzi, R. (2026). Profil konsumsi energi, timbulan sampah, dan emisi gas rumah kaca pada Satuan Pelayanan Pemenuhan Gizi (SPPG). Jurnal Ilmu Lingkungan, 24(6), 1427–1437.',
    doi: '10.14710/jil.24.6.1427-1437',
  },
  {
    id: 'kanda2026',
    sitasi:
      'Kanda, A., dkk. (2026). Karakterisasi timbulan sisa organik pada tiga dapur SPPG di Kota Bandung. Journal of Research in Social Science, Economics and Management, 6(2), 1737.',
    doi: '10.59141/jrssem.v6i2.1737',
  },
  {
    id: 'asrifah2026',
    sitasi:
      'Asrifah, D., dkk. (2026). Evaluasi kualitas air limbah pada sepuluh SPPG di Kabupaten Sleman terhadap baku mutu lingkungan. CSET, 5(1), 1201.',
    doi: '10.31098/cset.v5i1.1201',
  },
  {
    id: 'wang2020',
    sitasi:
      'Wang, Y., dkk. (2020). Anaerobic co-digestion of food waste and blackwater for enhanced methane recovery. Water, 12(9), 2556.',
    doi: '10.3390/w12092556',
  },
  {
    id: 'sandriaty2018',
    sitasi:
      'Sandriaty, R., dkk. (2018). Biochemical methane potential of food waste co-digested with oil and grease trap residue. E3S Web of Conferences, 67, 02047.',
    doi: '10.1051/e3sconf/20186702047',
  },
  {
    id: 'rattanapan2019',
    sitasi:
      'Rattanapan, C., dkk. (2019). Co-digestion of canteen food waste and domestic wastewater in Thailand. Environments, 6(2), 16.',
    doi: '10.3390/environments6020016',
  },
  {
    id: 'suhartini2019',
    sitasi:
      'Suhartini, S., dkk. (2019). Biochemical methane potential of Indonesian canteen food waste. IOP Conference Series: Earth and Environmental Science, 230(1), 012075.',
    doi: '10.1088/1755-1315/230/1/012075',
  },
  {
    id: 'juarez2015',
    sitasi:
      'Juárez-Hernández, S., & Castro-González, A. (2015). Biogas production from restaurant organic waste in a 6 m³ fixed-dome digester in Mexico. International Journal of Renewable Energy Research.',
    doi: '10.20508/ijrer.44638',
  },
  {
    id: 'singh2025',
    sitasi:
      'Singh, A., dkk. (2025). Life-cycle assessment of direct cooking biogas pathways in India. Bioresource Technology, 133675.',
    doi: '10.1016/j.biortech.2025.133675',
  },
  {
    id: 'bilqis2023',
    sitasi:
      'Bilqis, dkk. (2023). Potensi produksi metana limbah organik dapur pesantren di Indonesia (292 mL CH₄/g VS).',
  },
  {
    id: 'tembo2024',
    sitasi:
      'Tembo, & Luwaya. (2024). Techno-economic feasibility of campus kitchen biogas digester in Zambia (balik modal 3,1 tahun, IRR 35,5%).',
  },
  {
    id: 'ndala2026',
    sitasi:
      'Ndala, dkk. (2026). Performance comparison of underground versus aboveground school-feeding biogas digesters in South Africa.',
  },
  {
    id: 'wietzel2026',
    sitasi:
      'Wietzel, & Schmidt. (2026). Methane fugitive emissions in small-scale biogas installations in Germany and Europe.',
  },
  {
    id: 'olczak2026',
    sitasi:
      'Olczak, dkk. (2026). Zero-net-cost methane abatement potential in European biogas plants.',
  },
  {
    id: 'obileke2022',
    sitasi:
      'Obileke, dkk. (2022). Cost analysis of small-scale anaerobic digesters (USD 3.194–9.550).',
  },
  {
    id: 'budiman2021',
    sitasi:
      'Budiman. (2021); Situmeang, dkk. (2022). Ketersediaan operator dan keberlanjutan teknis instalasi biogas komunitas di Indonesia.',
  },
  {
    id: 'regulasi-bgn',
    sitasi:
      'Republik Indonesia & Badan Gizi Nasional (BGN). Perpres 115/2025; Perbadan BGN 1/2026 (pengelolaan sisa pangan, sampah, air limbah & platform Stop Boros Pangan); Perbadan BGN 4/2026 (Sertifikat Laik Higiene Sanitasi); Perbadan BGN 13/2026 (insentif Rp2.000/porsi); Kepmen LH 2760/2026.',
  },
  {
    id: 'instansi-data',
    sitasi:
      'Dokumen Statistik & Kebijakan Primer: KESDM (HEESI 2024, terbit 2025); Kemenko Pangan (Agustus 2026); DJPb Kanwil Banten (2026); Kemensetneg (11 Maret 2026); Pertamina Patra Niaga (harga Bright Gas 12 kg Rp220.000); UNEP (Inger Andersen, 2024); WFP; IPCC (2006); Forster dkk. (2021, GWP CH₄ = 27).',
  },
];

export const LIMITATIONS = [
  'Data emisi per dapur baru berasal dari 1 SPPG (Dermawan & Fauzi, 2026) dan data timbulan sisa organik dari 3 SPPG di Bandung (Kanda dkk., 2026).',
  'Kurs Rp16.500/USD adalah asumsi konversi untuk menerjemahkan rentang biaya investasi.',
  'Rentang capex Rp52,7–157,6 juta berasal dari konversi USD 3.194–9.550 (Obileke dkk., 2022; Juárez-Hernández & Castro-González, 2015).',
];
