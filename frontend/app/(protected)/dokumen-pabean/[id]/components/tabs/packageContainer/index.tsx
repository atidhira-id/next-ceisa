"use client";
import React from "react";

import FormPackage from "./formPackage";
import FormContainer from "./formContainer";

export default function PackageContainerTab() {
  return (
    <div>
      {/* Warning */}
      <div className="w-full bg-yellow-200 rounded-sm flex gap-2 items-center p-3 mb-4">
        <div className="w-5 h-5 rounded-full bg-yellow-500 flex justify-center items-center p-1">
          !
        </div>
        <div className="text-sm text-gray-800">Wajib Mengisi Data Kemasan</div>
      </div>

      <div className="space-y-6">
        {/* Form */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <FormPackage />

          <FormContainer />
        </div>
      </div>
    </div>
  );
}

export function TH({
  children,
  className = "",
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <th
      className={`whitespace-nowrap px-4 py-3 text-left font-semibold text-slate-600 ${className}`}
    >
      {children}
    </th>
  );
}

type TDProps = {
  children?: React.ReactNode;
  className?: string;
  colSpan?: number;
};

export function TD({ children, className = "", colSpan }: TDProps) {
  return (
    <td colSpan={colSpan} className={`px-4 py-3 text-slate-700 ${className}`}>
      {children}
    </td>
  );
}
