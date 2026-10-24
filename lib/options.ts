export type OptionType = {
  value: string;
  label: string;
};

// ================ CREATE DOCUMENT OPTIONS ==================
export const entitasOptions: OptionType[] = [
  { value: "IMPORTIR", label: "IMPORTIR" },
  { value: "EKSPORTIR", label: "EKSPORTIR" },
];

export const jenisDokumenOptions: OptionType[] = [
  { value: "20", label: "BC 2.0" },
  { value: "24", label: "BC 24" },
];

// ================ TABS OPTIONS ==================

export const pelabuhanOptions: OptionType[] = [
  { value: "IDTTP", label: "IDTTP - TANJUNG PRIOK" },
  { value: "IDBPN", label: "IDBPN - BALIKPAPAN" },
  { value: "ADALV", label: "ADALV - ANDORRA LA VELLA" },
  { value: "ADCAN", label: "ADCAN - CANILLO" },
];

export const kantorPabeanOptions: OptionType[] = [
  { value: "040300", label: "IDTPP - KPU Tanjung Priok" },
  { value: "100300", label: "IDBPN - KPPBC TMP B Balikpapan" },
  { value: "050100", label: "IDCGK - KPU Soekarno-Hatta" },
  { value: "051000", label: "IDCKR - KPPBC TMP C Cikarang" },
  { value: "05100", label: "IDJBK - KPPBC Cikarang" },
  { value: "120800", label: "IDAMA - KPPBC TMP C Timika" },
];

export const jenisPIBOptions: OptionType[] = [
  { value: "1", label: "1 - Biasa" },
  { value: "2", label: "2 - Berkala" },
];

export const jenisImportOptions: OptionType[] = [
  { value: "1", label: "1 - Biasa" },
  { value: "2", label: "2 - Sementara" },
  { value: "5", label: "5 - Rush Handling" },
  { value: "9", label: "9 - Gabungan 1 & 2" },
];

export const caraPembayaranOptions: OptionType[] = [
  { value: "1", label: "1 - Biasa / Tunai" },
  { value: "2", label: "2 - Berkala" },
  { value: "3", label: "3 - Dengan Jaminan" },
  { value: "4", label: "4 - Perhitungan Kemudian" },
  { value: "5", label: "5 - Konsinyasi (Consignment)" },
  { value: "6", label: "6 - Usance Letter of Credit" },
  { value: "7", label: "7 - Red Clause Letter of Credit" },
  { value: "8", label: "8 - Inter Company Account" },
  { value: "9", label: "9 - Gabungan / Lainnya" },
  {
    value: "10",
    label: "10 - Pembayaran Kemudian (Open Account) Secara Bertahap",
  },
  {
    value: "11",
    label: "11 - Pembayaran Kemudian (Open Account) Secara Tunai",
  },
  { value: "12", label: "12 - Dilakukan di DN dengan Pembayaran Uang Tunai" },
  {
    value: "13",
    label: "13 - Dilakukan di DN dengan Pembayaran melalui Telegraph",
  },
  { value: "14", label: "14 - Dilakukan Tanpa Pembayaran" },
  { value: "15", label: "15 - Pembayaran di Muka (Advance Payment)" },
  { value: "16", label: "16 - Sight Letter of Credit" },
  { value: "17", label: "17 - INKASO" },
];

export const jenisIdentitasOptions: OptionType[] = [
  { value: "6", label: "6 - NPWP 16 DIGIT" },
];

export const kodeJenisApiOptions: OptionType[] = [
  { value: "01", label: "1 - API-U" },
  { value: "02", label: "2 - API-P" },
];

export const kodeStatusOptions: OptionType[] = [
  { value: "MITA", label: "MITA" },
  { value: "AEO", label: "AEO" },
  { value: "LAINNYA", label: "LAINNYA" },
];

export const kodeAfiliasiOptions: OptionType[] = [
  { value: "AFL", label: "AFL - Affiliated Company" },
  { value: "CTR", label: "CTR - Financial/legally controller" },
  { value: "FAM", label: "FAM - Family Member" },
  { value: "TAH", label: "TAH - Tidak Berhubungan" },
];

export const kodeNegaraOptions: OptionType[] = [
  { value: "AD", label: "AD - ANDORRA" },
  { value: "AE", label: "AE - UNITED ARAB EMIRATES" },
  { value: "AF", label: "AF - AFGANISTAN" },
  { value: "HK", label: "HK - HONGKONG" },
];

