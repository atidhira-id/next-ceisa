export type Draft = {
  id: string;
  ajuNumber: string;
  entityType: string;
  documentType: string;

  header: HeaderType;

  entities: EntitiesType;

  documents: DocumentItemType[];

  packages: PackageItemType[];
  containers: ContainerItemType[];

  transport: TransportType;

  transactions: TransactionType;
  goods: GoodsItemType[];
  declarations: DeclarationsType;
};

export type HeaderType = {
  destinationPortCode?: string;
  customsOfficeCode?: string;
  pibType?: string;
  importTypeCode?: string;
  paymentMethodCode?: string;
};

export type ImporterType = {
  identityNumberCode?: string;
  identityNumber?: string;
  name?: string;
  address?: string;
  apiCode?: string;
  api?: string;
  statusCode?: string;
};

export type OwnerType = ImporterType & {
  affiliation: string;
};

export type SupplierType = {
  name?: string;
  address?: string;
  countryCode?: string;
};

export type EntitiesType = {
  importer: ImporterType;
  owner: OwnerType;
  npwp: ImporterType;
  sender: SupplierType;
  seller: SupplierType;
};

export type DocumentItemType = {
  series: number;
  documentCode: string;
  documentNumber: string;
  documentDate: string;
  facilityCode?: string;
  permissionCode?: string;
};

export type PackageItemType = {
  series: number;
  packageCode: string;
  quantity: number;
  brand: string;
  sealNumber?: string;
};

export type ContainerItemType = {
  series: number;
  containerNumber: string;
  containerSizeCode: string;
  containerTypeCode: string;
  containerCategoryCode: string;
  sealNumber?: string;
};

export type TransportType = {
  customsSealTypeCode?: string;
  customsSealNumber?: string;
  customsSealDate?: string;
  positionNumber1?: string;
  positionNumber2?: string;
  positionNumber3?: string;

  transportModeCode?: string;
  conveyanceName?: string;
  voyageNumber?: string;
  flagCode?: string;
  estimatedArrivalDate?: string;

  loadingPortCode?: string;
  transitPortCode?: string;
  storagePlaceCode?: string;
};

export type TransactionType = {
  currencyCode?: string;
  exchangeRate?: number;
  transactionTypeCode?: string;
  costComponents?: CostComponents;

  grossWeight?: number;
  proportionalCalculation?: string;
};

export type CostComponents = {
  invoicePriceCode: string;
  invoicePrice: number;
  indirectPayment: number;
  discount: number;

  commissionsAndBrokerage: number;
  packaging: number;
  packing: number;
  assists: number;
  royalties: number;
  proceeds: number;
  freight: number;
  loading: number;
  insuranceCode: string;
  insurance: number;
  warranty: number;

  ownInterestCosts: number;
  postImportCosts: number;
  internalTaxes: number;
  interest: number;
  dividends: number;
};

export type GoodsItemType = {
  series?: number;
  hsCode?: string;
  specifications?: Record<string, string | null>;
  itemCode?: string;
  description?: string;
  brand?: string;
  type?: string;
  size?: string;
  otherSpecifications?: string;
  condition?: string;
  countryOfOrigin?: string;
  netWeight?: number;

  quantity?: number;
  unitCode?: string;
  packageQuantity?: number;
  packageTypeCode?: string;
  invoicePrice?: number;
  valuationMethod?: string;
  reason?: string;
  differenceStatement?: string;

  documents?: GoodsDocumentType[];

  importDutyPercentage?: number;
  importDutyPayment?: string;
  vatPercentage?: number;
  vatPayment?: string;
  incomeTaxPercentage?: number;
  incomeTaxPayment?: string;
  isExcise?: boolean;
};

export type GoodsDocumentType = {
  documentNumber: string;
  documentSequence: number;
};

export type DeclarationsType = {
  place?: string;
  date?: string;
  name?: string;
  position?: string;
};

export type HsType = {
  kode: string;
  bm: number;
  pph: number;
  ppn: number;
  lartasBorder?: string;
  lartasPostBorder?: string;
};

export type PungutanType = {
  bm: number;
  ppn: number;
  pph: number;
  total: number;
};

export type PungutanKeys = keyof PungutanType;
