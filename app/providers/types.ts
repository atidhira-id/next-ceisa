export type FormInputs = {
  nomorAju: string;
  jenisEntitas: string;
  kodeDokumen: string;
  // Header
  header: {
    kodePelabuhanTujuan?: string;
    kodeKantorPabean?: string;
    kodeJenisPib?: string;
    kodeJenisImport?: string;
    kodeCaraPembayaran?: string;
  };
  // Entitas - Importir
  entitasImportir: {
    kodeNomorIdentitas?: string;
    nomorIdentitas?: string;
    nomorNitku?: string;
    nama?: string;
    alamat?: string;
    kodeApi?: string;
    api?: string;
    kodeStatus?: string;
  };
  // Entitas - Pemilik Barang
  entitasPemilikBarang: {
    kodeNomorIdentitas?: string;
    nomorIdentitas?: string;
    nomorNitku?: string;
    nama?: string;
    alamat?: string;
    afiliasi?: string;
  };
  // Entitas - NPWP
  entitasNpwp: {
    kodeNomorIdentitas?: string;
    nomorIdentitas?: string;
    nomorNitku?: string;
    nama?: string;
    alamat?: string;
  };
  // Entitas - Pengirim
  entitasPengirim: {
    nama?: string;
    alamat?: string;
    negara?: string;
  };
  // Entitas - Penjual
  entitasPenjual: {
    nama?: string;
    alamat?: string;
    negara?: string;
  };

  // Dokumen
  listDokumen: DocumentItemData[];

  // Pengangkut
  pengangkut: {
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

  // Kemasan
  listKemasan: KemasanItemData[];

  // Kontainer
  listKontainer: KontainerItemData[];

  // Transaksi
  transaksi: {
    kodeJenisValuta?: string;
    ndpbm?: number;
    kodeJenisTransaksi?: string;
    kodeHargaBarang?: string;
    hargaBarang?: number;
    komponenBiaya?: KomponenBiaya;
    nilaiPabeanAsing?: number;
    nilaiPabeanRupiah?: number;

    beratKotor?: number;
    perhitunganProporsional?: string;
  };

  // Barang
  barang: BarangItemData[];
};

export type HeaderData = {
  kodeKantor?: string;
  kodeKantorBongkar?: string;
  kodeKantorPeriksa?: string;
  kodeKantorTujuan?: string;
  kodeKantorEkspor?: string;
  kodeJenisImpor?: string;
  kodeJenisEkspor?: string;
  kodeJenisTpb?: string;
  kodeJenisPlb?: string;
  kodeJenisProsedur?: string;
  kodeTujuanPemasukan?: string;
  kodeTujuanPengiriman?: string;
  kodeTujuanTpb?: string;
  kodeCaraDagang?: string;
  kodeCaraBayar?: string;
  kodeCaraBayarLainnya?: string;
  kodeGudangAsal?: string;
  kodeGudangTujuan?: string;
  kodeJenisKirim?: string;
  kodeJenisPengiriman?: string;
  kodeKategoriEkspor?: string;
  kodeKategoriMasukFtz?: string;
  kodeKategoriKeluarFtz?: string;
  kodeKategoriBarangFtz?: string;
  kodeLokasi?: string;
  kodeLokasiBayar?: string;
  lokasiAsal?: string;
  lokasiTujuan?: string;
  kodeDaerahAsal?: string;
  kodeGudangAsal2?: string;
  kodeGudangTujuan2?: string;
  kodeNegaraTujuan?: string;
  kodeTutupPu?: string;
  nomorBc11?: string;
  tanggalBc11?: string;
  nomorPos?: string;
  nomorSubPos1?: string;
  nomorSubPos2?: string;
  kodePelabuhanBongkar?: string;
  kodePelabuhanMuat?: string;
  kodePelabuhanMuatAkhir?: string;
  kodePelabuhanTransit?: string;
  kodePelabuhanTujuan?: string;
  kodePelabuhanEkspor?: string;
  kodeTps?: string;
  tanggalBerangkat?: string;
  tanggalEkspor?: string;
  tanggalMasuk?: string;
  tanggalMuat?: string;
  tanggalTiba?: string;
  tanggalPeriksa?: string;
  tempatStuffing?: string;
  tanggalStuffing?: string;
  kodeTandaPengaman?: string;
  jumlahTandaPengaman?: number;
  flagCurah?: string;
  flagSda?: string;
  flagVd?: string;
  flagApBk?: string;
  flagMigas?: string;
  kodeAsuransi?: string;
  asuransi?: number;
  nilaiBarang?: number;
  nilaiIncoterm?: number;
  nilaiMaklon?: number;
  asuransi2?: number;
  freight?: number;
  fob?: number;
  biayaTambahan?: number;
  biayaPengurang?: number;
  vd?: number;
  cif?: number;
  hargaPenyerahan?: number;
  ndpbm?: number;
  totalDanaSawit?: number;
  dasarPengenaanPajak?: number;
  nilaiJasa?: number;
  uangMuka?: number;
  bruto?: number;
  netto?: number;
  volume?: number;
  kotaPernyataan?: string;
  tanggalPernyataan?: string;
  namaPernyataan?: string;
  jabatanPernyataan?: string;
  kodeValuta?: string;
  kodeIncoterm?: string;
  kodeJasaKenaPajak?: string;
  nomorBuktiBayar?: string;
  tanggalBuktiBayar?: string;
  kodeJenisNilai?: string;
  kodeKantorMuat?: string;
  nomorDaftar?: string;
  tanggalDaftar?: string;
  kodeAsalBarangFtz?: string;
  kodeTujuanPengeluaran?: string;
  ppnPajak?: number;
  ppnbmPajak?: number;
  tarifPpnPajak?: number;
  tarifPpnbmPajak?: number;
  barangTidakBerwujud?: string;
  kodeJenisPengeluaran?: string;
  barangKiriman?: string;
  flagKonsol?: string;
  kodeJenisPengangkutan?: string;
  flagProporsionalNetto?: string;
};

export type EntityData = {
  nomorAju: string;
  seri: string;
  kodeEntitas: string;
  kodeJenisIdentitas?: string;
  nomorIdentitas?: string;
  namaEntitas?: string;
  alamatEntitas?: string;
  nibEntitas?: string;
  kodeJenisApi?: string;
  kodeStatus?: string;
  nomorIjinEntitas?: string;
  tanggalIjinEntitas?: string;
  kodeNegara?: string;
  niperEntitas?: string;
  kodeKategoriKonsolidator?: string;
  kodeAfiliasi?: string;
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
  asuransi: number;
  garansi: number;

  biayaKepentinganSendiri: number;
  biayaSetelahImport: number;
  pajakInternal: number;
  bunga: number;
  deviden: number;
};

export type PengangkutData = {
  seri?: number;
  kodeCaraAngkut?: string;
  namaPengangkut?: string;
  nomorPengangkut?: string;
  kodeBendera?: string;
  callSign?: string;
  flagAngkutPlb?: string;
  caraPengangkutanLainnya?: string;
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

export type KomponenBiayaItemData = {
  nomorAju?: string;
  jenisNilai?: string;
  hargaInvoice?: number;
  pembayaranTidakLangsung?: number;
  diskon?: number;
  komisiPenjualan?: number;
  biayaPengemasan?: number;
  biayaPengepakan?: number;
  assist?: number;
  royalti?: number;
  proceeds?: number;
  biayaTransportasi?: number;
  biayaPemuatan?: number;
  asuransi?: number;
  garansi?: number;
  biayaKepentinganSendiri?: number;
  biayaPascaImpor?: number;
  biayaPajakInternal?: number;
  bunga?: number;
  deviden?: number;
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

export type BarangTarifItemData = {
  nomorAju?: string;
  seriBarang?: number;
  kodePungutan?: string;
  kodeTarif?: string;
  tarif?: number;
  kodeFasilitas?: string;
  tarifFasilitas?: number;
  nilaiBayar?: number;
  nilaiFasilitas?: number;
  nilaiSudahDilunasi?: number;
  kodeSatuan?: string;
  jumlahSatuan?: number;
  flagBmtSementara?: string;
  kodeKomoditiCukai?: string;
  kodeSubKomoditiCukai?: string;
  flagTis?: string;
  flagPelekatan?: string;
  kodeKemasan?: string;
  jumlahKemasan?: number;
};

export type BarangDokumenItemData = {
  nomorAju?: string;
  seriBarang?: number;
  seriDokumen?: number;
  seriIzin?: string;
};

export type BarangEntitasItemData = {
  nomorAju?: string;
  seriBarang?: number;
  seriEntitas?: number;
};

export type BarangSpekKhususItemData = {
  nomorAju?: string;
  seriBarang?: number;
  kode?: string;
  uraian?: string;
};

export type BarangVdItemData = {
  nomorAju?: string;
  seriBarang?: number;
  kodeVd?: string;
  nilaiBarang?: number;
  biayaTambahan?: number;
  biayaPengurang?: number;
  jatuhTempo?: string;
};

export type BahanBakuItemData = {
  nomorAju?: string;
  seriBarang?: number;
  seriBahanBaku?: number;
  kodeAsalBahanBaku?: string;
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
  cif?: number;
  cifRupiah?: number;
  ndpbm?: number;
  hargaPenyerahan?: number;
  hargaPerolehan?: number;
  nilaiJasa?: number;
  seriIzin?: string;
  valuta?: string;
  kodeBkc?: string;
  kodeKomoditiBkc?: string;
  kodeSubKomoditiBkc?: string;
  flagTis?: string;
  isiPerKemasan?: number;
  jumlahDilekatkan?: number;
  jumlahPitaCukai?: number;
  hjeCukai?: number;
  tarifCukai?: number;
};

export type BahanBakuTarifItemData = {
  nomorAju?: string;
  seriBarang?: number;
  seriBahanBaku?: number;
  kodeAsalBahanBaku?: string;
  kodePungutan?: string;
  kodeTarif?: string;
  tarif?: number;
  kodeFasilitas?: string;
  tarifFasilitas?: number;
  nilaiBayar?: number;
  nilaiFasilitas?: number;
  nilaiSudahDilunasi?: number;
  kodeSatuan?: string;
  jumlahSatuan?: number;
  flagBmtSementara?: string;
  kodeKomoditiCukai?: string;
  kodeSubKomoditiCukai?: string;
  flagTis?: string;
  flagPelekatan?: string;
  kodeKemasan?: string;
  // Kolom berulang sesuai input Anda:
  kodeSubKomoditiCukai2?: string;
  flagTis2?: string;
  flagPelekatan2?: string;
  kodeKemasan2?: string;
  jumlahKemasan?: number;
};

export type BahanBakuDokumenItemData = {
  nomorAju?: string;
  seriBarang?: number;
  seriBahanBaku?: number;
  kodeAsalBahanBaku?: string;
  seriDokumen?: number;
  seriIzin?: string;
};

export type PungutanItemData = {
  nomorAju?: string;
  kodeFasilitasTarif?: string;
  kodeJenisPungutan?: string;
  nilaiPungutan?: number;
  npwpBilling?: string;
};

export type JaminanItemData = {
  nomorAju?: string;
  kodeKantor?: string;
  kodeJaminan?: string;
  nomorJaminan?: string;
  tanggalJaminan?: string;
  nilaiJaminan?: number;
  penjamin?: string;
  tanggalJatuhTempo?: string;
  nomorBpj?: string;
  tanggalBpj?: string;
};

export type BankDevisaItemData = {
  nomorAju?: string;
  seri?: number;
  kode?: string;
  nama?: string;
};

export type VersiData = {
  version: string;
};

export type ResponItemData = {
  nomorAju?: string;
  kodeRespon?: string;
  nomorRespon?: string;
  tanggalRespon?: string;
};
