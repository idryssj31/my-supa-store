import { connection } from "next/server";
import { SponsoredBanner } from "@/components/product/SponsoredBanner";

type SponsoredSlotPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function SponsoredSlotPage({
  params,
}: SponsoredSlotPageProps) {
  await connection();
  const { slug } = await params;
  return <SponsoredBanner slug={slug} />;
}
