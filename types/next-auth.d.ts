import type { Role } from "@prisma/client";
import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] & {
      id: string;
      role: Role;
      trigram: string;
    };
  }

  interface User {
    role: Role;
    trigram: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: Role;
    trigram?: string;
  }
}
