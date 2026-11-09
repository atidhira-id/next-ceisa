import FormImportir from "./formImportir";
import FormPemilikBarang from "./formPemilikBarang";
import FormNpwpPemusatan from "./formNpwp";
import FormPengirim from "./formPengirim";
import FormPenjual from "./formPenjual";

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
