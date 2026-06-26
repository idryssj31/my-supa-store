import { SponsoredBanner } from "@/components/product/SponsoredBanner";

type SponsoredSlotPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function SponsoredSlotPage({
  params,
}: SponsoredSlotPageProps) {
  const { slug } = await params;
  return <SponsoredBanner slug={slug} />;
}
