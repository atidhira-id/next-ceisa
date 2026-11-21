export type OptionType = {
  value: string;
  label: string;
};

export type MasterOptionType = {
  id: string;
  value: string;
  label: string;
  sortOrder: number;
  isActive: boolean;
};

export type OptionCategoryType = {
  id: string;
  code: string;
  name: string;
  description: string | null;
};

export type HsCode = {
  id: string;
  code: string;
  label: string;
  importDutyPercentage: string;
  vatPercentage: string;
  incomeTaxPercentage: string;
  borderRestriction: string | null;
  postBorderRestriction: string | null;
  createdAt: string;
  updatedAt: string;
};

export type GoodsType = {
  id: string;
  code: string;
  label: string;
  hsCodeId: string;
  hsCode: HsCode;
  createdAt: string;
  updatedAt: string;
};

export type ApiResponse<T> = {
  data: T;
};
