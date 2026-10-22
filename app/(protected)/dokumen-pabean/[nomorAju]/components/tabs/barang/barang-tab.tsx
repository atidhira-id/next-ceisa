import { useDocument } from "@/app/providers/document-provider";
import { Warning } from "../../warning";

export default function BarangTab() {
  const { documentData } = useDocument();
  const data = documentData!;

  return (
    <div>
      <Warning text="Wajib mengisi data barang" />
      <Warning text={`CIF barang (0) tidak sama dengan CIF transaksi (xxx)`} />
    </div>
  );
}
