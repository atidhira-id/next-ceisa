import type { OptionType } from "@/app/providers/types";

export const jenisKemasanOptions: OptionType[] = [
  { value: "PX", label: "PX - Pallet" },
  { value: "PK", label: "PK - Package" },
  { value: "RO", label: "RO - Roll" },
  { value: "PP", label: "PP - Piece" },
  { value: "BX", label: "BX - Box" },
  { value: "CT", label: "CT - Carton" },
  { value: "CS", label: "CS - Case" },
  { value: "CR", label: "CR - Crate" },
  { value: "BG", label: "BG - Bag" },
  { value: "BE", label: "BE - Bundle" },
  { value: "DR", label: "DR - Drum" },
  { value: "BA", label: "BA - Barrel" },
  { value: "CL", label: "CL - Coil" },
  { value: "RL", label: "RL - Reel" },
  { value: "CK", label: "CK - Cask" },
  { value: "CY", label: "CY - Cylinder" },
  { value: "PL", label: "PL - Pail" },
  { value: "PC", label: "PC - Parcel" },
  { value: "PA", label: "PA - Packet" },
  { value: "EN", label: "EN - Envelope" },
  { value: "SA", label: "SA - Sack" },
  { value: "PU", label: "PU - Tray pack" },
  { value: "NE", label: "NE - Unpacked or unpackaged" },
  { value: "NF", label: "NF - Unpacked or unpackaged, single unit" },
  { value: "NG", label: "NG - Unpacked or unpackaged, multiple units" },
  { value: "UN", label: "UN - Unit" },
  { value: "TN", label: "TN - Tin" },
  { value: "CA", label: "CA - Can, rectangular" },
  { value: "CX", label: "CX - Can, cylindrical" },
  { value: "CI", label: "CI - Canister" },
  { value: "4G", label: "4G - Box, fibreboard" },
  { value: "4H", label: "4H - Box, plastic" },
  { value: "8A", label: "8A - Pallet, wooden" },
  { value: "JB", label: "JB - Bag, jumbo" },
  { value: "FB", label: "FB - Flexibag" },
  { value: "FE", label: "FE - Flexitank" },
  { value: "SI", label: "SI - Skid" },
  { value: "SL", label: "SL - Slipsheet" },
];

export const ukuranKontainerOptions: OptionType[] = [
  { value: "20", label: "20 FEET" },
  { value: "40", label: "40 FEET" },
  { value: "45", label: "45 FEET" },
  { value: "60", label: "60 FEET" },
];

export const jenisMuatanOptions: OptionType[] = [
  { value: "4", label: "4 - EMPTY" },
  { value: "7", label: "7 - LCL - Less than Container Load" },
  { value: "8", label: "8 - FCL - Full Container Load" },
];

export const tipeKontainerOptions: OptionType[] = [
  { value: "1", label: "1 - GENERAL / DRY CARGO" },
  { value: "2", label: "2 - TUNNE TYPE" },
  { value: "3", label: "3 - OPEN TOP STEEL" },
  { value: "4", label: "4 - FLAT PACK" },
  { value: "5", label: "5 - Reefer / Refrigerated" },
  { value: "6", label: "6 - Barge Container" },
  { value: "7", label: "7 - Bulk Container" },
  { value: "8", label: "8 - ISO Tank" },
  { value: "99", label: "99 - Lainnya" },
];