// DOKUMEN
export const jenisDokumenLampiranOptions: OptionType[] = [
  { value: "217", label: "217 - Packing List" },
  { value: "343", label: "343 - Shipping Order" },
  { value: "380", label: "380 - Invoice" },
  { value: "383", label: "383 - SSTB" },
  { value: "410", label: "410 - Surat Sanggup Bayar (SSB)" },
  { value: "430", label: "430 - Bank Garansi" },
  { value: "440", label: "440 - Surat Tanda Bukti Setor (STBS)" },
  { value: "454", label: "454 - SSPCP" },
  { value: "465", label: "465 - Letter of Credit (LC)" },
  { value: "666", label: "666 - Pengecualian dengan Surat Keputusan" },
  { value: "704", label: "704 - Master Bill of Lading (MBL)" },
  { value: "705", label: "705 - Bill of Lading (BL)" },
  { value: "740", label: "740 - Air Waybill (AWB)" },
  { value: "741", label: "741 - Master Air Waybill (MAWB)" },
  { value: "800", label: "800 - Sertifikat Alat Perangkat Telekomunikasi" },
  { value: "803", label: "803 - SATS LN dari Kementerian Kehutanan" },
  {
    value: "805",
    label: "805 - Registrasi B3 dari Kementerian Lingkungan Hidup",
  },
  {
    value: "808",
    label: "808 - Izin Impor dari Kepolisian Republik Indonesia",
  },
  { value: "810", label: "810 - SM / SPM" },
  { value: "811", label: "811 - SIE" },
  { value: "813", label: "813 - Dokumen Cukai (CK)" },
  { value: "814", label: "814 - SK Izin Ekspor Berkala" },
  { value: "815", label: "815 - SK Izin Tata Niaga Ekspor" },
  { value: "816", label: "816 - Dokumen Ekspor (PEB)" },
  { value: "834", label: "834 - SNI Gula Kristal Mentah" },
  { value: "835", label: "835 - Izin / Pendaftaran Pestisida" },
  { value: "836", label: "836 - Izin Impor dari Kementerian Pertanian" },
  { value: "842", label: "842 - SNI dari Kementerian ESDM" },
  { value: "843", label: "843 - Nomor Pelumas Terdaftar (NPT)" },
  {
    value: "844",
    label: "844 - Izin Usaha Niaga / Izin Usaha Niaga Terbatas (ESDM)",
  },
  { value: "845", label: "845 - Rekomendasi Impor Pelumas" },
  { value: "851", label: "851 - Surat Izin Karantina Tanaman" },
  { value: "853", label: "853 - Surat Izin Karantina Hewan / Ikan" },
  { value: "854", label: "854 - Surat Persetujuan Muat dari BPOM" },
  { value: "856", label: "856 - Laporan Pemeriksaan Surveyor (LPS-E)" },
  { value: "857", label: "857 - Fumigation Certificate" },
  { value: "858", label: "858 - CITES Certificate" },
  { value: "860", label: "860 - Electronic Certificate of Origin (e-COO)" },
  {
    value: "861",
    label: "861 - Certificate of Origin (COO) / Surat Keterangan Asal (SKA)",
  },
  { value: "871", label: "871 - Nomor Pendaftaran Alat Kesehatan" },
  { value: "872", label: "872 - Laporan Surveyor dari Kementerian Kesehatan" },
  {
    value: "873",
    label: "873 - Importir Produsen (IP) Narkotika, Prekursor dan Psikotropika",
  },
  {
    value: "874",
    label:
      "874 - Importir Terdaftar (IT) Narkotika, Prekursor dan Psikotropika",
  },
  {
    value: "875",
    label:
      "875 - Surat Persetujuan Impor Narkotika, Prekursor dan Psikotropika",
  },
  { value: "888", label: "888 - Pengecualian Perizinan" },
  { value: "902", label: "902 - Izin BAPETEN" },
  { value: "911", label: "911 - Surat Keputusan" },
  { value: "912", label: "912 - Surat Keputusan Fasilitas BKPM" },
  { value: "913", label: "913 - Surat Keputusan Fasilitas Pertambangan" },
  { value: "917", label: "917 - BPBC" },
  { value: "918", label: "918 - Surat Keterangan Label Bahasa Indonesia" },
  { value: "942", label: "942 - Izin Impor Karantina Tumbuhan" },
  { value: "943", label: "943 - KH-5 / Izin Impor Karantina Hewan" },
  { value: "944", label: "944 - KH-7 / Izin Impor Karantina Hewan" },
  { value: "945", label: "945 - KH-12 / Izin Impor Karantina Hewan" },
  { value: "946", label: "946 - KID-3 / Izin Impor Karantina Ikan" },
  { value: "947", label: "947 - KID-15 / Izin Impor Karantina Ikan" },
  { value: "948", label: "948 - NPIK" },
  { value: "949", label: "949 - Pengakuan sebagai Importir Produsen" },
  { value: "956", label: "956 - Pengakuan sebagai Importir Terdaftar" },
  { value: "957", label: "957 - SNI / SPB dari Kementerian Perdagangan" },
  {
    value: "958",
    label: "958 - Laporan Surveyor (LS) dari Kementerian Perdagangan",
  },
  {
    value: "959",
    label: "959 - Surat Persetujuan Impor (SPI) dari Kementerian Perdagangan",
  },
  { value: "993", label: "993 - Surat Izin Menteri Pertanian" },
  { value: "994", label: "994 - Bukti Penerimaan Jaminan (BPJ)" },
  {
    value: "995",
    label:
      "995 - Surat Tanda Bukti Setor (STBS) / Surat Setoran Pajak Ekspor (SSP-E)",
  },
  { value: "996", label: "996 - Surat Sanggup Bayar (SSB)" },
  {
    value: "997",
    label: "997 - Customs Bond / Surat Tanda Terima Jaminan (STTJ)",
  },
  { value: "998", label: "998 - Surat Keputusan Fasilitas KITE" },
  { value: "999", label: "999 - Lainnya" },
];

