import { DocumentLoader } from "./components/documentLoader";

type DocumentPageProps = {
  params: Promise<{
    nomorAju: string;
  }>;
};

export default async function DocumentPage({ params }: DocumentPageProps) {
  const { nomorAju } = await params;

  return <DocumentLoader nomorAju={nomorAju} />;
}
