"use client";
import type { GoodsItemType } from "@/app/types";
import InputNormal from "@/app/components/inputs/input-normal";
import InputSelect from "@/app/components/inputs/input-select";
import { cbuOptions } from "@/app/constants/options/barangOptions";
import { required } from "@/lib/validation";

type FormProps = {
  item: GoodsItemType;
  updateSpecs: (field: string, value: string) => void;
};

export default function Form_87046094({ item, updateSpecs }: FormProps) {
  return (
    <div className="flex flex-col gap-3">
      <InputSelect
        labelPosition="left"
        label="CBU"
        options={cbuOptions}
        value={item.specifications?.cbu ?? ""}
        onChange={(value) => updateSpecs("cbu", value)}
        rules={[required()]}
      />
      <InputNormal
        labelPosition="left"
        title="JENIS KENDARAAN"
        value={item.specifications?.vehicleType ?? ""}
        onChange={(value) => updateSpecs("vehicleType", value)}
        rules={[required()]}
      />
      <InputNormal
        labelPosition="left"
        title="MERK"
        value={item.specifications?.brand ?? ""}
        onChange={(value) => updateSpecs("brand", value)}
        rules={[required()]}
      />
      <InputNormal
        labelPosition="left"
        title="TIPE"
        value={item.specifications?.type ?? ""}
        onChange={(value) => updateSpecs("type", value)}
        rules={[required()]}
      />
      <InputNormal
        labelPosition="left"
        title="TAHUN PEMBUATAN"
        value={item.specifications?.manufactureYear ?? ""}
        onChange={(value) => updateSpecs("manufactureYear", value)}
        rules={[required()]}
      />
      <InputNormal
        labelPosition="left"
        title="NOMOR RANGKA"
        value={item.specifications?.frameNumber ?? ""}
        onChange={(value) => updateSpecs("frameNumber", value)}
        rules={[required()]}
      />

      <InputNormal
        labelPosition="left"
        title="NOMOR MESIN"
        value={item.specifications?.engineNumber ?? ""}
        onChange={(value) => updateSpecs("engineNumber", value)}
        rules={[required()]}
      />
      <InputNormal
        labelPosition="left"
        title="SILINDER"
        value={item.specifications?.cylinder ?? ""}
        onChange={(value) => updateSpecs("cylinder", value)}
        rules={[required()]}
      />
      <InputNormal
        labelPosition="left"
        title="DAYA"
        value={item.specifications?.power ?? ""}
        onChange={(value) => updateSpecs("power", value)}
        rules={[required()]}
      />
      <InputNormal
        labelPosition="left"
        title="MODEL"
        value={item.specifications?.model ?? ""}
        onChange={(value) => updateSpecs("model", value)}
        rules={[required()]}
      />
    </div>
  );
}
