import type {
  GoodsItemType,
  CostComponents,
  LevyType,
  TransactionType,
} from "../types/draft";
import type { OptionType } from "@/app/types/option";

export function formatDateIndonesian(date: string): string {
  return new Date(date).toLocaleString("id-ID", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export function getLabel(options: OptionType[], code: string) {
  const option = options.find((item) => item.value === code);

  return option?.label;
}

export function getIncrementalCost(transaction: TransactionType): number {
  const incrementalCostKeys: Array<keyof CostComponents> = [
    "commissionsAndBrokerage",
    "packaging",
    "packing",
    "assists",
    "royalties",
    "proceeds",
    "freight",
    "loading",
    "insurance",
    "warranty",
  ];
  const incrementalCost = incrementalCostKeys.reduce(
    (total, key) => total + Number(transaction.costComponents?.[key] || 0),
    0,
  );

  return incrementalCost;
}

export function getDeductionFees(transaction: TransactionType): number {
  const deductionFeesKeys: Array<keyof CostComponents> = [
    "ownInterestCosts",
    "postImportCosts",
    "internalTaxes",
    "interest",
    "dividends",
  ];
  const deductionFees = deductionFeesKeys.reduce(
    (total, key) => total + Number(transaction.costComponents?.[key] || 0),
    0,
  );

  return deductionFees;
}

export function getCif(
  item: GoodsItemType,
  transaction: TransactionType,
): number {
  return (
    (item.invoicePrice ?? 0) +
    (transaction.costComponents?.insurance ?? 0) +
    (transaction.costComponents?.freight ?? 0)
  );
}

export function getPricePerItem(item: GoodsItemType): number {
  const unitPrice = (item.invoicePrice ?? 0) / (item.quantity ?? 1);
  return Math.ceil(unitPrice * 100) / 100;
}

export function getTotalNetWeight(goods: GoodsItemType[]): number {
  return goods.reduce((total, item) => total + (item.netWeight ?? 0), 0);
}

export function getCustomsInRupiah(
  transaction: TransactionType,
  item?: GoodsItemType,
): number {
  if (item) {
    return (transaction.exchangeRate ?? 0) * getCif(item, transaction);
  }

  return (
    (transaction.exchangeRate ?? 0) *
    (transaction.costComponents?.invoicePrice ?? 0)
  );
}

export function formatToRupiah(value: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function getItemLevy(
  transaction: TransactionType,
  item: GoodsItemType,
): LevyType {
  const costInRupiah = getCustomsInRupiah(transaction, item);
  const importDuty =
    Math.ceil((costInRupiah * (item.importDutyPercentage ?? 0)) / 100 / 1000) *
    1000;

  const vat =
    Math.ceil(
      ((costInRupiah + importDuty) * (item.vatPercentage ?? 0)) / 100 / 100,
    ) * 100;

  const incomeTax =
    Math.ceil(
      ((costInRupiah + importDuty) * (item.incomeTaxPercentage ?? 0)) /
        100 /
        100,
    ) * 100;
  const total = importDuty + vat + incomeTax;

  return { bm: importDuty, ppn: vat, pph: incomeTax, total };
}

export function getLevy(
  transaction: TransactionType,
  goods: GoodsItemType[],
): LevyType {
  const levy: LevyType = { bm: 0, ppn: 0, pph: 0, total: 0 };

  goods.map((item) => {
    const itemLevy = getItemLevy(transaction, item);
    levy.bm += itemLevy.bm;
    levy.ppn += itemLevy.ppn;
    levy.pph += itemLevy.pph;
    levy.total += itemLevy.total;
  });
  return levy;
}
