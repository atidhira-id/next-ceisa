"use client";

import type { GoodsItemType } from "@/app/types/draft";
import InputWrapper from "@/app/components/inputs/input-wrapper";
import InputNormal from "@/app/components/inputs/input-normal";
import InputNumber from "@/app/components/inputs/input-number";
import InputSelect from "@/app/components/inputs/input-select";
import { useOptions } from "@/app/hooks/useOptions";
import { required } from "@/app/lib/validation";

type Props = {
  item: GoodsItemType;
  updateData: (
    field: keyof GoodsItemType,
    value: number | string | boolean,
  ) => void;
};

export default function FormLevy({ item, updateData }: Props) {
  const goodsPayments = useOptions("GOODS_PAYMENT");

  return (
    <InputWrapper title="Pungutan">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-stretch">
        <InputWrapper title="BM">
          <div className="flex gap-1">
            <InputNormal value="BM" onChange={() => {}} disabled />
            <InputNormal value="Advalorum" onChange={() => {}} disabled />

            <InputNumberWithPercentage
              value={item.importDutyPercentage ?? 0}
              onChange={(value) => updateData("importDutyPercentage", value)}
            />

            <InputSelect
              value={item.importDutyPayment ?? ""}
              options={goodsPayments.options}
              onChange={(value) => updateData("importDutyPayment", value)}
              rules={[required()]}
            />

            <InputNumberWithPercentage value={100} disabled />
          </div>
        </InputWrapper>

        <InputWrapper title="PDRI">
          <div className="flex items-center gap-1">
            <p className="w-3/4 text-sm font-bold">PPN (DPP 11/12)</p>

            <InputNumberWithPercentage
              value={item.vatPercentage ?? 0}
              onChange={(value) => updateData("vatPercentage", value)}
            />

            <InputSelect
              value={item.vatPayment ?? ""}
              options={goodsPayments.options}
              onChange={(value) => updateData("vatPayment", value)}
              rules={[required()]}
            />

            <InputNumberWithPercentage value={100} disabled />
          </div>

          <div className="flex items-center gap-1">
            <p className="w-3/4 text-sm">PPH</p>

            <InputNumberWithPercentage
              value={item.incomeTaxPercentage ?? 0}
              onChange={(value) => updateData("incomeTaxPercentage", value)}
            />

            <InputSelect
              value={item.incomeTaxPayment ?? ""}
              options={goodsPayments.options}
              onChange={(value) => updateData("incomeTaxPayment", value)}
              rules={[required()]}
            />

            <InputNumberWithPercentage value={100} disabled />
          </div>
        </InputWrapper>

        <InputWrapper title="BMT">
          <div></div>
        </InputWrapper>

        <div className="w-full flex items-center border border-slate-200 bg-slate-100 px-4">
          <label className="text-md text-gray-700 font-bold">
            <input
              className="mr-1"
              type="checkbox"
              checked={item.isExcise ?? false}
              onChange={(event) => updateData("isExcise", event.target.checked)}
            />
            CUKAI
          </label>
        </div>
      </div>
    </InputWrapper>
  );
}

function InputNumberWithPercentage({
  value,
  onChange,
  disabled,
}: {
  value: number;
  onChange?: (value: number) => void;
  disabled?: boolean;
}) {
  return (
    <div className="flex relative min-w-18">
      <InputNumber value={value} onChange={onChange} disabled={disabled} />
      <span className="absolute -top-1 right-2 translate-y-1/2 text-gray-600">
        %
      </span>
    </div>
  );
}
