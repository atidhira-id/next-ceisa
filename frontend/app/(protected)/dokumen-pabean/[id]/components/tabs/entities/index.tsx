import FormImporter from "./formImporter";
import FormOwner from "./formOwner";
import FormNpwp from "./formNpwp";
import FormSender from "./formSender";
import FormSeller from "./formSeller";

export default function EntitiesTab() {
  return (
    <div className="space-y-6">
      {/* Form */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {/* Importir */}
        <FormImporter />

        {/* Pemilik Barang */}
        <FormOwner />

        <div className="flex flex-col gap-5">
          {/* NPWP Pemusatan */}
          <FormNpwp />

          {/* Pengirim */}
          <FormSender />

          {/* Penjual */}
          <FormSeller />
        </div>
      </div>
    </div>
  );
}
