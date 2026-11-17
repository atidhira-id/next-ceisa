import FormBc from "./formBc";
import FormTransport from "./formTransport";
import FormPort from "./formPort";

export default function TransportTab() {
  return (
    <div className="space-y-6">
      {/* Form */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {/* BC 1.1 */}
        <FormBc />

        {/* Pengangkutan */}
        <FormTransport />

        {/* Pelabuhan dan Tempat Penimbunan */}
        <FormPort />
      </div>
    </div>
  );
}
