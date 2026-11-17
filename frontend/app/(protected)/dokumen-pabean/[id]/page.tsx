import { DocumentLoader } from "./components/documentLoader";

type DocumentPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function DocumentPage({ params }: DocumentPageProps) {
  const { id } = await params;

  return <DocumentLoader id={id} />;
}
