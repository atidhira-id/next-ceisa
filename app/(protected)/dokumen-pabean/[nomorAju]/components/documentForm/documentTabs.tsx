"use client";
import type { DocumentTab } from "@/app/types";
import { tabs } from "@/app/constants/tabs";

type DocumentTabsProps = {
  activeTab: DocumentTab;
  onTabChange: (tab: DocumentTab) => void;
};

export function DocumentTabs({ activeTab, onTabChange }: DocumentTabsProps) {
  return (
    <div className="border-b border-gray-200">
      <div className="flex gap-1 overflow-x-auto px-1">
        {tabs.map((tab) => {
          const isActive = activeTab === tab;

          return (
            <button
              key={tab}
              type="button"
              onClick={() => onTabChange(tab)}
              className={`relative shrink-0 px-4 py-3 text-sm font-medium transition hover:cursor-pointer ${
                isActive ? "text-gray-900" : "text-gray-500 hover:text-gray-900"
              }`}
            >
              {tab}

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
