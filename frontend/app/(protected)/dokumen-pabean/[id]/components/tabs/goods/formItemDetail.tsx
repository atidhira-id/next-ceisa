"use client";

import type { GoodsItemType } from "@/app/types/draft";
import { useOptions } from "@/app/hooks/useOptions";
import { useGoodsTypes } from "@/app/hooks/useGoodsType";
import { useHsCodes } from "@/app/hooks/useHsCode";
import { required } from "@/app/lib/validation";
import {
  getIncrementalCost,
  getDeductionFees,
  getCif,
  getPricePerItem,
  getCustomsInRupiah,
} from "@/app/lib/utils";

import Form_87046094 from "./form87046094";
import InputNormal from "@/app/components/inputs/input-normal";
import InputSelect from "@/app/components/inputs/input-select";
import InputTextArea from "@/app/components/inputs/input-textarea";
import InputNumber from "@/app/components/inputs/input-number";
import InputRadio from "@/app/components/inputs/input-radio";
import { useDraft } from "@/app/providers/draftProvider";

type Props = {
  item: GoodsItemType;
  updateData: (
    field: keyof GoodsItemType,
    value: number | string | boolean,
  ) => void;
  updateSpecs: (field: string, value: string) => void;
};

export default function FormItemDetail({
  item,
  updateData,
  updateSpecs,
}: Props) {
  const { draft } = useDraft();
  const transactions = draft!.transactions;
  const countries = useOptions("COUNTRY");
  const packageTypes = useOptions("PACKAGE_TYPE");
  const goodsCondition = useOptions("GOODS_CONDITION");
  const unitCodes = useOptions("UNIT_CODE");
  const valuationMethods = useOptions("VALUATION_METHOD");
  const reasons = useOptions("REASON");
  const differenceStatements = useOptions("DIFFERENCE_STATEMENT");

  const { hsCodes, hsCodeOptions } = useHsCodes();
  const { goodsTypes, goodsTypeOptions } = useGoodsTypes();

  function handleTypeChange(value: string) {
    const selectedGoodsType = goodsTypes.find(
      (goodsType) => goodsType.code === value,
    );

    if (!selectedGoodsType) {
      updateData("type", value);
      return;
    }

    const selectedHs = selectedGoodsType.hsCode;

    updateData("type", value);
    updateData("hsCode", selectedHs.code);
    updateData("importDutyPercentage", Number(selectedHs.importDutyPercentage));
    updateData("incomeTaxPercentage", Number(selectedHs.incomeTaxPercentage));
    updateData("vatPercentage", Number(selectedHs.vatPercentage));
  }

  function checkRestricted() {
    const hs = hsCodes.find((hs) => hs.code === item.hsCode);

    if (hs?.borderRestriction && hs?.postBorderRestriction) {
      return "Lartas Border & Post Border";
    }

    if (hs?.borderRestriction) return "Lartas Border";
    if (hs?.postBorderRestriction) return "Lartas Post Border";

    return "Bukan Lartas";
  }

  return (
    <div className="grid md:grid-cols-2 gap-10">
      <div className="flex flex-col gap-3">
        <InputNormal
          labelPosition="left"
          title="Seri"
          value={item.series?.toString() ?? "0"}
          disabled
        />

        <InputSelect
          labelPosition="left"
          label="Pos Tarif/HS"
          options={hsCodeOptions}
          value={item.hsCode ?? ""}
          onChange={(value) => {
            console.log(value);
            const hs = hsCodes.find((hs) => hs.code === value);
            console.log(hs);

            if (hs) {
              updateData("hsCode", value);
              updateData(
                "importDutyPercentage",
                Number(hs.importDutyPercentage),
              );
              updateData("incomeTaxPercentage", Number(hs.incomeTaxPercentage));
              updateData("vatPercentage", Number(hs.vatPercentage));
            }
          }}
          rules={[required()]}
        />

        {item.hsCode === "87046094" && (
          <Form_87046094 item={item} updateSpecs={updateSpecs} />
        )}

        <div className="w-full flex items-center gap-4 my-4">
          <p className="block text-sm font-medium text-gray-700 w-1/3 shrink-0">
            Lartas
          </p>
          <p className="bg-green-200 text-gray-900 w-full p-2 border border-gray-300 rounded-md">
            {checkRestricted()}
          </p>
        </div>

        <InputNormal
          labelPosition="left"
          title="Kode Barang"
          value={item.itemCode ?? ""}
          onChange={(value) => updateData("itemCode", value)}
          rules={[required()]}
        />

        <InputTextArea
          labelPosition="left"
          title="Uraian Jenis Barang"
          value={item.description ?? ""}
          onChange={(value) => updateData("description", value)}
          rules={[required()]}
        />

        <div className="w-full flex items-center gap-4 mb-4">
          <p className="text-sm font-medium text-gray-700 w-1/3 shrink-0">
            Merek
          </p>
          <div className="w-full">
            <label className="text-md text-gray-700 mb-2">
              <input
                className="mr-1"
                type="checkbox"
                checked={item.brand === "TANPA MEREK"}
                onChange={(event) =>
                  updateData("brand", event.target.checked ? "TANPA MEREK" : "")
                }
              />
              Tanpa Merek
            </label>

            <InputNormal
              value={item.brand ?? ""}
              onChange={(value) => updateData("brand", value)}
              rules={[required()]}
              disabled={item.brand === "TANPA MEREK"}
            />
          </div>
        </div>

        <div className="w-full flex items-center gap-4 mb-4">
          <p className="text-sm font-medium text-gray-700 w-1/3 shrink-0">
            Tipe
          </p>
          <div className="w-full">
            <label className="text-md text-gray-700 mb-2">
              <input
                className="mr-1"
                type="checkbox"
                checked={item.type === "TANPA TIPE"}
                onChange={(event) =>
                  updateData("type", event.target.checked ? "TANPA TIPE" : "")
                }
              />
              Tanpa Tipe
            </label>

            <InputSelect
              value={item.type ?? ""}
              options={goodsTypeOptions}
              onChange={handleTypeChange}
              rules={[required()]}
              disabled={item.type === "TANPA TIPE"}
            />
          </div>
        </div>

        <InputNormal
          labelPosition="left"
          title="Ukuran"
          value={item.size ?? ""}
          onChange={(value) => updateData("size", value)}
          rules={[required()]}
        />

        <InputNormal
          labelPosition="left"
          title="Spesifikasi Lain"
          value={item.otherSpecifications ?? ""}
          onChange={(value) => updateData("otherSpecifications", value)}
          rules={[required()]}
        />

        <InputSelect
          labelPosition="left"
          label="Kondisi Barang"
          value={item.condition ?? ""}
          options={goodsCondition.options}
          onChange={(value) => updateData("condition", value)}
          rules={[required()]}
        />

        <InputSelect
          labelPosition="left"
          label="Negara"
          value={item.countryOfOrigin ?? ""}
          options={countries.options}
          onChange={(value) => updateData("countryOfOrigin", value)}
          rules={[required()]}
        />

        <InputNumber
          labelPosition="left"
          numberFormat="US"
          title="Berat Bersih (kg)"
          value={item.netWeight ?? 0}
          onChange={(value) => updateData("netWeight", value)}
          rules={[required()]}
        />
      </div>

      <div className="flex flex-col gap-3">
        <div className="w-full flex items-center gap-4 mb-4">
          <p className="text-sm font-medium text-gray-700 w-1/3 shrink-0">
            Jumlah dan Satuan Barang
          </p>
          <div className="w-full flex gap-2">
            <InputNumber
              value={item.quantity ?? 0}
              onChange={(value) => updateData("quantity", value)}
              rules={[required()]}
            />
            <InputSelect
              value={item.unitCode ?? ""}
              options={unitCodes.options}
              onChange={(value) => updateData("unitCode", value)}
              rules={[required()]}
            />
          </div>
        </div>

        <div className="w-full flex items-center gap-4 mb-4">
          <p className="text-sm font-medium text-gray-700 w-1/3 shrink-0">
            Kemasan
          </p>
          <div className="w-full flex gap-2">
            <InputNumber
              value={item.packageQuantity ?? 0}
              onChange={(value) => updateData("packageQuantity", value)}
              rules={[required()]}
            />
            <InputSelect
              value={item.packageTypeCode ?? ""}
              options={packageTypes.options}
              onChange={(value) => updateData("packageTypeCode", value)}
              rules={[required()]}
            />
          </div>
        </div>

        <InputNumber
          labelPosition="left"
          numberFormat="US"
          title="Harga Invoice"
          value={item.invoicePrice ?? 0}
          onChange={(value) => updateData("invoicePrice", value)}
          rules={[required()]}
        />

        <InputNumber
          labelPosition="left"
          title="Biaya Penambah"
          value={getIncrementalCost(transactions) ?? 0}
          disabled
        />

        <InputNumber
          labelPosition="left"
          title="Biaya Pengurang"
          value={getDeductionFees(transactions) ?? 0}
          disabled
        />

        <InputNumber
          labelPosition="left"
          title="Freight"
          value={transactions.costComponents?.freight ?? 0}
          disabled
        />

        <InputNumber
          labelPosition="left"
          title="Asuransi"
          value={transactions.costComponents?.insurance ?? 0}
          disabled
        />

        <InputNumber labelPosition="left" title="Nilai VD" value={0} disabled />

        <InputNumber
          labelPosition="left"
          title="Nilai CIF"
          value={getCif(item, transactions)}
          disabled
        />

        <InputNumber
          labelPosition="left"
          numberFormat="US"
          title="Harga Per Satuan"
          value={getPricePerItem(item)}
          disabled
        />

        <InputNumber
          labelPosition="left"
          title="Nilai Pabean Rupiah"
          value={getCustomsInRupiah(transactions, item)}
          disabled
        />

        <InputSelect
          labelPosition="left"
          label="Metode Penentuan Nilai"
          value={item.valuationMethod ?? ""}
          options={valuationMethods.options}
          onChange={(value) => updateData("valuationMethod", value)}
          rules={[required()]}
        />

        {item.valuationMethod &&
          item.valuationMethod !== valuationMethods.options[0]?.value && (
            <InputSelect
              labelPosition="left"
              label="Alasan"
              value={item.reason ?? ""}
              options={reasons.options}
              onChange={(value) => updateData("reason", value)}
              rules={[required()]}
              disabled={!item.valuationMethod}
            />
          )}

        <InputRadio
          labelPosition="left"
          title="Statement Perbedaan"
          value={item.differenceStatement ?? ""}
          options={differenceStatements.options}
          onChange={(value) => updateData("differenceStatement", value)}
        />
      </div>
    </div>
  );
}
