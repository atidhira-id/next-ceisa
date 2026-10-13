import FormBc from "./form-bc";
import FormPengangkut from "./form-pengangkut";
import FormPelabuhan from "./form-pelabuhan";

export default function PengangkutTab() {
  return (
    <div className="space-y-6">
      {/* Form */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {/* BC 1.1 */}
        <FormBc />

        {/* Pengangkutan */}
        <FormPengangkut />

        {/* Pelabuhan dan Tempat Penimbunan */}
        <FormPelabuhan />
      </div>
    </div>
  );
}
