import { Plus } from "lucide-react";
import { NormalButton } from "../../../components/buttons";

type DocumentHeaderProps = {
  onAddDocument?: () => void;
};

export default function DocumentHeader({ onAddDocument }: DocumentHeaderProps) {
  return (
    <div className="mb-6 w-full flex items-center justify-between">
      <h1 className="text-2xl font-semibold">Daftar Dokumen</h1>
      <NormalButton onClick={onAddDocument}>
        <Plus size={16} />
        <span>Tambah</span>
      </NormalButton>
    </div>
  );
}
