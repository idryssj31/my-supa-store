import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const products = [
  {
    slug: "maillot-france-domicile",
    name: "Maillot France Domicile",
    price: 89.99,
    image: "/images/maillot-france-domicile.svg",
    description:
      "Maillot officiel domicile des Bleus. Tissu respirant Dri-FIT, coupe ajustée et écusson FFF brodé.",
    specs: "Tailles S-XXL · 100% polyester recyclé · Lavage 30°C",
  },
  {
    slug: "maillot-bresil-domicile",
    name: "Maillot Brésil Domicile",
    price: 94.99,
    image: "/images/maillot-bresil-domicile.svg",
    description:
      "Le mythique maillot jaune canari. Design classique avec détails verts, idéal pour soutenir la Seleção.",
    specs: "Tailles S-XXL · Polyester léger · Coupe standard",
  },
  {
    slug: "maillot-argentine-domicile",
    name: "Maillot Argentine Domicile",
    price: 94.99,
    image: "/images/maillot-argentine-domicile.svg",
    description:
      "Rayures ciel et blanc emblématiques. Maillot domicile inspiré de la Albiceleste, confort match et tribune.",
    specs: "Tailles S-XXL · Mesh ventilé · Badge AFA thermocollé",
  },
  {
    slug: "maillot-psg-domicile",
    name: "Maillot PSG Domicile",
    price: 99.99,
    image: "/images/maillot-psg-domicile.svg",
    description:
      "Maillot domicile Paris Saint-Germain. Bleu nuit avec bande rouge Hechter, finitions premium.",
    specs: "Tailles S-XXL · Dri-FIT ADV · Sponsor officiel",
  },
];

const similarLinks: Record<string, string> = {
  "maillot-france-domicile": "maillot-bresil-domicile",
  "maillot-bresil-domicile": "maillot-argentine-domicile",
  "maillot-argentine-domicile": "maillot-psg-domicile",
  "maillot-psg-domicile": "maillot-france-domicile",
};

async function main() {
  const slugs = products.map((product) => product.slug);
  await prisma.product.deleteMany({
    where: { slug: { notIn: slugs } },
  });

  const bySlug = new Map<string, { id: number }>();

  for (const product of products) {
    const saved = await prisma.product.upsert({
      where: { slug: product.slug },
      update: product,
      create: product,
    });
    bySlug.set(product.slug, saved);
  }

  for (const [slug, similarSlug] of Object.entries(similarLinks)) {
    const product = bySlug.get(slug);
    const similarTo = bySlug.get(similarSlug);
    if (!product || !similarTo) continue;

    await prisma.product.update({
      where: { id: product.id },
      data: { similarToId: similarTo.id },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
