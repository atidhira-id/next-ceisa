export type Document = {
  documentCode: string;
  applicationNumber: string;
  companyName: string;
  customsOffice: string;
};

type DocumentTableProps = {
  documents: Document[];
};

export default function DocumentTable({ documents }: DocumentTableProps) {
  return (
    <>
      <div className="overflow-hidden rounded-lg border bg-white">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b bg-gray-50">
              <tr>
                <th className="w-16 px-4 py-3 font-medium text-gray-600">
                  Nomor
                </th>

                <th className="px-4 py-3 font-medium text-gray-600">
                  Kode Dokumen
                </th>

                <th className="px-4 py-3 font-medium text-gray-600">
                  Nomor Pengajuan
                </th>

                <th className="px-4 py-3 font-medium text-gray-600">
                  Nama Perusahaan
                </th>

                <th className="px-4 py-3 font-medium text-gray-600">
                  Kantor Pabean
                </th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {documents.map((document, index) => (
                <tr
                  key={document.applicationNumber}
                  className="hover:bg-gray-50"
                >
                  <td className="px-4 py-3 text-gray-500">{index + 1}</td>

                  <td className="px-4 py-3 font-medium">
                    {document.documentCode}
                  </td>

                  <td className="px-4 py-3">{document.applicationNumber}</td>

                  <td className="px-4 py-3">{document.companyName}</td>

                  <td className="px-4 py-3">{document.customsOffice}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
