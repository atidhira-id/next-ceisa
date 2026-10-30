import type { OptionType } from "@/app/providers/types";

export const jenisValutaOptions: OptionType[] = [
  { value: "CNY", label: "CNY - Chinese Yuan Renminbi" },
  { value: "USD", label: "USD - US Dollar" },
  { value: "SGD", label: "SGD - Singapore Dollar" },
  { value: "IDR", label: "IDR - Indonesian Rupiah" },
  { value: "EUR", label: "EUR - Euro" },
  { value: "JPY", label: "JPY - Japanese Yen" },
  { value: "KRW", label: "KRW - South Korean Won" },
  { value: "MYR", label: "MYR - Malaysian Ringgit" },
  { value: "THB", label: "THB - Thai Baht" },
  { value: "VND", label: "VND - Vietnamese Dong" },
  { value: "INR", label: "INR - Indian Rupee" },
  { value: "AUD", label: "AUD - Australian Dollar" },
  { value: "GBP", label: "GBP - Pound Sterling" },
  { value: "HKD", label: "HKD - Hong Kong Dollar" },
  { value: "TWD", label: "TWD - New Taiwan Dollar" },
  { value: "CHF", label: "CHF - Swiss Franc" },
  { value: "CAD", label: "CAD - Canadian Dollar" },
  { value: "NZD", label: "NZD - New Zealand Dollar" },
  { value: "AED", label: "AED - UAE Dirham" },
  { value: "SAR", label: "SAR - Saudi Riyal" },
  { value: "PHP", label: "PHP - Philippine Peso" },
  { value: "SEK", label: "SEK - Swedish Krona" },
  { value: "NOK", label: "NOK - Norwegian Krone" },
  { value: "DKK", label: "DKK - Danish Krone" },
  { value: "BND", label: "BND - Brunei Dollar" },
  { value: "BRL", label: "BRL - Brazilian Real" },
  { value: "ZAR", label: "ZAR - South African Rand" },
  { value: "TRY", label: "TRY - Turkish Lira" },
  { value: "RUB", label: "RUB - Russian Ruble" },
  { value: "PKR", label: "PKR - Pakistan Rupee" },
  { value: "BDT", label: "BDT - Taka" },
  { value: "LKR", label: "LKR - Sri Lanka Rupee" },
  { value: "KWD", label: "KWD - Kuwaiti Dinar" },
  { value: "QAR", label: "QAR - Qatari Rial" },
  { value: "MOP", label: "MOP - Pataca" },
  { value: "MMK", label: "MMK - Myanmar Kyat" },
  { value: "LAK", label: "LAK - Lao Kip" },
  { value: "KHR", label: "KHR - Riel" },
  { value: "PEN", label: "PEN - Sol" },
  { value: "MXN", label: "MXN - Mexican Peso" },
  { value: "PLN", label: "PLN - Zloty" },
  { value: "CZK", label: "CZK - Czech Koruna" },
  { value: "ILS", label: "ILS - New Israeli Sheqel" },
  { value: "EGP", label: "EGP - Egyptian Pound" },
  { value: "OMR", label: "OMR - Rial Omani" },
  { value: "TND", label: "TND - Tunisian Dinar" },
  { value: "KES", label: "KES - Kenyan Shilling" },
  { value: "ARS", label: "ARS - Argentine Peso" },
];

export const jenisTransaksiOptions: OptionType[] = [
  {
    value: "PMK",
    label: "PMK - Pembayaran Dilakukan di Muka (Advance Payment)",
  },
  { value: "KMD", label: "KMD - Pembayaran Kemudian (Open Account)" },
  { value: "SLC", label: "SLC - Pembayaran dengan Sight Letter of Credit" },
  { value: "ULC", label: "ULC - Pembayaran dengan Usance Letter of Credit" },
  {
    value: "RLC",
    label: "RLC - Pembayaran dengan Red Clause Letter of Credit",
  },
  { value: "WSI", label: "WSI - Pembayaran dengan Wesel Inkaso" },
  { value: "KON", label: "KON - Pembayaran dengan Konsinyasi" },
  { value: "IOA", label: "IOA - Pembayaran dengan Interoffice Account" },
  { value: "IMB", label: "IMB - Transaksi Perdagangan dengan Imbal Dagang" },
  {
    value: "LAI",
    label: "LAI - Transaksi Perdagangan atau Cara Pembayaran Lainnya",
  },
];

export const kodeIncoterm: OptionType[] = [
  { value: "EXW", label: "EXW - Ex Works" },
  { value: "FCA", label: "FCA - Free Carrier" },
  { value: "FAS", label: "FAS - Free Alongside Ship" },
  { value: "FOB", label: "FOB - Free On Board" },
  { value: "CFR", label: "CFR - Cost and Freight" },
  { value: "CIF", label: "CIF - Cost, Insurance and Freight" },
  { value: "CPT", label: "CPT - Carriage Paid To" },
  { value: "CIP", label: "CIP - Carriage and Insurance Paid To" },
  { value: "DAP", label: "DAP - Delivered at Place" },
  { value: "DPU", label: "DPU - Delivered at Place Unloaded" },
  { value: "DDP", label: "DDP - Delivered Duty Paid" },
];

export const kodeAsuransiOption: OptionType[] = [
  { value: "DN", label: "DN - Dalam Negeri" },
  { value: "LN", label: "LN - Luar Negeri" },
];

export const perhitunganProporsionalOption: OptionType[] = [
  { value: "Berat", label: "Berat" },
  { value: "Harga", label: "Harga" },
];
