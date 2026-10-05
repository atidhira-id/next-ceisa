"use client";

export type DocumentTab =
  | "header"
  | "entity"
  | "document"
  | "transport"
  | "package"
  | "transaction"
  | "goods"
  | "levy"
  | "statement";

type DocumentTabsProps = {
  activeTab: DocumentTab;
  onTabChange: (tab: DocumentTab) => void;
};

const tabs: {
  id: DocumentTab;
  label: string;
}[] = [
  {
    id: "header",
    label: "Header",
  },
  {
    id: "entity",
    label: "Entitas",
  },
  {
    id: "document",
    label: "Dokumen",
  },
  {
    id: "transport",
    label: "Pengangkut",
  },
  {
    id: "package",
    label: "Kemasan & Peti Kemas",
  },
  {
    id: "transaction",
    label: "Transaksi",
  },
  {
    id: "goods",
    label: "Barang",
  },
  {
    id: "levy",
    label: "Pungutan",
  },
  {
    id: "statement",
    label: "Pernyataan",
  },
];

export function DocumentTabs({ activeTab, onTabChange }: DocumentTabsProps) {
  return (
    <div className="border-b border-gray-200">
      <div className="flex gap-1 overflow-x-auto px-1">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onTabChange(tab.id)}
              className={`relative shrink-0 px-4 py-3 text-sm font-medium transition ${
                isActive ? "text-gray-900" : "text-gray-500 hover:text-gray-900"
              }`}
            >
              {tab.label}

              {isActive && (
                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gray-900" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
