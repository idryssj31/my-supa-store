import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const products = [
  {
    slug: "sneaker-x",
    name: "Sneaker X",
    price: 89.99,
    image: "/images/sneaker-x.svg",
    description:
      "Baskets légères au design urbain. Semelle amortissante et mesh respirant pour un confort toute la journée.",
    specs: "Tailles 38-45 · Mesh + caoutchouc · Poids 280g",
  },
  {
    slug: "hoodie-pro",
    name: "Hoodie Pro",
    price: 59.99,
    image: "/images/hoodie-pro.svg",
    description:
      "Sweat à capuche premium en coton bio. Coupe relaxed, poches kangourou et capuche doublée.",
    specs: "Tailles S-XL · 80% coton bio · Lavable 30°C",
  },
  {
    slug: "cap-classic",
    name: "Cap Classic",
    price: 24.99,
    image: "/images/cap-classic.svg",
    description:
      "Casquette structurée à visière courbée. Broderie logo et réglage arrière pour un ajustement parfait.",
    specs: "Taille unique · Coton · Visière 7cm",
  },
  {
    slug: "backpack-urban",
    name: "Backpack Urban",
    price: 74.99,
    image: "/images/backpack-urban.svg",
    description:
      "Sac à dos 20L résistant à l'eau. Compartiment laptop 15 pouces et poches organisatrices.",
    specs: "20L · Polyester recyclé · Compartiment laptop",
  },
];

async function main() {
  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: product,
      create: product,
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
