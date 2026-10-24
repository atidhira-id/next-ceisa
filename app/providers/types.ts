export type FormInputs = {
  nomorAju: string;
  jenisEntitas: string;
  kodeDokumen: string;
  // Header
  header: HeaderData;

  // Entitas - Importir
  entitasImportir: EntitasImportirData;

  // Entitas - Pemilik Barang
  entitasPemilikBarang: EntitasPemilikBarangData;

  // Entitas - NPWP
  entitasNpwp: EntitasNpwpData;

  // Entitas - Pengirim
  entitasPengirim: EntitasPengirimData;

  // Entitas - Penjual
  entitasPenjual: EntitasPenjualData;

  // Dokumen
  listDokumen: DocumentItemData[];

  // Pengangkut
  pengangkut: PengangkutData;

  // Kemasan
  listKemasan: KemasanItemData[];

  // Kontainer
  listKontainer: KontainerItemData[];

  // Transaksi
  transaksi: TransaksiData;

  // Barang
  listBarang: BarangItemData[];

  // Pernyataan
  pernyataan: PernyataanData;
};

export type HeaderData = {
  kodePelabuhanTujuan?: string;
  kodeKantorPabean?: string;
  kodeJenisPib?: string;
  kodeJenisImport?: string;
  kodeCaraPembayaran?: string;
};

export type EntitasImportirData = {
  kodeNomorIdentitas?: string;
  nomorIdentitas?: string;
  nomorNitku?: string;
  nama?: string;
  alamat?: string;
  kodeApi?: string;
  api?: string;
  kodeStatus?: string;
};

export type EntitasPemilikBarangData = {
  kodeNomorIdentitas?: string;
  nomorIdentitas?: string;
  nomorNitku?: string;
  nama?: string;
  alamat?: string;
  afiliasi?: string;
};

export type EntitasNpwpData = {
  kodeNomorIdentitas?: string;
  nomorIdentitas?: string;
  nomorNitku?: string;
  nama?: string;
  alamat?: string;
};

export type EntitasPengirimData = {
  nama?: string;
  alamat?: string;
  negara?: string;
};

export type EntitasPenjualData = {
  nama?: string;
  alamat?: string;
  negara?: string;
};

export type PengangkutData = {
  kodeNomorTutupPu?: string;
  nomorTutupPu?: string;
  tanggalTutupPu?: string;
  nomorPos1?: string;
  nomorPos2?: string;
  nomorPos3?: string;
  kodeCaraPengangkutan?: string;
  namaSaranaPengangkutan?: string;
  nomorVoy?: string;
  kodeBendera?: string;
  perkiraanTanggalTiba?: string;
  kodePelabuhanMuat?: string;
  kodePelabuhanTransit?: string;
  kodeTempatPenimbunan?: string;
};

export type TransaksiData = {
  kodeJenisValuta?: string;
  ndpbm?: number;
  kodeJenisTransaksi?: string;
  kodeHargaBarang?: string;
  hargaBarang?: number;
  komponenBiaya?: KomponenBiaya;
  nilaiPabeanAsing?: number;
  nilaiPabeanRupiah?: number;

  beratKotor?: number;
  beratBersih?: number;
  perhitunganProporsional?: string;
};

export type DocumentItemData = {
  seri: number;
  kodeDokumen: string;
  nomorDokumen: string;
  tanggalDokumen: string;
  kodeFasilitas?: string;
  kodeIjin?: string;
};

export type KomponenBiaya = {
  kodeHargaInvoice: string;
  hargaInvoice: number;
  pembayaranTidakLangsung: number;
  diskon: number;

  komisiDanJasaPerantara: number;
  pengemasan: number;
  pengepakan: number;
  assist: number;
  royalti: number;
  proceeds: number;
  freight: number;
  pemuatan: number;
  kodeAsuransi: string;
  asuransi: number;
  garansi: number;

  biayaKepentinganSendiri: number;
  biayaSetelahImport: number;
  pajakInternal: number;
  bunga: number;
  deviden: number;
};

export type KemasanItemData = {
  seri: number;
  kodeKemasan: string;
  jumlahKemasan: number;
  merek: string;
  nomorSegel?: string;
};

export type KontainerItemData = {
  seri: number;
  nomorKontiner: string;
  kodeUkuranKontainer: string;
  kodeJenisKontainer: string;
  kodeTipeKontainer: string;
  nomorSegel?: string;
};

export type BarangItemData = {
  nomorAju?: string;
  seriBarang?: number;
  hs?: string;
  kodeBarang?: string;
  uraian?: string;
  merek?: string;
  tipe?: string;
  ukuran?: string;
  spesifikasiLain?: string;
  kodeSatuan?: string;
  jumlahSatuan?: number;
  kodeKemasan?: string;
  jumlahKemasan?: number;
  kodeDokumenAsal?: string;
  kodeKantorAsal?: string;
  nomorDaftarAsal?: string;
  tanggalDaftarAsal?: string;
  nomorAjuAsal?: string;
  seriBarangAsal?: number;
  netto?: number;
  bruto?: number;
  volume?: number;
  saldoAwal?: number;
  saldoAkhir?: number;
  jumlahRealisasi?: number;
  cif?: number;
  cifRupiah?: number;
  ndpbm?: number;
  fob?: number;
  asuransi?: number;
  freight?: number;
  nilaiTambah?: number;
  diskon?: number;
  hargaPenyerahan?: number;
  hargaPerolehan?: number;
  hargaSatuan?: number;
  hargaEkspor?: number;
  hargaPatokan?: number;
  nilaiBarang?: number;
  nilaiJasa?: number;
  nilaiDanaSawit?: number;
  nilaiDevisa?: number;
  persentaseImpor?: number;
  kodeAsalBarang?: string;
  kodeDaerahAsal?: string;
  kodeGunaBarang?: string;
  kodeJenisNilai?: string;
  jatuhTempoRoyalti?: string;
  kodeKategoriBarang?: string;
  kodeKondisiBarang?: string;
  kodeNegaraAsal?: string;
  kodePerhitungan?: string;
  pernyataanLartas?: string;
  flag4Tahun?: string;
  seriIzin?: string;
  tahunPembuatan?: string;
  kapasitasSilinder?: number;
  kodeBkc?: string;
  kodeKomoditiBkc?: string;
  kodeSubKomoditiBkc?: string;
  flagTis?: string;
  isiPerKemasan?: number;
  jumlahDilekatkan?: number;
  jumlahPitaCukai?: number;
  hjeCukai?: number;
  tarifCukai?: number;
  kodeJenisEkspor?: string;
  metodePenentuanNilai?: string;
  alasanMetodePenentuanNilai?: string;
  statementPerbedaanHarga?: string;
};

export type PernyataanData = {
  tempat?: string;
  tanggal?: string;
  nama?: string;
  jabatan?: string;
};
