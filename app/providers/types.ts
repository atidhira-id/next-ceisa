export type OptionType = {
  value: string;
  label: string;
};

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
  nama?: string;
  alamat?: string;
  kodeApi?: string;
  api?: string;
  kodeStatus?: string;
};

export type EntitasPemilikBarangData = {
  kodeNomorIdentitas?: string;
  nomorIdentitas?: string;
  nama?: string;
  alamat?: string;
  afiliasi?: string;
};

export type EntitasNpwpData = {
  kodeNomorIdentitas?: string;
  nomorIdentitas?: string;
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
  seri?: number;
  hs?: HsType;
  spesifikasi?: Record<string, string | null>;
  kodeBarang?: string;
  uraianJenisBarang?: string;
  merek?: string;
  tipe?: string;
  ukuran?: string;
  spesifikasiLain?: string;
  kondisiBarang?: string;
  negara?: string;
  beratBersih?: number;

  jumlah?: number;
  kodeSatuan?: string;
  kemasan?: number;
  kodeJenisKemasan?: string;
  hargaInvoice?: number;
  metodePenentuanNilai?: string;
  alasan?: string;
  statementPerbedaan?: string;

  bmJenisTarif?: string;
  bmPembayaran?: string;
  ppnPembayaran?: string;
  pphPembayaran?: string;
  isCukai?: boolean;
};

export type PernyataanData = {
  tempat?: string;
  tanggal?: string;
  nama?: string;
  jabatan?: string;
};

export type HsType = {
  kode: string;
  bm: number;
  pph: number;
  ppn: number;
  lartasBorder?: string;
  lartasPostBorder?: string;
};
