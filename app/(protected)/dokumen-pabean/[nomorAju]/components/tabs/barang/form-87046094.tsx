"use client";
import type { BarangItemData } from "@/app/providers/types";
import InputNormal from "../../input-normal";
import InputSelect from "../../input-select";
import { hsOption } from "@/app/constants/barang-options";
import { required } from "@/lib/validation";

type FormProps = {
  barang: BarangItemData;
  updateSpecs: (field: string, value: string) => void;
};

export default function Form_87046094({ barang, updateSpecs }: FormProps) {
  return (
    <div>
      <InputSelect
        labelPosition="left"
        label="CBU"
        options={hsOption}
        value={barang.spesifikasi?.cbu ?? ""}
        onChange={(value) => updateSpecs("cbu", value)}
        rules={[required()]}
      />
      <InputNormal
        labelPosition="left"
        title="JENIS KENDARAAN"
        value={barang.spesifikasi?.jenisKendaraan ?? ""}
        onChange={(value) => updateSpecs("jenisKendaraan", value)}
        rules={[required()]}
      />
      <InputNormal
        labelPosition="left"
        title="MERK"
        value={barang.spesifikasi?.merk ?? ""}
        onChange={(value) => updateSpecs("merk", value)}
        rules={[required()]}
      />
      <InputNormal
        labelPosition="left"
        title="TIPE"
        value={barang.spesifikasi?.tipe ?? ""}
        onChange={(value) => updateSpecs("tipe", value)}
        rules={[required()]}
      />
      <InputNormal
        labelPosition="left"
        title="TAHUN PEMBUATAN"
        value={barang.spesifikasi?.tahunPembuatan ?? ""}
        onChange={(value) => updateSpecs("tahunPembuatan", value)}
        rules={[required()]}
      />
      <InputNormal
        labelPosition="left"
        title="NOMOR RANGKA"
        value={barang.spesifikasi?.nomorRangka ?? ""}
        onChange={(value) => updateSpecs("nomorRangka", value)}
        rules={[required()]}
      />

      <InputNormal
        labelPosition="left"
        title="NOMOR MESIN"
        value={barang.spesifikasi?.nomorMesin ?? ""}
        onChange={(value) => updateSpecs("nomorMesin", value)}
        rules={[required()]}
      />
      <InputNormal
        labelPosition="left"
        title="SILINDER"
        value={barang.spesifikasi?.silinder ?? ""}
        onChange={(value) => updateSpecs("silinder", value)}
        rules={[required()]}
      />
      <InputNormal
        labelPosition="left"
        title="DAYA"
        value={barang.spesifikasi?.daya ?? ""}
        onChange={(value) => updateSpecs("daya", value)}
        rules={[required()]}
      />
      <InputNormal
        labelPosition="left"
        title="MODEL"
        value={barang.spesifikasi?.model ?? ""}
        onChange={(value) => updateSpecs("model", value)}
        rules={[required()]}
      />
    </div>
  );
}
