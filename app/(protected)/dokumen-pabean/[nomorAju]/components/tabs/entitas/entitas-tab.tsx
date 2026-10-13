import FormImportir from "./form-importir";
import FormPemilikBarang from "./form-pemilik-barang";
import FormNpwpPemusatan from "./form-npwp-pemusatan";
import FormPengirim from "./form-pengirim";
import FormPenjual from "./form-penjual";

export default function EntitasTab() {
  return (
    <div className="space-y-6">
      {/* Form */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {/* Importir */}
        <FormImportir />

        {/* Pemilik Barang */}
        <FormPemilikBarang />

        <div className="flex flex-col gap-5">
          {/* NPWP Pemusatan */}
          <FormNpwpPemusatan />

          {/* Pengirim */}
          <FormPengirim />

          {/* Penjual */}
          <FormPenjual />
        </div>
      </div>
    </div>
  );
}
