import { SimilarProducts } from "@/components/product/SimilarProducts";

type SimilarSlotPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function SimilarSlotPage({ params }: SimilarSlotPageProps) {
  const { slug } = await params;
  return <SimilarProducts slug={slug} />;
}
