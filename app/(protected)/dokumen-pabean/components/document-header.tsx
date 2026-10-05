type DocumentHeaderProps = {
  onAddDocument?: () => void;
};

export default function DocumentHeader({ onAddDocument }: DocumentHeaderProps) {
  return (
    <div className="mb-6 w-full flex items-center justify-between">
      <h1 className="text-2xl font-semibold">Daftar Dokumen</h1>
      <button
        type="button"
        onClick={onAddDocument}
        className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
      >
        + Tambah Dokumen
      </button>
    </div>
  );
}
