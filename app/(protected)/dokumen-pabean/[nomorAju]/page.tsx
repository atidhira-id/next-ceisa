import { DocumentForm } from "@/app/(protected)/dokumen-pabean/[nomorAju]/components/document-form";

type DocumentPageProps = {
  params: Promise<{
    nomorAju: string;
  }>;
};

export default async function DocumentPage({ params }: DocumentPageProps) {
  const { nomorAju } = await params;

  return <DocumentForm nomorAju={nomorAju} />;
}
