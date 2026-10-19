export function formatToIDR(value: number | string | undefined | null): string {
  if (value === undefined || value === null || value === "") return "";

  const str = String(value).replace(".", ",");
  const parts = str.split(",");

  let integerPart = parts[0].replace(/\D/g, "");
  integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  if (parts.length > 1) {
    const decimalPart = parts[1].replace(/\D/g, ""); // Hanya ambil angka desimal
    return `${integerPart},${decimalPart}`;
  }

  return integerPart;
}

export function parseToFloat(value: string): number {
  if (!value) return 0;

  const cleanStr = value.replace(/\./g, "").replace(",", ".");
  const num = parseFloat(cleanStr);
  return isNaN(num) ? 0 : num;
}