// PENGANGKUT
export const nomorTutupPuOptions: OptionType[] = [
  { value: "0", label: "BC 1.0" },
  { value: "1", label: "BC 1.1" },
  { value: "2", label: "BC 1.2" },
  { value: "3", label: "BC 1.3" },
  { value: "4", label: "BC 1.4" },
];

export const caraPengangkutanOptions: OptionType[] = [
  { value: "1", label: "1 - LAUT" },
  { value: "2", label: "2 - KERETA API" },
  { value: "3", label: "3 - DARAT" },
  { value: "4", label: "4 - UDARA" },
  { value: "5", label: "5 - POS" },
  { value: "10", label: "10 - INSTALASI" },
  { value: "11", label: "11 - PIPA" },
  { value: "12", label: "12 - TRANSMISI" },
];

export const tempatPenimbunanOptions: OptionType[] = [
  { value: "213", label: "213- PAGI" },
  { value: "214X", label: "214X - LAP 214X SELATAN" },
];

// KEMASAN
export const jenisKemasanOptions: OptionType[] = [
  { value: "1A", label: "1A - DRUM STEEL" },
  { value: "1B", label: "1B - DRUM ALUMINIUM" },
  { value: "PK", label: "PK - PACKAGE" },
];

// KONTAINER
export const ukuranKontainerOptions: OptionType[] = [
  { value: "20", label: "20 FEET" },
  { value: "40", label: "40 FEET" },
  { value: "45", label: "45 FEET" },
  { value: "60", label: "60 FEET" },
];

export const jenisMuatanOptions: OptionType[] = [
  { value: "4", label: "4 - EMPTY" },
  { value: "7", label: "7 - LCL" },
  { value: "8", label: "8 - FCL" },
];

export const tipeKontainerOptions: OptionType[] = [
  { value: "1", label: "1 - GENERAL / DRY CARGO" },
  { value: "2", label: "2 - TUNNE TYPE" },
  { value: "3", label: "3 - OPEN TOP STEEL" },
  { value: "4", label: "4 - FLAT PACK" },
];

// TRANSAKSI

export const jenisValutaOptions: OptionType[] = [
  { value: "AUD", label: "AUD - AUSTRALIAN DOLLAR" },
  { value: "EUR", label: "EUR - EURO" },
];

export const jenisTransaksiOptions: OptionType[] = [
  { value: "IMB", label: "IMB - TRANSAKSI PERDAGANGAN" },
  { value: "ULC", label: "ULC - PEMBAYARAN DENGAN" },
];

export const kodeHargaOption: OptionType[] = [
  { value: "AUD", label: "AUD - AUSTRALIAN DOLLAR" },
  { value: "EUR", label: "EUR - EURO" },
];

export const kodeAsuransiOption: OptionType[] = [
  { value: "LN", label: "LN - Luar Negeri" },
  { value: "DN", label: "DN - Dalam Negeri" },
];

export const perhitunganProporsionalOption: OptionType[] = [
  { value: "Berat", label: "Berat" },
  { value: "Harga", label: "Harga" },
];

// BARANG
export const kodeHSOption: OptionType[] = [
  { value: "87046094", label: "87046094 - G.V.W MELEBIHI 45 T" },
];
