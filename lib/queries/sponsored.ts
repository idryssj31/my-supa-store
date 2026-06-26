import {
  executeMockGraphQL,
  SPONSORED_PRODUCTS_QUERY,
  type SponsoredProduct,
  type SponsoredProductsData,
} from "@/lib/graphql/mock-store";

export async function fetchSponsoredProducts(
  contextSlug?: string,
): Promise<SponsoredProduct[]> {
  const response = await executeMockGraphQL<SponsoredProductsData>(
    SPONSORED_PRODUCTS_QUERY,
    { contextSlug },
  );

  return response.data.sponsoredProducts;
}
