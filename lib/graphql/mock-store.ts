import { prisma } from "@/lib/prisma";

export const SPONSORED_PRODUCTS_QUERY = `
  query SponsoredProducts($contextSlug: String) {
    sponsoredProducts(contextSlug: $contextSlug) {
      slug
      name
      price
      image
      headline
    }
  }
`;

export type SponsoredProduct = {
  slug: string;
  name: string;
  price: number;
  image: string;
  headline: string;
};

export type SponsoredProductsData = {
  sponsoredProducts: SponsoredProduct[];
};

export type GraphQLResponse<TData> = {
  data: TData;
};

const MOCK_GRAPHQL_DELAY_MS = 600;

type SponsoredProductsVariables = {
  contextSlug?: string;
};

async function resolveSponsoredProducts(
  variables: SponsoredProductsVariables = {},
): Promise<SponsoredProduct[]> {
  const products = await prisma.product.findMany({
    where: { sponsored: true },
    orderBy: { id: "asc" },
  });

  return products.map((product) => ({
    slug: product.slug,
    name: product.name,
    price: product.price,
    image: product.image,
    headline: variables.contextSlug
      ? `Sélection partenaire pour ${variables.contextSlug.replaceAll("-", " ")}`
      : `Offre sponsorisée — ${product.name}`,
  }));
}

export async function executeMockGraphQL<TData>(
  query: string,
  variables: SponsoredProductsVariables = {},
): Promise<GraphQLResponse<TData>> {
  await new Promise((resolve) => setTimeout(resolve, MOCK_GRAPHQL_DELAY_MS));

  if (!query.includes("sponsoredProducts")) {
    throw new Error("Requête GraphQL mock non supportée");
  }

  const sponsoredProducts = await resolveSponsoredProducts(variables);

  return {
    data: { sponsoredProducts } as TData,
  };
}
